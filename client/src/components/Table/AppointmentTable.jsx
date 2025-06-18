import React from "react";
import { formatDate, formatTime } from "../../utils/formatDateTime";

const AppointmentTable = ({
  appointments,
  showActions = false,
  onStatusChange,
  onDelete,
}) => (
  <div className="bg-white relative z-5 p-4 rounded-lg overflow-x-auto">
    <table className="w-full table-auto text-sm text-left">
      <thead className="text-[#631212] border-b border-[#d9b8aa]">
        <tr>
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Date</th>
          <th className="py-2 px-4">Service</th>
          <th className="py-2 px-4">Time</th>
          {showActions && <th className="py-2 px-4">Status</th>}
          {showActions && <th className="py-2 px-4">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {appointments.length === 0 ? (
          <tr>
            <td
              colSpan={showActions ? 6 : 4}
              className="py-4 text-center text-gray-500"
            >
              No appointments found.
            </td>
          </tr>
        ) : (
          appointments.map((appt) => (
            <tr key={appt._id} className="border-b border-[#edd5c6]">
              <td className="py-2 px-4">{appt.user?.fullName || "-"}</td>
              <td className="py-2 px-4">{formatDate(appt.bookingDate)}</td>
              <td className="py-2 px-4">{appt.service?.name}</td>
              <td className="py-2 px-4">{formatTime(appt.timeSlot)}</td>

              {showActions && (
                <>
                  <td className="py-2 px-4">
                    <select
                      className={`py-2 px-4 border cursor-pointer focus:outline-none font-semibold focus:ring-primary focus:ring-1 rounded-sm ${
                        appt.status === "confirmed"
                          ? "text-green-600"
                          : appt.status === "cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                      value={appt.status}
                      onChange={(e) => onStatusChange(appt._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
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
