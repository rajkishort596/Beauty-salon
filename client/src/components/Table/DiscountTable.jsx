import React from "react";
import { formatDate } from "../../utils/formatDateTime";

const DiscountTable = ({ discounts, onEdit, onDelete }) => {
  return (
    <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
      <table className="w-full table-auto text-sm text-left text-gray-800">
        <thead className="text-primary font-semibold border-b border-gray-300">
          <tr className="border-b border-gray-200">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Percentage</th>
            <th className="py-2 px-4">Valid From</th>
            <th className="py-2 px-4">Valid Till</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No discounts found.
              </td>
            </tr>
          ) : (
            discounts.map((d) => (
              <tr
                key={d._id}
                className="border-b border-gray-200 hover:bg-white/70 transition"
              >
                <td className="py-2 px-4">{d.title}</td>
                <td className="py-2 px-4">{d.percentage}%</td>
                <td className="py-2 px-4">{formatDate(d.validFrom)}</td>
                <td className="py-2 px-4">{formatDate(d.validTill)}</td>
                <td className="py-2 px-4 flex gap-3">
                  <button
                    onClick={() => onEdit(d)}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(d._id)}
                    className="text-red-600 hover:underline"
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
};

export default DiscountTable;
