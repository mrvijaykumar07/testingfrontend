import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import config from "../../app/env.js";

const DEMO_IMAGE = "https://i.postimg.cc/3JBrx3H5/1.jpg";

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

const FInput = ({ label, ...props }) => (
  <div className="relative w-full">
    <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
      {label}
    </label>
    <input
      {...props}
      className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 
      focus:ring-indigo-300 focus:border-indigo-500 outline-none`}
    />
  </div>
);

const FTextarea = ({ label, ...props }) => (
  <div className="relative w-full">
    <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
      {label}
    </label>
    <textarea
      {...props}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 
      focus:ring-indigo-300 focus:border-indigo-500 outline-none"
    />
  </div>
);

const emptyPlan = () => ({
  planName: "",
  price: "",
  originalPrice: "",
  discount: "",
  imageUrl: DEMO_IMAGE,
  planFile: null,
  hasNewFile: false,
  facilities: [],
  bookings: {
    seatReservation: false,
    studyRoom: false,
    instantMembership: false,
    guestEntry: false,
  },
});

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BACKEND_URL = config.BACKEND_URL;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [entitySource, setEntitySource] = useState("");

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
    facilities: [],
    rules: [],
    about: "",
    images: [],
  });

  const [plans, setPlans] = useState([emptyPlan()]);
  const propertyImageInputRef = useRef(null);

  const mapBackendToForm = (d) => ({
    propertyType: d.entity || "",
    name: d.name || "",
    email: d.email || "",
    phone: d.PhoneNumber || "",
    whatsapp: d.WhatsaapNumber || "",
    state: d.state || "",
    city: d.city || "",
    area: d.area || "",
    pincode: d.pincode ? String(d.pincode) : "",
    mapUrl: d.mapUrl || "",
    facilities: Array.isArray(d.facilities) ? d.facilities : [],
    rules: Array.isArray(d.rules) ? d.rules : [],
    about: d.about || "",
    images: d.images?.length ? d.images : [DEMO_IMAGE],
  });

  const mapBackendToPlans = (arr) =>
    Array.isArray(arr) && arr.length
      ? arr.map((p) => ({
          planName: p.planName || "",
          price: p.price ?? "",
          originalPrice: p.originalPrice ?? "",
          discount: p.discount ?? "",
          imageUrl: p.imageUrl || DEMO_IMAGE,
          planFile: null,
          hasNewFile: false,
          facilities: Array.isArray(p.facilities) ? p.facilities : [],
          bookings: {
            seatReservation: !!p.bookings?.seatReservation,
            studyRoom: !!p.bookings?.studyRoom,
            instantMembership: !!p.bookings?.instantMembership,
            guestEntry: !!p.bookings?.guestEntry,
          },
        }))
      : [emptyPlan()];

  useEffect(() => {
    let cancel = false;

    const load = async () => {
      try {
        const lib = await axios
          .get(`${BACKEND_URL}/library/details/${id}`)
          .catch(() => null);
        if (lib?.data?.success) {
          const data = lib.data.data.library || lib.data.data;
          if (!cancel) {
            setEntitySource("library");
            setFormData(mapBackendToForm(data));
            setPlans(mapBackendToPlans(data.plans));
          }
          return;
        }

        const coach = await axios
          .get(`${BACKEND_URL}/coaching/details/${id}`)
          .catch(() => null);
        if (coach?.data?.success) {
          const data = coach.data.data.coaching || coach.data.data;
          if (!cancel) {
            setEntitySource("coaching");
            setFormData(mapBackendToForm(data));
            setPlans(mapBackendToPlans(data.plans));
          }
          return;
        }

        alert("Not found");
        navigate(-1);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    load();
    return () => (cancel = true);
  }, [id]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const toggleFacility = (x) => {
    setFormData((p) => ({
      ...p,
      facilities: p.facilities.includes(x)
        ? p.facilities.filter((y) => y !== x)
        : [...p.facilities, x],
    }));
  };

  const toggleRule = (x) => {
    setFormData((p) => ({
      ...p,
      rules: p.rules.includes(x)
        ? p.rules.filter((y) => y !== x)
        : [...p.rules, x],
    }));
  };

  const handlePropertyImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    if (propertyImageInputRef.current)
      propertyImageInputRef.current.value = null;
  };

  const removePropertyImage = (index) => {
    setFormData((prev) => {
      const arr = [...prev.images];
      const rm = arr.splice(index, 1)[0];
      if (rm instanceof File && rm._preview?.startsWith("blob:"))
        URL.revokeObjectURL(rm._preview);
      return { ...prev, images: arr };
    });
  };

  const clearAllImages = () => {
    formData.images.forEach((it) => {
      if (it instanceof File && it._preview?.startsWith("blob:")) {
        URL.revokeObjectURL(it._preview);
      }
    });
    setFormData((p) => ({ ...p, images: [] }));
    if (propertyImageInputRef.current)
      propertyImageInputRef.current.value = null;
  };

  const getPreviewSrc = (img) => {
    if (img instanceof File) {
      if (!img._preview) img._preview = URL.createObjectURL(img);
      return img._preview;
    }
    return img;
  };

  const addPlan = () => setPlans((p) => [...p, emptyPlan()]);
  const removePlan = (i) => setPlans((p) => p.filter((_, idx) => idx !== i));

  const updatePlanField = (idx, field, val) => {
    setPlans((p) =>
      p.map((pl, i) => {
        if (i !== idx) return pl;
        const u = { ...pl, [field]: val };

        if (field === "price" || field === "discount") {
          const pr = parseFloat(u.price);
          const dc = parseFloat(u.discount);
          if (!isNaN(pr) && !isNaN(dc) && dc >= 0 && dc < 100) {
            u.originalPrice = +(pr / (1 - dc / 100)).toFixed(2);
          } else if (!isNaN(pr) && (u.discount === "" || isNaN(dc))) {
            u.originalPrice = +pr.toFixed(2);
          } else {
            u.originalPrice = "";
          }
        }

        return u;
      })
    );
  };

  const handlePlanFile = (idx, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);

    setPlans((p) =>
      p.map((pl, i) =>
        i === idx
          ? { ...pl, imageUrl: preview, planFile: file, hasNewFile: true }
          : pl
      )
    );
  };

  const togglePlanFacility = (idx, f) => {
    setPlans((p) =>
      p.map((pl, i) =>
        i === idx
          ? {
              ...pl,
              facilities: pl.facilities.includes(f)
                ? pl.facilities.filter((x) => x !== f)
                : [...pl.facilities, f],
            }
          : pl
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Enter name");
    if (!formData.email) return alert("Enter email");

    setSubmitting(true);

    try {
      const payloadPlans = plans.map((pl) => ({
        planName: pl.planName,
        price: Number(pl.price) || 0,
        originalPrice: pl.originalPrice || pl.price,
        discount: pl.discount || "",
        imageUrl: pl.planFile ? pl.imageUrl : pl.imageUrl,
        facilities: pl.facilities,
        bookings: pl.bookings,
      }));

      const type = formData.propertyType || entitySource;
      const baseUrl =
        type === "coaching"
          ? `${BACKEND_URL}/coaching`
          : `${BACKEND_URL}/library`;

      const fd = new FormData();

      const scalar = {
        entity: type,
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
      };

      Object.entries(scalar).forEach(([k, v]) => fd.append(k, v || ""));

      fd.append("rules", JSON.stringify(formData.rules));
      fd.append("facilities", JSON.stringify(formData.facilities));
      fd.append("plans", JSON.stringify(payloadPlans));

      const newFiles = formData.images.filter((it) => it instanceof File);

      if (newFiles.length > 0) {
        newFiles.forEach((f) => fd.append("images", f));
      } else {
        const urls = formData.images.filter((it) => typeof it === "string");
        urls.forEach((u) => fd.append("images", u));
      }

      plans.forEach((pl) => {
        if (pl.planFile instanceof File) fd.append("planImages", pl.planFile);
      });

      await axios.put(`${baseUrl}/update/${id}`, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Updated Successfully");
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert("Update Failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Property</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <FInput
              label="WhatsApp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
            />

            <FInput
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />

            <FInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <FInput
              label="Area"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />

            <FInput
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <FInput
                label="Google Map URL"
                name="mapUrl"
                value={formData.mapUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* About */}
          <FTextarea
            label="About"
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
          />

          {/* Rules */}
          <div>
            <p className="font-medium mb-2">Rules</p>
            <div className="flex flex-wrap gap-3">
              {rulesList.map((r) => (
                <label key={r} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rules.includes(r)}
                    onChange={() => toggleRule(r)}
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>

          {/* IMAGES */}
          <div>
            <p className="font-medium mb-2">Images</p>

            <input
              ref={propertyImageInputRef}
              id="imgInp"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handlePropertyImageUpload}
            />

            <label
              htmlFor="imgInp"
              className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
            >
              Upload Images
            </label>

            {formData.images.length > 0 && (
              <button
                type="button"
                onClick={clearAllImages}
                className="ml-4 text-red-500"
              >
                Clear All
              </button>
            )}

            <div className="flex gap-3 flex-wrap mt-3">
              {formData.images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={getPreviewSrc(img)}
                    className="w-24 h-24 object-cover rounded border"
                    alt=""
                  />
                  <button
                    type="button"
                    onClick={() => removePropertyImage(i)}
                    className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div>
            <p className="font-medium mb-2">Plans</p>

            {plans.map((pl, idx) => (
              <div key={idx} className="border p-4 rounded mb-4">
                <div className="flex justify-between">
                  <strong>Plan #{idx + 1}</strong>
                  <button
                    type="button"
                    onClick={() => removePlan(idx)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <FInput
                    label="Plan Name"
                    value={pl.planName}
                    onChange={(e) =>
                      updatePlanField(idx, "planName", e.target.value)
                    }
                  />

                  <FInput
                    label="Price"
                    type="number"
                    value={pl.price}
                    onChange={(e) =>
                      updatePlanField(idx, "price", e.target.value)
                    }
                  />

                  <FInput
                    label="Discount %"
                    type="number"
                    value={pl.discount}
                    onChange={(e) =>
                      updatePlanField(idx, "discount", e.target.value)
                    }
                  />

                  <FInput
                    label="Actual Price"
                    value={pl.originalPrice}
                    readOnly
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePlanFile(idx, e.target.files[0])}
                  className="border p-2 rounded mt-3 w-full"
                />

                {pl.imageUrl && (
                  <img
                    src={pl.imageUrl}
                    alt=""
                    className="w-24 h-24 object-cover rounded mt-2 border"
                  />
                )}

                <div className="mt-3">
                  <p className="font-medium text-sm mb-1">Plan Facilities</p>
                  <div className="flex flex-wrap gap-3">
                    {facilityList.map((f) => (
                      <label
                        key={f}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={pl.facilities.includes(f)}
                          onChange={() => togglePlanFacility(idx, f)}
                        />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addPlan}
              className="bg-indigo-600 text-white px-3 py-2 rounded"
            >
              + Add Plan
            </button>
          </div>

          <button
            disabled={submitting}
            className="bg-indigo-600 text-white w-full py-3 rounded text-lg"
          >
            {submitting ? "Updating..." : "Update Property"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProperty;
