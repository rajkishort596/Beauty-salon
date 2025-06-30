import React, { useEffect, useMemo, useState } from "react";
import SpecialistTable from "../../components/Table/SpecialistTable";
import {
  fetchSpecialists,
  deleteSpecialist,
  updateSpecialist,
  createSpecialist,
} from "../../api/specialist.Api.js";
import Spinner from "../../components/Spinner";
import StatCard from "../../components/Card/StatCard";
import Input from "../../components/Form/Input/Input";
import debounce from "lodash.debounce";
import SpecialistForm from "../../components/Form/SpecialistForm";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { fetchAllServices } from "../../api/service.Api.js";

const Specialist = () => {
  const [specialists, setSpecialists] = useState([]);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editSpecialist, setEditSpecialist] = useState(null);

  // Fetch all specialists
  useEffect(() => {
    const loadData = async () => {
      try {
        const servicesRes = await fetchAllServices();
        setServices(servicesRes.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch services.");
      }
      try {
        const res = await fetchSpecialists();
        setSpecialists(res.data.data);
      } catch (error) {
        console.error("Specialist loading error", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 300),
    []
  );

  // Filtered specialists
  const filtered = useMemo(() => {
    if (!search) return specialists;
    return specialists.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.expertise.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, specialists]);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteSpecialist(id);
      setSpecialists((prev) => prev.filter((s) => s._id !== id));
      toast.success("Specialist deleted successfully");
    } catch (error) {
      console.error("Error deleting specialist:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (specialist) => {
    setEditSpecialist(specialist);
    setShowModal(true);
  };

  // Handle create
  const handleCreate = () => {
    setEditSpecialist(null);
    setShowModal(true);
  };
  // Handle form submit (create or update)
  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editSpecialist) {
        const updated = await updateSpecialist(editSpecialist._id, formData);

        // Populate full expertise array for immediate UI update
        const updatedExpertise = (updated.expertise || []).map((item) => {
          const id = item._id || item;
          return services.find((s) => s._id === id) || item;
        });

        setSpecialists((prev) =>
          prev.map((s) =>
            s._id === updated._id
              ? {
                  ...updated,
                  expertise: updatedExpertise,
                }
              : s
          )
        );

        toast.success("Specialist updated successfully");
      } else {
        const created = await createSpecialist(formData);

        // Populate full expertise array for immediate UI update
        const createdExpertise = (created.expertise || []).map((item) => {
          const id = item._id || item;
          return services.find((s) => s._id === id) || item;
        });

        setSpecialists((prev) => [
          {
            ...created,
            expertise: createdExpertise,
          },
          ...prev,
        ]);

        toast.success("Specialist created successfully");
      }

      setShowModal(false);
    } catch (error) {
      const errMsg = error.response?.data?.message || "An error occurred";
      toast.error(errMsg);
      console.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-primary">Specialists</h1>

      {/* Filter & Create */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Input
          type="text"
          placeholder="Search by Name or Specialty"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <button
          className="bg-primary w-1/3 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleCreate}
        >
          + Add Specialist
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Specialists" value={specialists.length} />
      </div>

      {/* Table */}
      <div className="w-full xl:w-[90%] rounded-lg relative z-5 h-auto max-h-[400px] overflow-auto">
        <SpecialistTable
          specialists={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpecialistForm
            initialData={editSpecialist}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowModal(false)}
            services={services}
          />
        </Modal>
      )}
    </div>
  );
};

export default Specialist;
