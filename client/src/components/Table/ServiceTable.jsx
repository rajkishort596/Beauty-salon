import React from "react";

const ServiceTable = ({ services, onEdit, onDelete }) => (
  <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200">
    <table className="w-full table-auto text-sm text-left text-gray-800">
      <thead className="text-primary font-semibold border-b border-gray-300">
        <tr className="border-b border-gray-200">
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Category</th>
          <th className="py-2 px-4">Price</th>
          <th className="py-2 px-4">Duration</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => (
          <tr
            key={service._id}
            className="border-b border-gray-200 hover:bg-white/70 transition"
          >
            <td className="py-2 px-4">{service.name}</td>
            <td className="py-2 px-4">{service.category}</td>
            <td className="py-2 px-4">${service.price}</td>
            <td className="py-2 px-4">{service.duration}</td>
            <td className="py-2 px-4 flex gap-3">
              <button
                className="text-yellow-600 hover:underline"
                onClick={() => onEdit(service)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => onDelete(service._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {services.length === 0 && (
          <tr className="border-b border-gray-200">
            <td colSpan={7} className="text-center p-4 text-gray-500">
              No services found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
export default ServiceTable;
