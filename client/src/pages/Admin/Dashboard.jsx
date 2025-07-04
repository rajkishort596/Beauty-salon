import { useEffect, useState } from "react";
import {
  fetchDashboardStats,
  fetchRecentAppointments,
} from "../../api/dashboard.api.js";
import StatCard from "../../components/Card/StatCard";
import AppointmentTable from "../../components/Table/AppointmentTable";
import Spinner from "../../components/Spinner.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, apptData] = await Promise.all([
          fetchDashboardStats(),
          fetchRecentAppointments(),
        ]);
        setStats(statsData);
        setAppointments(apptData);
      } catch (error) {
        console.error("Dashboard loading error", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-primary">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Appointments" value={stats.totalBookings} />
        <StatCard label="Total Services" value={stats.totalServices} />
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Total Reviews" value={stats.totalReviews} />
      </div>

      {/* Recent Appointments Table */}
      <div>
        <h2 className="text-xl font-semibold text-[#631212] mb-4">
          Recent Appointments
        </h2>
        <div className="w-full xl:w-2/3 overflow-x-auto">
          <AppointmentTable appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
