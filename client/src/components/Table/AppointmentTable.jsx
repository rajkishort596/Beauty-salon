import React from "react";
import { formatDate, formatTime } from "../../utils/formatDateTime";

const AppointmentTable = ({
  appointments,
  showActions = false,
  onStatusChange,
  onDelete,
}) => (
  <div className="bg-white/60 backdrop-blur-lg relative z-5 p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
    <table className="w-full table-auto text-sm text-left text-gray-800">
      <thead className="text-primary font-semibold border-b border-gray-300">
        <tr>
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Date</th>
          <th className="py-2 px-4">Service</th>
          <th className="py-2 px-4">Server</th>
          <th className="py-2 px-4">Time</th>
          {showActions && <th className="py-2 px-4">Status</th>}
          {showActions && <th className="py-2 px-4">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {appointments.length === 0 ? (
          <tr>
            <td
              colSpan={showActions ? 7 : 5}
              className="py-4 text-center text-gray-500"
            >
              No appointments found.
            </td>
          </tr>
        ) : (
          appointments.map((appt) => (
            <tr
              key={appt._id}
              className="border-b border-gray-200 hover:bg-white/70 transition"
            >
              <td className="py-2 px-4">{appt.user?.fullName || "-"}</td>
              <td className="py-2 px-4">{formatDate(appt.bookingDate)}</td>
              <td className="py-2 px-4">{appt.service?.name}</td>
              <td className="py-2 px-4">{appt.specialist?.name}</td>
              <td className="py-2 px-4">{formatTime(appt.timeSlot)}</td>

              {showActions && (
                <>
                  <td className="py-2 px-4">
                    <select
                      className={`px-3 py-2 rounded-md border transition-all duration-300 outline-none shadow-sm hover:shadow-md cursor-pointer
                        focus:ring-2 focus:border-transparent focus:ring-primary font-semibold
                        ${
                          appt.status === "confirmed"
                            ? "text-green-600"
                            : appt.status === "cancelled"
                            ? "text-red-600"
                            : appt.status === "completed"
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }`}
                      value={appt.status}
                      onChange={(e) => onStatusChange(appt._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-red-600 hover:underline cursor-pointer"
                      onClick={() => onDelete(appt._id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default AppointmentTable;
