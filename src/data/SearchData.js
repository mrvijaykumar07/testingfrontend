const placeList = [
  "Saheed Nagar",
  "Bapuji Nagar",
  "Jaydev Vihar",
  "Khandagiri",
  "Patia",
  "Chandrasekharpur",
  "Acharya Vihar",
  "Vani Vihar",
  "Nayapalli",
  "Unit 1",
  "Unit 2",
  "Unit 3",
  "Unit 4",
  "Unit 5",
  "Unit 6",
  "Unit 7",
  "Unit 8",
  "Unit 9",
  "Baramunda",
  "Bomikhal",
  "Palasuni",
  "Rasulgarh",
  "Mancheswar",
  "Kesura",
  "Laxmisagar",
  "Kalpana Square",
  "CRP Square",
  "Master Canteen",
  "Railway Station Road",
  "KIIT Square",
  "Kalinga Nagar",
  "Sailashree Vihar",
  "Jagamara",
  "Jharapada",
  "Bhimatangi",
  "Ghatikia",
  "Kharavel Nagar",
  "Hanspal",
  "Tankapani Road",
  "BDA Colony",
  "Gajapati Nagar",
  "Sahidnagar",
  "Dumduma",
  "Ganga Nagar",
  "Fire Station Square",
  "Press Chhak",
  "Badagada",
  "Old Town",
  "Lewis Road",
  "Kalpana Square",
];





const libraryList = [
  { name: "Harekrushna Mahtab State Library" },
  { name: "OUAT Central Library" },
  { name: "BDA Library IRC Village" },
  { name: "SOA University Central Library" },
  { name: "KIIT Central Library" },
  { name: "Utkal University Central Library" },
  { name: "State Archive Library Unit-4" },
  { name: "Public Library Saheed Nagar" }
];




export { placeList }; 

const combinedSearchList = [...libraryList, ...placeList];

export default combinedSearchList;
