import React from "react";
import { useForm, useWatch } from "react-hook-form";
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
  const normalizedExpertise = (initialData?.expertise || []).map((e) =>
    typeof e === "string" ? e : e._id
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      expertise: normalizedExpertise, // array of _ids as strings
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      availableFrom: initialData?.availableFrom || "",
      availableTo: initialData?.availableTo || "",
      availableDays: initialData?.availableDays || [],
    },
  });

  const specialistImage = useWatch({ control, name: "image" });
  const selectedDays = useWatch({ control, name: "availableDays" }) || [];
  const selectedExpertise = useWatch({ control, name: "expertise" }) || [];

  const imagePreview = specialistImage?.[0]
    ? URL.createObjectURL(specialistImage[0])
    : initialData?.image?.url || null;

  const toggleDay = (day) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setValue("availableDays", newDays, { shouldValidate: true });
  };

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("image", data.image?.[0]);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);

    data.availableDays.forEach((day) => {
      formData.append("availableDays[]", day);
    });

    data.expertise.forEach((id) => {
      formData.append("expertise[]", id);
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
      <Input
        label="Phone"
        placeholder="e.g., 1234567890"
        {...register("phone", {
          required: "Phone number is required.",
          pattern: {
            value: /^\d{10}$/,
            message: "Please enter a valid 10-digit phone number.",
          },
        })}
        error={errors.phone?.message}
      />
      <Input
        label="Email"
        placeholder="Email"
        type="email"
        {...register("email", { required: "Email is required" })}
        error={errors.email?.message}
      />

      <div className="grid grid-cols-2 gap-x-5">
        <Input
          label="Available from"
          placeholder="Available from"
          type="time"
          {...register("availableFrom", {
            required: "Available from is required",
          })}
          error={errors.availableFrom?.message}
        />
        <Input
          label="Available to"
          placeholder="Available to"
          type="time"
          {...register("availableTo", { required: "Available to is required" })}
          error={errors.availableTo?.message}
        />
      </div>

      {/* Available Days Section */}
      <div className="flex flex-col gap-1 col-span-2 mb-4">
        <label className="font-abhaya text-black text-xl mb-2">
          Available Days
        </label>
        <div className="flex flex-wrap gap-2">
          {WEEKDAYS.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => toggleDay(day)}
              className={`
                px-4 py-1 rounded-full border transition cursor-pointer
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

        <input
          type="hidden"
          {...register("availableDays", {
            validate: (value) => {
              return (
                (Array.isArray(value) && value.length > 0) ||
                "Please select at least one day."
              );
            },
          })}
        />

        {/* Display error message */}
        {errors.availableDays && (
          <p className="text-red-600 text-sm mt-1">
            {errors.availableDays.message}
          </p>
        )}
      </div>

      {/* Expertise (Services) */}
      <div className="flex flex-col gap-1 col-span-2">
        <label className="font-abhaya text-black text-2xl mb-2">
          Specialties
        </label>
        <div className="flex flex-wrap w-full gap-2">
          {services.map((service) => (
            <label
              key={service._id}
              className={`flex items-center gap-2 p-1 rounded shadow-sm border cursor-pointer transition
                ${
                  selectedExpertise.map(String).includes(service._id.toString())
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-primary hover:text-white"
                }
              `}
            >
              <input
                type="checkbox"
                value={service._id}
                checked={selectedExpertise
                  .map(String)
                  .includes(service._id.toString())}
                {...register("expertise", {
                  validate: (value) =>
                    value?.length > 0 || "Select at least one specialty",
                })}
                className="accent-primary"
              />
              <span className="text-xs">{service.name}</span>
            </label>
          ))}
        </div>
        {errors.expertise && (
          <p className="text-red-600 text-sm mt-1">
            {errors.expertise.message}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div className="items-end mb-0">
        <label className="font-abhaya text-black text-xl mb-2 block">
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

      {/* Submit / Cancel */}
      <div className="flex gap-2 justify-end items-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-2 border rounded cursor-pointer hover:bg-gray-100 h-[50px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-2 bg-primary text-white rounded cursor-pointer h-[50px]"
        >
          {initialData?._id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default SpecialistForm;
