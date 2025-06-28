import React from "react";
import { formatDate } from "../../utils/formatDateTime";
const DiscountTable = ({ discounts, onEdit, onDelete }) => {
  return (
    <div className="bg-white/90 p-4 rounded-lg">
      <table className="w-full table-auto text-sm text-left">
        <thead className="text-[#631212] border-b border-[#d9b8aa]">
          <tr className="border-b border-[#edd5c6]">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Percentage</th>
            <th className="py-2 px-4">Valid From</th>
            <th className="py-2 px-4">Valid Till</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.length === 0 && (
            <tr className="border-b border-[#edd5c6]">
              <td colSpan="5" className="text-center p-4 text-gray-400">
                No discounts found.
              </td>
            </tr>
          )}
          {discounts.map((d) => (
            <tr key={d._id} className="border-b border-[#edd5c6]">
              <td className="py-2 px-4">{d.title}</td>
              <td className="py-2 px-4">{d.percentage}%</td>
              <td className="py-2 px-4">{formatDate(d.validFrom)}</td>
              <td className="py-2 px-4">{formatDate(d.validTill)}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => onEdit(d)}
                  className="text-yellow-600 mr-2 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(d._id)}
                  className="text-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountTable;
