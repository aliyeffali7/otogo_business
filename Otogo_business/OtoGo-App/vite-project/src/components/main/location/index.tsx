// import React from "react";
import LocationImg from "../../../assets/location.svg";
function Location() {
  return (
    <div className="mt-[60px]" >
      <h1 className="text-[28px] font-bold mb-[17px]" >Location</h1>
      <img src={LocationImg} alt="location" style={{width: "100%"}}/>
    </div>
  );
}

export default Location;
