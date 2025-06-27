import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import { useForm } from "react-hook-form";
import Input from "./Input/Input";
import { fetchAllServices } from "../../api/service.Api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBooking, fetchAvailableSlots } from "../../api/booking.Api.js";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../features/loading/loadingSlice";
import { fetchSpecialists } from "../../api/specialist.Api.js";
import Spinner from "../Spinner.jsx";
import { useMemo } from "react";

const BookingForm = ({ isAuthenticated = false }) => {
  const userData = useSelector((state) => state.userAuth.user);
  const loading = useSelector((state) => state.loading);
  const [firstName, lastName] = userData?.fullName?.split(" ") || ["", ""];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
  });

  const [services, setServices] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const selectedDate = watch("bookingDate");
  const selectedSpecialist = watch("specialist");
  const selectedService = watch("service");

  // Load services and specialists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await fetchAllServices();
        setServices(servicesRes.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch services.");
      }

      try {
        const specialistsRes = await fetchSpecialists();
        setSpecialists(specialistsRes.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch specialists.");
      }
    };
    fetchData();
  }, []);

  // Load available slots when date, specialist and service change
  useEffect(() => {
    const loadAvailableSlots = async () => {
      // Only fetch if all required fields are selected and data is loaded
      if (
        !selectedDate ||
        !selectedSpecialist ||
        !selectedService ||
        specialists.length === 0 ||
        services.length === 0
      ) {
        setAvailableSlots([]);
        return;
      }

      const specialist = specialists.find((s) => s.name === selectedSpecialist);
      const service = services.find((s) => s.name === selectedService);

      if (!specialist || !service) {
        setAvailableSlots([]);
        return;
      }

      try {
        const response = await fetchAvailableSlots(
          specialist._id,
          selectedDate,
          service.name
        );
        setAvailableSlots(response?.data?.data || []);
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Failed to fetch available slots."
        );
        setAvailableSlots([]);
      }
    };

    loadAvailableSlots();
  }, [
    selectedDate,
    selectedSpecialist,
    selectedService,
    specialists,
    services,
  ]);

  const filteredSpecialists = useMemo(() => {
    if (!selectedService) return specialists;
    return specialists.filter((sp) =>
      sp.expertise?.some((exp) =>
        typeof exp === "string"
          ? services.find((s) => s._id === exp)?.name === selectedService
          : exp?.name === selectedService
      )
    );
  }, [selectedService, specialists, services]);

  const filteredServices = useMemo(() => {
    if (!selectedSpecialist) return services;
    const selected = specialists.find((sp) => sp.name === selectedSpecialist);
    if (!selected) return services;
    return services.filter((s) =>
      selected.expertise?.some((exp) =>
        typeof exp === "string" ? exp === s._id : exp?._id === s._id
      )
    );
  }, [selectedSpecialist, specialists, services]);

  const onSubmit = async (data) => {
    dispatch(startLoading());
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("Please login first");
      dispatch(stopLoading());
      return;
    }

    try {
      const res = await createBooking(data);
      toast.success("Appointment booked successfully");
      reset();
      setAvailableSlots([]);
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Booking failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="bg-bg w-full px-4 py-15 md:px-18">
      <div className="bg-white p-10 flex flex-col items-center lg:flex-row gap-2.5">
        <div className="w-full lg:w-1/3">
          <img
            src={images.makeupImg}
            alt="Mobile"
            className="block lg:hidden w-full h-auto object-cover rounded-md"
          />
          <img
            src={images.fromImg}
            alt="Desktop"
            className="hidden lg:block w-full h-full object-fill rounded-md"
          />
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
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />
            <Input
              type="number"
              label="Phone Number"
              placeholder="Enter phone number"
              readonly={isAuthenticated}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number",
                },
              })}
              error={errors.phone?.message}
            />
            <Input
              type="date"
              label="Date"
              {...register("bookingDate", { required: "Date is required" })}
              error={errors.bookingDate?.message}
            />

            {/* Available Time Slot Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="font-abhaya text-black text-2xl">Time</label>
              <select
                {...register("timeSlot", {
                  required: "Please select a time slot",
                })}
                className={`py-2 px-4 border focus:outline-none focus:ring-1 rounded-sm ${
                  errors.timeSlot
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-primary border-text-muted"
                }`}
              >
                <option value="">-- Select Time --</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.timeSlot && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.timeSlot.message}
                </p>
              )}
            </div>

            {/* Service Select */}
            <div className="flex flex-col gap-1">
              <label className="font-abhaya text-black text-2xl">Service</label>
              <select
                {...register("service", { required: "Select a service" })}
                className={`py-2 px-4 border focus:outline-none focus:ring-1 rounded-sm ${
                  errors.service
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-primary border-text-muted"
                }`}
              >
                <option value="">service</option>
                {filteredServices.map((service) => (
                  <option key={service._id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.service.message}
                </p>
              )}
            </div>

            {/* Specialist Select */}
            <div className="flex flex-col gap-1">
              <label className="font-abhaya text-black text-2xl">
                Specialist
              </label>
              <select
                {...register("specialist", { required: "Select a specialist" })}
                className={`py-2 px-4 border focus:outline-none focus:ring-1 rounded-sm ${
                  errors.specialist
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-primary border-text-muted"
                }`}
              >
                <option value="">specialist</option>
                {filteredSpecialists.map((sp) => (
                  <option key={sp._id} value={sp.name}>
                    {sp.name}
                  </option>
                ))}
              </select>
              {errors.specialist && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.specialist.message}
                </p>
              )}
            </div>

            {loading ? (
              <div className="lg:col-span-2">
                <Spinner />
              </div>
            ) : (
              <button
                type="submit"
                className="btn-primary w-full lg:col-span-2 text-2xl"
              >
                Book appointment
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
