import React from "react";

const ServiceTable = ({ services, onEdit, onDelete }) => (
  console.log(services),
  (
    <div className="bg-white relative z-5 p-4 rounded-lg overflow-x-auto">
      <table className="w-full table-auto text-sm text-left">
        <thead className="text-[#631212] border-b border-[#d9b8aa]">
          <tr className="border-b border-[#edd5c6]">
            {/* <th className="py-2 px-4">Image</th> */}
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Duration</th>
            {/* <th className="py-2 px-4">Description</th> */}
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id} className="border-b border-[#edd5c6]">
              {/* <td className="p-2 border flex items-center justify-center">
                {service.image ? (
                  <img
                    src={service.image.url}
                    alt={service.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </td> */}
              <td className="py-2 px-4">{service.name}</td>
              <td className="py-2 px-4">{service.category}</td>
              <td className="py-2 px-4">{service.price}</td>
              <td className="py-2 px-4">{service.duration}</td>
              {/* <td className="py-2 px-4">{service.description}</td> */}
              <td className="py-2 px-4 flex gap-2">
                <button
                  className="text-yellow-600 mr-2 cursor-pointer"
                  onClick={() => onEdit(service)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 cursor-pointer"
                  onClick={() => onDelete(service._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {services.length === 0 && (
            <tr className="border-b border-[#edd5c6]">
              <td colSpan={7} className="text-center p-4 text-gray-400">
                No services found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
);

export default ServiceTable;
