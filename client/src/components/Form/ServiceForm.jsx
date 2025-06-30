import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Input from "./Input/Input";

const ServiceForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || "",
      duration: initialData?.duration || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
    },
  });

  const serviceImage = useWatch({ control, name: "image" });

  const imagePreview = serviceImage?.[0]
    ? URL.createObjectURL(serviceImage[0])
    : initialData?.image.url || null;

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("image", data.image?.[0]);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("duration", data.duration);
    formData.append("description", data.description);
    formData.append("category", data.category);
    onSubmit(formData);
  };

  return (
    <form
      className="space-y-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-x-5"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="Name"
        placeholder="Service Name"
        {...register("name", { required: "Name is required" })}
        error={errors.name?.message}
      />
      <Input
        label="Price"
        type="number"
        placeholder="Price"
        {...register("price", { required: "Price is required" })}
        error={errors.price?.message}
      />
      <Input
        label="Duration (minutes)"
        type="number"
        placeholder="Duration"
        {...register("duration", { required: "Duration is required" })}
        error={errors.duration?.message}
      />
      {/* Category Select */}
      <div className="flex flex-col gap-1 w-full">
        <label className="font-abhaya text-black text-2xl">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className={`px-4 py-2 rounded-md border bg-white text-gray-800 transition-all duration-300 outline-none
    ${
      errors.category
        ? "border-red-500 focus:ring-red-300 text-red-600"
        : "border-gray-300 focus:ring-primary"
    }
    focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md`}
        >
          <option value="">Category</option>
          <option value="Make up">Make up</option>
          <option value="Hair styling">Hair styling</option>
          <option value="Nail care">Nail care</option>
          <option value="cosmetology">Cosmetology</option>
          <option value="SPA procedures">SPA procedures</option>
        </select>
        {errors.category && (
          <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="col-span-2 w-full">
        <label className="font-abhaya text-black text-2xl">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={5}
          placeholder="Write a brief description..."
          className={`px-4 py-2 rounded-md border bg-white text-gray-800 transition-all duration-300 outline-none resize-none w-full
    ${
      errors.description
        ? "border-red-500 focus:ring-red-300 text-red-600"
        : "border-gray-300 focus:ring-primary"
    }
    focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md`}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div className="col-span-2">
        <label className="font-abhaya text-black text-2xl mb-2 block">
          Service Image
        </label>
        <div className="flex items-center w-full gap-4">
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded hover:border-primary transition"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-400">Click to upload</span>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              name="image"
              {...register("image", {
                required: !initialData?._id ? "Image is required" : false,
              })}
            />
          </label>
          {errors.image && (
            <p className="text-red-600 text-sm">{errors.image.message}</p>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="flex gap-2 col-span-2 justify-center">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded cursor-pointer"
        >
          {initialData?._id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
