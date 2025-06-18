import React, { useEffect, useState } from "react";
import AppointmentTable from "../../components/Table/AppointmentTable";
import { fetchAllAppointments } from "../../api/dashboard.api";
import Spinner from "../../components/Spinner";
import StatCard from "../../components/Card/StatCard";
import Input from "../../components/Form/Input/Input";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const apptData = await fetchAllAppointments();
        setAppointments(apptData);
        setFiltered(apptData);
      } catch (error) {
        console.error("Appointment loading error", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Apply filters whenever input changes
  useEffect(() => {
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

    setFiltered(filteredData);
  }, [search, status, dateFilter, appointments]);

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
          className=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="py-2 px-4 border focus:outline-none focus:ring-primary focus:ring-1 rounded-sm w-full md:w-1/3 "
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
          className=""
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total " value={appointments.length} />
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
      <div className="w-full xl:w-2/3 overflow-x-auto">
        <AppointmentTable appointments={filtered} />
      </div>
    </div>
  );
};

export default Appointment;
