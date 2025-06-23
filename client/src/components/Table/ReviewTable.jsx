import React from "react";

const ReviewTable = ({ reviews, onApprove, onDelete }) => (
  console.log(reviews),
  (
    <div className="bg-white p-4 rounded-lg">
      <table className="w-full table-auto text-sm text-left">
        <thead className="text-[#631212] border-b border-[#d9b8aa]">
          <tr className="border-b border-[#edd5c6]">
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4">Service</th>
            <th className="py-2 px-4">Rating</th>
            <th className="py-2 px-4">Comment</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="border-b border-[#edd5c6]">
              <td className="py-2 px-4">
                {review.user?.fullName || "Unknown"}
              </td>
              <td className="py-2 px-4">{review.service?.name || "Unknown"}</td>
              <td className="py-2 px-4">{review.rating}</td>
              <td className="py-2 px-4">{review.comment}</td>
              <td className="py-2 px-4">
                {review.status === "Approved" ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <span className="text-orange-500 font-semibold">Pending</span>
                )}
              </td>
              <td className="py-2 px-4 flex flex-col items-start gap-2">
                {!review.approved && (
                  <button
                    className="text-green-600 hover:underline mr-2 cursor-pointer"
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
          ))}
          {reviews.length === 0 && (
            <tr className="border-b border-[#edd5c6]">
              <td colSpan={6} className="text-center p-4 text-gray-400">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
);

export default ReviewTable;
