import React, { useEffect, useMemo, useState } from "react";
import ServiceTable from "../../components/Table/ServiceTable";
import {
  fetchAllServices,
  deleteService,
  updateService,
  createService,
} from "../../api/service.Api.js";
import Spinner from "../../components/Spinner";
import StatCard from "../../components/Card/StatCard";
import Input from "../../components/Form/Input/Input";
import debounce from "lodash.debounce";
import ServiceForm from "../../components/Form/ServiceForm";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const Service = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);

  // Fetch all services
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAllServices();
        setServices(res.data.data);
      } catch (error) {
        console.error("Service loading error", error);
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

  // Filtered services
  const filtered = useMemo(() => {
    if (!search) return services;
    return services.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, services]);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success("Service deleted Successfully");
    } catch (error) {
      const errMsg = error.response?.data?.message || "An error occurred";
      toast.error(errMsg);
      console.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (service) => {
    setEditService(service);
    setShowModal(true);
  };

  // Handle create
  const handleCreate = () => {
    setEditService(null);
    setShowModal(true);
  };

  // Handle form submit (create or update)
  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editService) {
        const updated = await updateService(editService._id, formData);
        setServices((prev) =>
          prev.map((s) => (s._id === updated._id ? updated : s))
        );
        toast.success("Service updated successfully");
      } else {
        const created = await createService(formData);
        setServices((prev) => [created, ...prev]);
        toast.success("Service created successfully");
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
      <h1 className="text-3xl font-semibold text-primary">Services</h1>

      {/* Filter & Create */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Input
          type="text"
          placeholder="Search by Name or Category"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <button
          className="bg-primary w-1/3 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleCreate}
        >
          + Add Service
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Services" value={services.length} />
        <StatCard
          label="Categories"
          value={[...new Set(services.map((s) => s.category))].length}
        />
      </div>

      {/* Table */}
      <div className="w-full lg:w-[90%] rounded-lg relative z-5 h-auto max-h-[400px] overflow-auto">
        <ServiceTable
          services={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServiceForm
            initialData={editService}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Service;
