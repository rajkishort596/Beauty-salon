import React from "react";

const ReviewTable = ({ reviews, onApprove, onDelete }) => (
  <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
    <table className="w-full table-auto text-sm text-left text-gray-800">
      <thead className="text-primary font-semibold border-b border-gray-300">
        <tr className="border-b border-gray-200">
          <th className="py-2 px-4">User</th>
          <th className="py-2 px-4">Service</th>
          <th className="py-2 px-4">Rating</th>
          <th className="py-2 px-4">Comment</th>
          <th className="py-2 px-4">Status</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {reviews.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center p-4 text-gray-500">
              No reviews found.
            </td>
          </tr>
        ) : (
          reviews.map((review) => (
            <tr
              key={review._id}
              className="border-b border-gray-200 hover:bg-white/70 transition"
            >
              <td className="py-2 px-4">
                {review.user?.fullName || "Unknown"}
              </td>
              <td className="py-2 px-4">{review.service?.name || "Unknown"}</td>
              <td className="py-2 px-4">{review.rating}</td>
              <td className="py-2 px-4">{review.comment}</td>
              <td className="py-2 px-4 font-semibold">
                {review.status === "Approved" ? (
                  <span className="text-green-600">Approved</span>
                ) : (
                  <span className="text-orange-500">Pending</span>
                )}
              </td>
              <td className="py-2 px-4 flex flex-col items-start gap-2">
                {!review.approved && (
                  <button
                    className="text-green-600 hover:underline cursor-pointer"
                    onClick={() => onApprove(review._id)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="text-red-600 hover:underline cursor-pointer"
                  onClick={() => onDelete(review._id)}
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

export default ReviewTable;
