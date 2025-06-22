import React from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import Input from "./Input/Input";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SpecialistForm = ({ initialData = {}, onSubmit, onCancel, services }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      expertise: initialData?.expertise.name || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      availableFrom: initialData?.availableFrom || "",
      availableTo: initialData?.availableTo || "",
      availableDays: initialData?.availableDays || [],
    },
  });
  console.log(initialData?.expertise.name);
  const specialistImage = useWatch({ control, name: "image" });
  const imagePreview = specialistImage?.[0]
    ? URL.createObjectURL(specialistImage[0])
    : initialData?.image?.url || null;

  // Modern weekday selector
  const selectedDays = useWatch({ control, name: "availableDays" }) || [];

  const toggleDay = (day) => {
    let newDays = [];
    if (selectedDays.includes(day)) {
      newDays = selectedDays.filter((d) => d !== day);
    } else {
      newDays = [...selectedDays, day];
    }
    setValue("availableDays", newDays, { shouldValidate: true });
  };

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("image", data.image?.[0]);
    formData.append("name", data.name);
    formData.append("expertise", data.expertise);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    // Append each day as a separate entry
    data.availableDays.forEach((day) => {
      formData.append("availableDays[]", day);
    });
    formData.append("availableTo", data.availableTo);
    formData.append("availableFrom", data.availableFrom);
    onSubmit(formData);
  };

  return (
    <form
      className="space-y-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-x-5"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="Name"
        placeholder="Specialist Name"
        {...register("name", { required: "Name is required" })}
        error={errors.name?.message}
      />
      {/* Service Select */}
      <div className="flex flex-col gap-1">
        <label className="font-abhaya text-black text-2xl">Specialty</label>
        <select
          {...register("expertise", { required: "Select a specialty" })}
          className={`py-2 px-4 border focus:outline-none focus:ring-1 rounded-sm ${
            errors.expertise
              ? "border-red-500 focus:ring-red-300"
              : "focus:ring-primary border-text-muted"
          }`}
        >
          <option value="">specialty</option>
          {services.map((service) => (
            <option key={service._id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.expertise && (
          <p className="text-red-600 text-sm mt-1">
            {errors.expertise.message}
          </p>
        )}
      </div>
      <Input
        label="Phone"
        placeholder="Phone"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <Input
        label="Email"
        placeholder="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* Modern Days Selector */}
      <div className="flex flex-col gap-1 col-span-2">
        <label className="font-abhaya text-black text-2xl mb-2">
          Available Days
        </label>
        <div className="flex flex-wrap gap-2">
          {WEEKDAYS.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-full border transition cursor-pointer
                ${
                  selectedDays.includes(day)
                    ? "bg-primary text-white border-primary shadow"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-primary hover:text-white"
                }
              `}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
        {errors.availableDays && (
          <p className="text-red-600 text-sm mt-1">
            {errors.availableDays.message}
          </p>
        )}
      </div>

      <Input
        label="Available from"
        placeholder="Available from"
        type="time"
        {...register("availableFrom")}
        error={errors.availableFrom?.message}
      />
      <Input
        label="Available to"
        placeholder="Available to"
        type="time"
        {...register("availableTo")}
        error={errors.availableTo?.message}
      />
      {/* Image Upload */}
      <div className="col-span-2">
        <label className="font-abhaya text-black text-2xl mb-2 block">
          Specialist Image
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

export default SpecialistForm;
