import React, { useEffect, useMemo, useState } from "react";
import AppointmentTable from "../../components/Table/AppointmentTable";
import {
  changeStatus,
  deleteAppointment,
  fetchAllAppointments,
} from "../../api/dashboard.api";
import Spinner from "../../components/Spinner";
import StatCard from "../../components/Card/StatCard";
import Input from "../../components/Form/Input/Input";
import debounce from "lodash.debounce";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const apptData = await fetchAllAppointments();
        setAppointments(apptData);
      } catch (error) {
        console.error("Appointment loading error", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeStatus(id, newStatus);
      // Update UI immediately
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle deletion
  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      // Remove from UI
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Debounced search input
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 300),
    []
  );

  // Filtering logic (optimized)
  const filtered = useMemo(() => {
    let filteredData = [...appointments];

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

    if (dateFilter) {
      filteredData = filteredData.filter(
        (item) =>
          new Date(item.bookingDate).toDateString() ===
          new Date(dateFilter).toDateString()
      );
    }

    return filteredData;
  }, [search, status, dateFilter, appointments]);

  // Show loading spinner
  if (loading)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-primary">Appointments</h1>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Input
          type="text"
          placeholder="Search by User or Service"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <select
          className="w-full md:w-1/3 px-4 py-2 rounded-md border bg-white text-gray-800 transition-all duration-300 outline-none
        border-gray-300 focus:ring-primary
        focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md
        "
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total" value={appointments.length} />
        <StatCard
          label="Confirmed"
          value={appointments.filter((a) => a.status === "confirmed").length}
        />
        <StatCard
          label="Pending"
          value={appointments.filter((a) => a.status === "pending").length}
        />
        <StatCard
          label="Cancelled"
          value={appointments.filter((a) => a.status === "cancelled").length}
        />
      </div>

      {/* Table */}
      <div className="w-full  overflow-x-auto">
        <AppointmentTable
          appointments={filtered}
          showActions={true}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Appointment;
