import { useForm, useWatch } from "react-hook-form";
import Input from "./Input/Input";
import clsx from "clsx";

const CATEGORIES = [
  "Make up",
  "Hair styling",
  "Nail care",
  "cosmetology",
  "SPA procedures",
];

const DiscountForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      percentage: initialData?.percentage || "",
      category: initialData?.category || [],
      validFrom: initialData?.validFrom?.slice(0, 10) || "",
      validTill: initialData?.validTill?.slice(0, 10) || "",
    },
  });

  const selectedCategories = useWatch({ control, name: "category" }) || [];
  const discountBanner = useWatch({ control, name: "image" });

  const imagePreview = discountBanner?.[0]
    ? URL.createObjectURL(discountBanner[0])
    : initialData?.image?.url || null;

  const toggleCategory = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setValue("category", updated, { shouldValidate: true });
  };

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("image", data.image?.[0]);
    formData.append("title", data.title);
    formData.append("percentage", data.percentage);
    formData.append("description", data.description);
    formData.append("validFrom", data.validFrom);
    formData.append("validTill", data.validTill);
    data.category.forEach((id) => {
      formData.append("category[]", id);
    });
    console.log(data);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {/* Title */}
      <div>
        <Input
          label="Title"
          name="title"
          placeholder="Discount Title"
          {...register("title", { required: "Title is required" })}
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Percentage */}
      <div>
        <Input
          label="Percentage (%)"
          name="percentage"
          placeholder="Discount Percentage"
          {...register("percentage", {
            required: "Percentage is required",
            min: { value: 1, message: "Min is 1%" },
            max: { value: 100, message: "Max is 100%" },
          })}
          type="number"
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.percentage && (
          <p className="text-red-500 text-sm">{errors.percentage.message}</p>
        )}
      </div>

      {/* Category Toggle Buttons */}
      <div className="space-y-2">
        <label className="font-abhaya text-black text-xl">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <button
                type="button"
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={clsx(
                  "px-4 py-1 rounded-full border text-sm transition cursor-pointer",
                  isSelected
                    ? "bg-red-800 text-white border-red-800"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:border-gray-400"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
        {errors.category && (
          <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Valid From - To */}
      <div className="flex gap-4">
        <Input
          name="validFrom"
          label="Valid From"
          {...register("validFrom")}
          type="date"
          className="flex-1 border border-gray-300 rounded p-2"
        />
        <Input
          label="Valid Till"
          name="validTill"
          {...register("validTill")}
          type="date"
          className="flex-1 border border-gray-300 rounded p-2"
        />
      </div>

      {/* Image Upload */}
      <div className="items-end mb-0">
        <label className="font-abhaya text-black text-xl mb-2 block">
          Discount Banner
        </label>
        <div className="flex items-center w-full gap-4">
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center aspect-video h-32 border-2 border-dashed border-gray-300 rounded hover:border-primary transition"
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

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
        >
          {initialData?._id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default DiscountForm;
