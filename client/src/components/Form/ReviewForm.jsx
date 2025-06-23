import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createReview } from "../../api/review.Api";
import { useState } from "react";
import Spinner from "../Spinner";
import images from "../../constants/images";

const ReviewForm = ({ isAuthenticated = false, services }) => {
  const userData = useSelector((state) => state.userAuth.user);
  const [loading, setLoading] = useState(false);
  //   const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error("Please login to submit a review.");
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      await createReview(data.service, data);
      toast.success("Review submitted!");
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg w-full px-4 py-10 md:px-18">
      <div className="bg-white p-8 flex flex-col items-center rounded-md shadow">
        <div className="flex flex-col lg:flex-row w-full gap-2.5 justify-center items-center">
          <div className="w-full xl:w-1/3">
            <img
              src={images.img8}
              alt="Mobile"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full flex flex-col xl:w-2/3 p-5 items-center lg:items-start">
            <h3 className="text-black font-abhaya font-bold text-3xl mb-4">
              Leave a Review
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              {/* Service Select */}
              <div className="flex flex-col gap-1">
                <label className="font-abhaya text-black text-xl">
                  Service
                </label>
                <select
                  {...register("service", { required: "Select a service" })}
                  className={`py-2 px-4 border focus:outline-none focus:ring-1 rounded-sm ${
                    errors.service
                      ? "border-red-500 focus:ring-red-300"
                      : "focus:ring-primary border-text-muted"
                  }`}
                >
                  <option value="">Select service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
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

              {/* Rating */}
              <div className="flex flex-col gap-1">
                <label className="font-abhaya text-black text-xl">Rating</label>
                <select
                  {...register("rating", { required: "Select a rating" })}
                  className={`py-2 px-4 border focus:outline-none focus:ring-1 rounded-sm ${
                    errors.rating
                      ? "border-red-500 focus:ring-red-300"
                      : "focus:ring-primary border-text-muted"
                  }`}
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                {errors.rating && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div className="flex flex-col gap-1">
                <label className="font-abhaya text-black text-xl">
                  Comment
                </label>
                <textarea
                  {...register("comment", {
                    required: "Comment is required",
                    minLength: { value: 10, message: "Comment too short" },
                  })}
                  rows={4}
                  placeholder="Write your review..."
                  className={`py-2 px-4 border focus:outline-none focus:ring-1 rounded-sm ${
                    errors.comment
                      ? "border-red-500 focus:ring-red-300"
                      : "focus:ring-primary border-text-muted"
                  }`}
                />
                {errors.comment && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              {loading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="btn-primary w-full text-xl max-w-50 mt-2 cursor-pointer"
                  disabled={!isAuthenticated}
                >
                  Submit Review
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
