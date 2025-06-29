import React from "react";

const SpecialistTable = ({ specialists, onEdit, onDelete }) => (
  <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
    <table className="w-full table-auto text-sm text-left text-gray-800">
      <thead className="text-primary font-semibold border-b border-gray-300">
        <tr className="border-b border-gray-200">
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Specialties</th>
          <th className="py-2 px-4">Phone</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {specialists.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center p-4 text-gray-500">
              No specialists found.
            </td>
          </tr>
        ) : (
          specialists.map((specialist) => (
            <tr
              key={specialist._id}
              className="border-b border-gray-200 hover:bg-white/70 transition"
            >
              <td className="py-2 px-4">{specialist.name}</td>
              <td className="py-2 px-4">
                {specialist.expertise.map((exp) => exp.name).join(" | ")}
              </td>
              <td className="py-2 px-4">{specialist.phone || "-"}</td>
              <td className="py-2 px-4">{specialist.email || "-"}</td>
              <td className="py-2 px-4 flex gap-3">
                <button
                  className="text-yellow-600 hover:underline"
                  onClick={() => onEdit(specialist)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(specialist._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default SpecialistTable;
