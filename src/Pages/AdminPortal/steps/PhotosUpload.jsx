import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { saveImages } from "../../../../src/features/onboarding/onboardingSlice";

const MAX_PHOTOS = 8;

const PhotosUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedPhotos, setSelectedPhotos] = useState(Array(MAX_PHOTOS).fill(null));

  const handleFileChange = (index, e) => {
     const file = e.target.files[0];
     if (!file) return;
     const updated = [...selectedPhotos];
     updated[index] = {
       file,
       preview: URL.createObjectURL(file),
       name: file.name
     };
     setSelectedPhotos(updated);
  };

  const handleContinue = () => {
    if (!selectedPhotos[0] || !selectedPhotos[1]) {
      alert("⚠️ Please upload at least 2 photos!");
      return;
    }

    const uploadedImages = selectedPhotos.filter(Boolean);
    dispatch(saveImages(uploadedImages)); // ✅ Redux me images save

    navigate("/onboarding/review"); // ✅ Review page me redirect
  };

  const photoLabels = [
    "Upload front page of your Property",
    "Upload your sitting area",
    ...Array(MAX_PHOTOS - 2).fill("Upload more photos"),
  ];

  return (
    <div className="space-y-6 max-w-screen-md mx-auto px-4">
      {/* --- Mandatory Uploads --- */}
      <div className="flex flex-wrap justify-center md:gap-16 gap-2">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="relative border-2 border-red-500 rounded-md h-32 w-full max-w-[240px] flex items-center justify-center overflow-hidden"
          >
            <input
              type="file"
              accept="image/*"
              id={`photo-${index}`}
              onChange={(e) => handleFileChange(index, e)}
              className="hidden"
            />
            <label
              htmlFor={`photo-${index}`}
              className="w-full h-full cursor-pointer flex items-center justify-center"
            >
              {selectedPhotos[index] ? (
                <div
                  style={{
                    backgroundImage: `url(${selectedPhotos[index].preview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <div className="text-center px-2 text-red-500 text-sm flex flex-col items-center justify-center">
                  <Plus size={32} className="text-red-400 mb-1" />
                  <span className="text-center font-semibold">{photoLabels[index]}</span>
                </div>
              )}
            </label>
          </div>
        ))}
      </div>

      {/* --- Continue Button Mandatory --- */}
      <div className="flex justify-center pt-1">
        <button
          onClick={handleContinue}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Continue
        </button>
      </div>

      {/* --- Optional Photos --- */}
      <h3 className="text-lg font-medium text-gray-700 pt-2">
        Upload Other Photos (Optional)
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {selectedPhotos.slice(2).map((photo, i) => {
          const index = i + 2;
          return (
            <div
              key={index}
              className="relative border border-gray-300 rounded-md h-24 w-full sm:w-56 flex items-center justify-center overflow-hidden"
            >
              <input
                type="file"
                accept="image/*"
                id={`photo-${index}`}
                onChange={(e) => handleFileChange(index, e)}
                className="hidden"
              />
              <label
                htmlFor={`photo-${index}`}
                className="w-full h-full cursor-pointer flex items-center justify-center"
              >
                {photo ? (
                  <div
                    style={{
                      backgroundImage: `url(${photo.preview})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <div className="text-center px-2 text-gray-500 text-xs flex flex-col items-center justify-center">
                    <Plus size={24} className="mb-1" />
                    <span className="text-center">{photoLabels[index]}</span>
                  </div>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotosUpload;
