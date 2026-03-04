import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../../app/env.js";
import axios from "axios";
import { resetOnboarding } from "../../features/onboarding/onboardingSlice";
import Header from "./Header";
import NoImagePhoto from "../../assets/images/NoImageUploded.png";
import { RiArrowLeftLine } from "react-icons/ri";

const DEMO_IMAGE = NoImagePhoto;

const rulesList = ["No mobile phones", "Keep silence", "No food or drinks"];
const facilityList = [
  "Wifi",
  "Parking",
  "Library",
  "AC",
  "Canteen",
  "Hostel",
  "CCTV",
];

const emptyPlan = () => ({
  planName: "",
  price: "",
  originalPrice: "",
  discount: "",
  imageUrl: DEMO_IMAGE,
  planFile: null,
  facilities: [],
  bookings: {},
});

const OnBoarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BACKEND_URL = config.BACKEND_URL;

  const [formData, setFormData] = useState({
    propertyType: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    mapUrl: "",
    rules: [],
    about: "",
    images: [],
    imagePreviews: [],
    facilities: [], // ✅ added main facilities field
  });

  const [plans, setPlans] = useState([emptyPlan()]);
  const [submitting, setSubmitting] = useState(false);

  // 🧹 Cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      formData.imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
      plans.forEach((p) => {
        if (p.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(p.imageUrl);
      });
    };
  }, [formData.imagePreviews, plans]);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRule = (r) => {
    setFormData((p) => {
      const exists = p.rules.includes(r);
      return {
        ...p,
        rules: exists ? p.rules.filter((x) => x !== r) : [...p.rules, r],
      };
    });
  };

  // ✅ Handle multiple property image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews],
    }));

    e.target.value = null;
  };

  // -----------------------------
  // Plans
  // -----------------------------
  const addPlan = () => setPlans((p) => [...p, emptyPlan()]);
  const removePlan = (index) =>
    setPlans((p) => p.filter((_, i) => i !== index));

  const updatePlanField = (index, field, value) =>
    setPlans((p) =>
      p.map((pl, i) => {
        if (i !== index) return pl;
        const updated = { ...pl, [field]: value };

        if (field === "price" || field === "discount") {
          const price = parseFloat(updated.price);
          const discount = parseFloat(updated.discount);
          const validP = !Number.isNaN(price);
          const validD =
            !Number.isNaN(discount) && discount >= 0 && discount < 100;

          if (validP && validD) {
            updated.originalPrice = parseFloat(
              (price / (1 - discount / 100)).toFixed(2)
            );
          } else if (
            validP &&
            (updated.discount === "" || Number.isNaN(discount))
          ) {
            updated.originalPrice = parseFloat(price.toFixed(2));
          } else {
            updated.originalPrice = "";
          }
        }
        return updated;
      })
    );

  const handlePlanFile = (index, file) => {
    setPlans((p) =>
      p.map((pl, i) =>
        i === index
          ? { ...pl, planFile: file, imageUrl: URL.createObjectURL(file) }
          : pl
      )
    );
  };

  // ✅ Updated to merge distinct facilities into main formData.facilities
  const togglePlanFacility = (index, fac) =>
    setPlans((prevPlans) => {
      const updatedPlans = prevPlans.map((pl, i) =>
        i === index
          ? {
              ...pl,
              facilities: pl.facilities.includes(fac)
                ? pl.facilities.filter((x) => x !== fac)
                : [...pl.facilities, fac],
            }
          : pl
      );

      // Merge all facilities into distinct list
      const mergedFacilities = [
        ...new Set(updatedPlans.flatMap((p) => p.facilities)),
      ];

      setFormData((prev) => ({ ...prev, facilities: mergedFacilities }));

      return updatedPlans;
    });

  // -----------------------------
  // Submit
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.propertyType) return alert("Select property type");
    if (!formData.name) return alert("Enter name");
    if (formData.images.length === 0)
      return alert("Please upload at least one image");

    setSubmitting(true);

    const backendURL =
      formData.propertyType === "coaching"
        ? `${BACKEND_URL}/coaching/create`
        : `${BACKEND_URL}/library/create`;

    try {
      // ✅ Merge facilities before submission as a safeguard
      const mergedFacilities = [...new Set(plans.flatMap((p) => p.facilities))];
      formData.facilities = mergedFacilities;

      const fd = new FormData();
      Object.entries({
        entity: formData.propertyType,
        name: formData.name,
        email: formData.email,
        PhoneNumber: formData.phone,
        WhatsaapNumber: formData.whatsapp,
        state: formData.state,
        city: formData.city,
        area: formData.area,
        pincode: formData.pincode,
        mapUrl: formData.mapUrl,
        about: formData.about,
      }).forEach(([key, val]) => fd.append(key, val || ""));

      fd.append("rules", JSON.stringify(formData.rules));
      fd.append("facilities", JSON.stringify(formData.facilities)); // ✅ added main facilities
      fd.append("plans", JSON.stringify(plans));

      formData.images.forEach((file) => fd.append("images", file));
      plans.forEach((pl) => {
        if (pl.planFile) fd.append("planImages", pl.planFile);
      });

      const res = await axios.post(backendURL, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Property created successfully!");
      console.log("Submitted:", res.data);

      dispatch(resetOnboarding());
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error submitting form ❌");
    } finally {
      setSubmitting(false);
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white ">
        <div className="max-w-4xl mx-auto px-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-6 space-y-6"
          >
            <div className="flex items-center gap-3">
              {/* Back Arrow Button */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                <RiArrowLeftLine className="w-6 h-6" />
              </button>

              {/* Heading */}
              <h1 className="text-xl font-bold text-gray-800">
                OnBoard New Property
              </h1>
            </div>

            {/* Property Type */}
            <section>
              <h2 className="font-semibold text-gray-700 mb-2">
                Property Type
              </h2>
              <div className="flex gap-4">
                {["library", "coaching"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-center border rounded-lg px-4 py-2 w-full cursor-pointer transition ${
                      formData.propertyType === type
                        ? "border-indigo-900 bg-indigo-50 text-indigo-700"
                        : "border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      value={type}
                      checked={formData.propertyType === type}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {type === "library" ? "📚 Library" : "🏫 Coaching"}
                  </label>
                ))}
              </div>
            </section>

            {/* Basic Info */}
            <section className="space-y-3">
              <h2 className="font-semibold text-gray-700">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "name",
                  "email",
                  "phone",
                  "whatsapp",
                  "state",
                  "city",
                  "area",
                  "pincode",
                  "mapUrl",
                ].map((field) => (
                  <div key={field} className="relative">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600 capitalize">
                      {field}
                    </label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required={["name", "email"].includes(field)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* About */}
            <section>
              <h2 className="font-semibold text-gray-700">About</h2>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-300"
              />
            </section>

            {/* Rules */}
            <section>
              <h2 className="font-semibold text-gray-700">Rules</h2>
              <div className="flex flex-wrap gap-3">
                {rulesList.map((r) => (
                  <label
                    key={r}
                    className={`px-2 py-1 rounded-lg border shadow-sm cursor-pointer text-sm ${
                      formData.rules.includes(r)
                        ? "bg-indigo-50 border-indigo-200"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.rules.includes(r)}
                      onChange={() => toggleRule(r)}
                      className="mr-1"
                    />
                    {r}
                  </label>
                ))}
              </div>
            </section>

            {/* Property Images */}
            <section>
              <h2 className="text-md font-semibold text-gray-800 ">
                Upload Property Images{" "}
                <span className="text-gray-500 text-xs">(1 required)</span>
              </h2>
              <input
                id="propertyImages"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex items-center gap-3">
                <label
                  htmlFor="propertyImages"
                  className="inline-flex items-center w-full px-8 py-2 mt-1 bg-gray-200 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-300 transition"
                >
                  📤 Choose Images
                </label>
                {formData.imagePreviews.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        images: [],
                        imagePreviews: [],
                      }))
                    }
                    className="text-red-500 hover:underline text-sm"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {formData.imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {formData.imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const toRevoke = formData.imagePreviews[idx];
                          if (toRevoke?.startsWith("blob:"))
                            URL.revokeObjectURL(toRevoke);
                          const newImages = formData.images.filter(
                            (_, i) => i !== idx
                          );
                          const newPreviews = formData.imagePreviews.filter(
                            (_, i) => i !== idx
                          );
                          setFormData((prev) => ({
                            ...prev,
                            images: newImages,
                            imagePreviews: newPreviews,
                          }));
                        }}
                        className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Plans */}
            <section className="space-y-4">
              <h2 className="font-semibold text-gray-700">Plans</h2>
              {plans.map((pl, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl p-4 bg-gray-50 relative"
                >
                  <div className="flex justify-between mb-2">
                    <strong>Plan #{idx + 1}</strong>
                    <button
                      type="button"
                      onClick={() => removePlan(idx)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Plan Name, Price, Discount */}
                  <input
                    placeholder="Plan Name"
                    value={pl.planName}
                    onChange={(e) =>
                      updatePlanField(idx, "planName", e.target.value)
                    }
                    className="border p-2 rounded-lg w-full mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      placeholder="Price"
                      type="number"
                      value={pl.price}
                      onChange={(e) =>
                        updatePlanField(idx, "price", e.target.value)
                      }
                      className="border p-2 rounded-lg"
                    />
                    <input
                      placeholder="Discount %"
                      type="number"
                      value={pl.discount}
                      onChange={(e) =>
                        updatePlanField(idx, "discount", e.target.value)
                      }
                      className="border p-2 rounded-lg"
                    />
                  </div>

                  {/* Facilities (inside plan) */}
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Facilities for this plan
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {facilityList.map((f) => (
                        <label
                          key={f}
                          className={`px-2 py-1 rounded-lg border text-xs cursor-pointer ${
                            pl.facilities.includes(f)
                              ? "bg-indigo-50 border-indigo-200"
                              : "bg-white border-gray-100"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={pl.facilities.includes(f)}
                            onChange={() => togglePlanFacility(idx, f)}
                            className="mr-1"
                          />
                          {f}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Plan Image */}
                  <div className="mt-3">
                    <label className="text-sm font-medium">Plan Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePlanFile(idx, e.target.files[0])}
                      className="block w-full border border-gray-300 rounded-lg p-2 mt-1"
                    />
                    {pl.imageUrl && (
                      <img
                        src={pl.imageUrl}
                        alt="Plan Preview"
                        className="w-24 h-24 object-cover mt-2 rounded-lg border"
                      />
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addPlan}
                className="bg-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                + Add Plan
              </button>
            </section>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-900 text-white py-3 rounded-lg font-semibold disabled:opacity-60 hover:bg-indigo-700 shadow"
            >
              {submitting ? "Submitting..." : "Submit Property"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OnBoarding;
