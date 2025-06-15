import { useWatch } from "react-hook-form";
import camera from "../assets/images/photo-camera.png";
import profile from "../assets/images/Profile-Img.png";

const ProfileUploader = ({ register, errors, control }) => {
  const profileImage = useWatch({ control, name: "avatar" });

  const imagePreview = profileImage?.[0]
    ? URL.createObjectURL(profileImage[0])
    : profile;

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="avatar"
        className="relative w-30 h-30 rounded-full shadow-md cursor-pointer"
      >
        <img
          src={imagePreview}
          alt="Profile Preview"
          className="w-full h-full object-cover rounded-full"
        />

        <div className="absolute bottom-0 left-0 p-2 bg-white rounded-full shadow">
          <img src={camera} alt="Upload" className="w-5 h-5" />
        </div>
      </label>

      {/* Hidden file input */}
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        {...register("avatar", {
          required: "Profile picture is required",
        })}
        className="hidden"
      />

      {/* Error display */}
      {errors.avatar && (
        <p className="text-sm text-red-600">{errors.avatar.message}</p>
      )}
    </div>
  );
};

export default ProfileUploader;
