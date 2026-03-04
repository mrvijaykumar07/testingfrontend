import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  profileImage: null, // ✅ NEW FIELD FOR PROFILE IMAGE
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ✅ Login / Set User data
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },

    // ✅ Update profile picture URL from backend
    updateProfilePicture: (state, action) => {
      if (state.currentUser) {
        state.currentUser.profile_picture_url = action.payload;
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }
    },

    // ✅ Store actual profile image (Base64 or direct URL)
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },

    // ✅ Favorites update
    updateFavorites: (state, action) => {
      if (state.currentUser) {
        state.currentUser.favorites = action.payload;
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }
    },

    // ✅ Logout user
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.profileImage = null;
      localStorage.removeItem("user");
    },

    // ✅ Load user from localStorage
    loadUserFromStorage: (state) => {
      const userData = localStorage.getItem("user");
      if (userData) {
        state.currentUser = JSON.parse(userData);
        state.isLoggedIn = true;
      }
    }
  },
});

export const {
  setUser,
  updateProfilePicture,
  updateFavorites,
  logoutUser,
  loadUserFromStorage,
  setProfileImage, // ✅ Don't forget to export this
} = userSlice.actions;

export default userSlice.reducer;
