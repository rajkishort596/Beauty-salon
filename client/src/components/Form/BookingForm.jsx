import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import { useForm } from "react-hook-form";
import Input from "./Input/Input";
import { fetchServices } from "../../api/service.Api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../api/booking.Api.js";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../features/loading/loadingSlice";

const BookingForm = ({ isAuthenticated = false }) => {
  const userData = useSelector((state) => state.auth.user);
  // console.log("User Data:", userData);
  const [firstName, lastName] = userData?.fullName?.split(" ") || ["", ""];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(startLoading());
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("Please login first");
      return;
    }
    try {
      const res = await createBooking(data);
      console.log(res);
      toast.success("Appointment booked successfully");
      reset();
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Booking failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      dispatch(stopLoading());
    }
    console.log("Form Data:", data);
  };

  const [services, setServices] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchServices();
        // console.log(res.data.data);
        setServices(res.data.data);
        console.log(services);
      } catch (error) {
        toast.error("Error fetching services:", error);
        // console.error("Error fetching services:", error);
      }
    })();
  }, []);

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
              readonly={isAuthenticated}
              {...register("firstName", { required: "First name is required" })}
              error={errors.firstName?.message}
            />

            <Input
              type="text"
              label="Last name"
              placeholder="Last name"
              readonly={isAuthenticated}
              {...register("lastName", { required: "Last name is required" })}
              error={errors.lastName?.message}
            />

            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              readonly={isAuthenticated}
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
              label="Phone Number"
              placeholder="Eenter Phone Number"
              readonly={isAuthenticated}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              error={errors.phone?.message}
            />

            <Input
              type="date"
              label="Date"
              {...register("bookingDate", { required: "Date is required" })}
              error={errors.date?.message}
            />

            <Input
              type="time"
              label="Time"
              {...register("timeSlot", { required: "Time is required" })}
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
                {services.map((service) => (
                  <option key={service._id} value={service.name}>
                    {service.name}
                  </option>
                ))}

                {/* <option value="Make up">Make up</option>
                <option value="Hair styling">Hair styling</option>
                <option value="Nail care">Nail care</option>
                <option value="Cosmetology">Cosmetology</option>
                <option value="Spa procedures">Spa procedures</option> */}
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
