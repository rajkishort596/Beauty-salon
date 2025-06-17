import React from "react";
import { formatDate, formatTime } from "../../utils/formatDateTime";

const AppointmentTable = ({ appointments }) => (
  <div className="bg-[#fceee6] p-4 rounded-lg overflow-x-auto">
    <table className="w-full table-auto text-sm text-left">
      <thead className="text-[#631212] border-b border-[#d9b8aa]">
        <tr>
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Date</th>
          <th className="py-2 px-4">Service</th>
          <th className="py-2 px-4">Time</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appt) => (
          <tr key={appt._id} className="border-b border-[#edd5c6]">
            <td className="py-2 px-4">{appt.user.fullName}</td>
            <td className="py-2 px-4">{formatDate(appt.bookingDate)}</td>
            <td className="py-2 px-4">{appt.service.name}</td>
            <td className="py-2 px-4">{formatTime(appt.timeSlot)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AppointmentTable;
