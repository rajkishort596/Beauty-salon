import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createReview } from "../../api/review.Api";
import { useState } from "react";
import Spinner from "../Spinner";
import images from "../../constants/images";

const ReviewForm = ({ isAuthenticated = false, services }) => {
  const [loading, setLoading] = useState(false);
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
              <div className="flex flex-col gap-1 w-full">
                <label className="font-abhaya text-black text-xl">
                  Service
                </label>
                <select
                  {...register("service", { required: "Select a service" })}
                  className={`px-4 py-2 rounded-md border bg-white text-gray-800 transition-all duration-300 outline-none
                            ${
                              errors.service
                                ? "border-red-500 focus:ring-red-300 text-red-600"
                                : "border-gray-300 focus:ring-primary"
                            }
                            focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md`}
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

              {/* Rating Select */}
              <div className="flex flex-col gap-1 w-full">
                <label className="font-abhaya text-black text-xl">Rating</label>
                <select
                  {...register("rating", { required: "Select a rating" })}
                  className={`px-4 py-2 rounded-md border bg-white text-gray-800 transition-all duration-300 outline-none
                            ${
                              errors.rating
                                ? "border-red-500 focus:ring-red-300 text-red-600"
                                : "border-gray-300 focus:ring-primary"
                            }
                            focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md`}
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

              {/* Comment Textarea */}
              <div className="flex flex-col gap-1 w-full">
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
                  className={`px-4 py-2 rounded-md border bg-white text-gray-800 transition-all duration-300 outline-none resize-none
                            ${
                              errors.comment
                                ? "border-red-500 focus:ring-red-300 text-red-600"
                                : "border-gray-300 focus:ring-primary"
                            }
                            focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md`}
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
                  className="btn-primary w-full text-xl max-w-50 mt-2 cursor-pointer hover:translate-y-1 rounded-sm transition"
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
