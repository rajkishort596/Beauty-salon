import React from "react";
import images from "../../constants/images";
import { useForm } from "react-hook-form";
import Input from "./Input/Input";

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <div className="bg-bg w-full px-4 py-15 md:px-18 ">
      <div className="bg-white p-10 flex flex-col items-center lg:flex-row gap-2.5">
        <div className="w-full lg:w-1/3">
          {/* Mobile Image */}
          <img
            src={images.makeupImg}
            alt="Mobile"
            className="block lg:hidden w-full h-auto object-cover rounded-md"
          />

          {/* Desktop Image */}
          <img
            src={images.fromImg}
            alt="Desktop"
            className="hidden lg:block w-full h-full object-fill rounded-md"
          />
          {/* <img className="w-full object-cover" src={images.fromImg} /> */}
        </div>
        <div className="w-full lg:w-2/3 items-center lg:items-start flex flex-col gap-4 p-5">
          <p className="text-primary capitalize">Beauty Salon</p>
          <h3 className="text-black font-abhaya font-bold text-3xl md:text-5xl">
            Book appointment
          </h3>
          <span className="text-text-muted">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur, omnis.
          </span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5"
          >
            <Input
              type="text"
              label="First name"
              placeholder="First name"
              {...register("firstName", { required: "First name is required" })}
              error={errors.firstName?.message}
            />

            <Input
              type="text"
              label="Last name"
              placeholder="Last name"
              {...register("lastName", { required: "Last name is required" })}
              error={errors.lastName?.message}
            />

            <Input
              type="email"
              label="Email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              error={errors.email?.message}
            />

            <Input
              type="number"
              label="Phone"
              placeholder="Phone"
              {...register("phone", { required: "Phone is required" })}
              error={errors.phone?.message}
            />

            <Input
              type="date"
              label="Date"
              {...register("date", { required: "Date is required" })}
              error={errors.date?.message}
            />

            <Input
              type="time"
              label="Time"
              {...register("time", { required: "Time is required" })}
              error={errors.time?.message}
            />
            <div className="flex flex-col gap-1 lg:col-span-2">
              <label
                htmlFor="service"
                className="font-abhaya text-black text-2xl"
              >
                Service
              </label>
              <select
                {...register("service", {
                  required: "Please select a service",
                })}
                name="service"
                id="service"
                className={`py-2 px-4 border focus:outline-none focus:ring-1 rounded-sm ${
                  errors.service
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-primary border-text-muted"
                }`}
              >
                <option value="">service</option>
                <option value="Make up">Make up</option>
                <option value="Hair styling">Hair styling</option>
                <option value="Nail care">Nail care</option>
                <option value="Cosmetology">Cosmetology</option>
                <option value="Spa procedures">Spa procedures</option>
              </select>

              {errors.service && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.service.message}
                </p>
              )}
            </div>

            <button
              className="btn-primary lg:col-span-2 text-2xl"
              type="submit"
            >
              Book appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
