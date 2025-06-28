import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";

import Input from "../../components/Form/Input/Input";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import StatCard from "../../components/Card/StatCard";
import DiscountForm from "../../components/Form/DiscountForm";
import DiscountTable from "../../components/Table/DiscountTable";

import {
  fetchAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from "../../api/discount.Api";

import { startLoading, stopLoading } from "../../features/loading/loadingSlice";

const Discount = () => {
  const dispatch = useDispatch();
  const [discounts, setDiscounts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editDiscount, setEditDiscount] = useState(null);

  // Fetch Discounts
  useEffect(() => {
    const loadDiscounts = async () => {
      try {
        const res = await fetchAllDiscounts();
        setDiscounts(res.data.data);
      } catch (error) {
        console.error("Error loading discounts:", error);
        toast.error("Failed to load discounts");
      } finally {
        setLoading(false);
      }
    };
    loadDiscounts();
  }, []);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((val) => setSearch(val), 300),
    []
  );

  // Filter discounts
  const filtered = useMemo(() => {
    if (!search) return discounts;
    return discounts.filter((d) =>
      d.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, discounts]);

  // Handlers
  const handleCreate = () => {
    setEditDiscount(null);
    setShowModal(true);
  };

  const handleEdit = (discount) => {
    setEditDiscount(discount);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDiscount(id);
      setDiscounts((prev) => prev.filter((d) => d._id !== id));
      toast.success("Discount deleted");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to delete";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      let updated;
      if (editDiscount) {
        updated = await updateDiscount(editDiscount._id, data);
        console.log(updated);
        setDiscounts((prev) =>
          prev.map((d) => (d._id === updated._id ? updated : d))
        );
        toast.success("Discount updated");
      } else {
        console.log(data);
        const created = await createDiscount(data);
        setDiscounts((prev) => [created, ...prev]);
        toast.success("Discount created");
      }
      setShowModal(false);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to save";
      console.log(msg);
      toast.error(msg);
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
      <h1 className="text-3xl font-semibold text-primary">Discounts</h1>

      {/* Search + Create */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Input
          type="text"
          placeholder="Search by title"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <button
          className="bg-primary w-1/3 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleCreate}
        >
          + Add Discount
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Discounts" value={discounts.length} />
        <StatCard
          label="Active Now"
          value={
            discounts.filter(
              (d) =>
                new Date(d.validTill) > new Date() &&
                new Date(d.validFrom) < new Date()
            ).length
          }
        />
      </div>

      {/* Table */}
      <div className="w-full xl:w-2/3 overflow-auto rounded-lg max-h-[400px] relative z-5">
        <DiscountTable
          discounts={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DiscountForm
            initialData={editDiscount}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Discount;
