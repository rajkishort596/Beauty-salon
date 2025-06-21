import React from "react";

const SpecialistTable = ({ specialists, onEdit, onDelete }) => (
  console.log(specialists),
  (
    <div className="bg-white relative z-5 p-4 rounded-lg overflow-x-auto">
      <table className="w-full table-auto text-sm text-left">
        <thead className="text-[#631212] border-b border-[#d9b8aa]">
          <tr className="border-b border-[#edd5c6]">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Specialty</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {specialists.map((specialist) => (
            <tr key={specialist._id} className="border-b border-[#edd5c6]">
              <td className="py-2 px-4">{specialist.name}</td>
              <td className="py-2 px-4">{specialist.expertise.name}</td>
              <td className="py-2 px-4">{specialist.phone || "-"}</td>
              <td className="py-2 px-4">{specialist.email || "-"}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  className="text-yellow-600 mr-2 cursor-pointer"
                  onClick={() => onEdit(specialist)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 cursor-pointer"
                  onClick={() => onDelete(specialist._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {specialists.length === 0 && (
            <tr className="border-b border-[#edd5c6]">
              <td colSpan={5} className="text-center p-4 text-gray-400">
                No specialists found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
);

export default SpecialistTable;
