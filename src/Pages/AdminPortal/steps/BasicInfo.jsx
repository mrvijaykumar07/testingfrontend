import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { placeList } from "../../../data/SearchData";
import { saveBasicInfo } from "../../../features/onboarding/onboardingSlice";

const indianStates = [ "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal" ];
const cities = ["Bhubaneswar", "Nayagarh", "Cuttack", "Rourkela"];

const BasicInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    PhoneNumber: "",
    WhatsaapNumber: "",
    state: "",
    city: "",
    area: "",
    mapUrl: "",
    pincode: ""
  });

  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const fuse = new Fuse(placeList, { includeScore: true, threshold: 0.3 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "area") setAreaSuggestions(value ? fuse.search(value).map(r => r.item) : []);
    if (name === "state") setStateSuggestions(value ? indianStates.filter(s => s.toLowerCase().includes(value.toLowerCase())) : []);
    if (name === "city") setCitySuggestions(value ? cities.filter(c => c.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "area") setAreaSuggestions([]);
    if (field === "state") setStateSuggestions([]);
    if (field === "city") setCitySuggestions([]);
  };

  const handleContinue = () => {
    dispatch(saveBasicInfo(formData));
    navigate("/onboarding/facilities");
  };

  return (
    <div className="bg-white px-4 sm:p-5 shadow rounded-md max-w-screen-md mx-auto">
      <h2 className="text-lg font-semibold">Basic Information</h2>

      <input name="name" placeholder="Library Name" className="input" onChange={handleChange} />

      <input name="email" placeholder="Email" className="input" onChange={handleChange} />

      <input name="PhoneNumber" placeholder="Phone Number" className="input" onChange={handleChange} />

      <input name="WhatsaapNumber" placeholder="WhatsApp Number" className="input" onChange={handleChange} />

      <input name="state" placeholder="State" className="input" onChange={handleChange} />
      {stateSuggestions.length > 0 && stateSuggestions.map(s => <div onClick={() => handleSelect("state", s)}>{s}</div>)}

      <input name="city" placeholder="City" className="input" onChange={handleChange} />
      {citySuggestions.length > 0 && citySuggestions.map(c => <div onClick={() => handleSelect("city", c)}>{c}</div>)}

      <input name="area" placeholder="Area" className="input" onChange={handleChange} />
      {areaSuggestions.length > 0 && areaSuggestions.map(a => <div onClick={() => handleSelect("area", a)}>{a}</div>)}

      <input name="pincode" placeholder="Pincode" className="input" onChange={handleChange} />

      <input name="mapUrl" placeholder="Google Map URL" className="input" onChange={handleChange} />

      <button onClick={handleContinue} className="btn-primary mt-4">Continue</button>
    </div>
  );
};

export default BasicInfo;
