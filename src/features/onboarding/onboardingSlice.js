import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyType: "", // ✅ default empty
  basicInfo: {
    name: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    PhoneNumber: "",
    WhatsaapNumber: "",
    email: "",
    mapUrl: ""
  },
  about: "",
  facilities: [],
  nearbyLocations: [],
  rules: [],
  plans: [],
  images: [], // ✅ backend match
 location: {
  latitude: null,
  longitude: null
}

};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    savePropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    saveBasicInfo: (state, action) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    saveAbout: (state, action) => {
      state.about = action.payload;
    },
    saveFacilities: (state, action) => {
      state.facilities = action.payload;
    },
    saveNearbyLocations: (state, action) => {
      state.nearbyLocations = action.payload;
    },
    saveRules: (state, action) => {
      state.rules = action.payload;
    },
    savePlans: (state, action) => {
      state.plans = action.payload;
    },
    saveImages: (state, action) => {
      state.images = action.payload; // ✅ photos → images
    },
    saveLocation: (state, action) => {
      state.location = action.payload;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  savePropertyType,
  saveBasicInfo,
  saveAbout,
  saveFacilities,
  saveNearbyLocations,
  saveRules,
  savePlans,
  saveImages,
  saveLocation,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
