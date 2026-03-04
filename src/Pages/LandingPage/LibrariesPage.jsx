import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCard from "./Card/FullCard";
import MobilePageHeader from "./Card/MobilePageHeader";
import UpdateSearchBox from "./UpdateSearchBox";
import FullCard2 from "./Card/DemoCards/FullCard2";
import FullCard3 from "./Card/DemoCards/FullCard3";
import FullCard4 from "./Card/DemoCards/FullCard4";
import FullCard5 from "./Card/DemoCards/FullCard5";

const LibrariesPage = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setShowSearchBox(false); // ✅ Hide the UpdateSearchBox
    navigate("/librariespast"); // ✅ Optionally navigate
  };

  return (
    <div className="items-center justify-between py-12 gap-2 pt-10 z-0 md:px-20 max-w-3xl m-auto">
      <MobilePageHeader onEditClick={() => setShowSearchBox(true)} />

      {showSearchBox && <UpdateSearchBox onSearchClick={handleSearchClick} />}

      <FullCard />
      <FullCard3 />

      <FullCard2 />
      <FullCard4 />

      <FullCard5 />
      <FullCard2 />
      <FullCard />
      <FullCard3 />
      <FullCard />
      <FullCard3 />

      <FullCard2 />
      <FullCard />
      <FullCard3 />

      <FullCard2 />
      <FullCard4 />

      <FullCard5 />
      <FullCard2 />
      <FullCard />
      <FullCard3 />
      <FullCard />
      <FullCard3 />

      <FullCard2 />
    </div>
  );
};

export default LibrariesPage;
