// src/utils/apiBase.js
export const getBaseRoute = (propertyType) => {
  return propertyType === "Library" ? "/library" : "/coaching";
};
