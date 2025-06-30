import React, { useEffect, useMemo, useState } from "react";

import ReviewsTable from "../../components/Table/ReviewTable.jsx";
import Spinner from "../../components/Spinner.jsx";
import {
  approveReview,
  deleteReview,
  getAllReviews,
} from "../../api/review.Api.js";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import Input from "../../components/Form/Input/Input.jsx";
import StatCard from "../../components/Card/StatCard.jsx";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
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
    let filteredData = [...reviews];

    if (search) {
      filteredData = filteredData.filter(
        (item) =>
          item.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          item.service?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      filteredData = filteredData.filter((item) => item.status === status);
    }
    return filteredData;
  }, [search, status, reviews]);

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await approveReview(id);
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Approved" } : r))
      );
      toast.success("Review Approved");
    } catch (err) {
      toast.error("Failed to approve review");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success("Review deleted successfully");
    } catch (err) {
      toast.error("Failed to delete review");
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
      <h1 className="text-3xl font-semibold text-primary">Reviews</h1>

      {/* Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Input
          type="text"
          placeholder="Search by Name or Service"
          onChange={(e) => debouncedSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-md border bg-white text-gray-800 transition-all duration-300 outline-none
        border-gray-300 focus:ring-primary
        focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md
         w-full md:w-1/3"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Reviews" value={reviews.length} />
      </div>
      <div className="w-full lg:w-[90%] rounded-lg relative z-5 h-auto max-h-[400px] overflow-auto">
        <ReviewsTable
          reviews={filtered}
          onApprove={handleApprove}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Reviews;
