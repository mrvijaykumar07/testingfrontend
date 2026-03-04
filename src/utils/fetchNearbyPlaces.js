const fetchNearbyPlaces = async (lat, lng, type = "library", keyword = "") => {
  const query = new URLSearchParams({
    lat,
    lng,
    type,
    keyword,
  }).toString();

  const res = await fetch(`/api/nearby-places?${query}`);
  if (!res.ok) throw new Error("Failed to fetch places");

  const data = await res.json();
  return data;
};

export default fetchNearbyPlaces;
