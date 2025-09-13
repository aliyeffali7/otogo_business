// import React from "react";
import CarWash from "../../../assets/wash.svg";
import Location from "../location";
function BranchProfile() {
  return (
    <div className="font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-[48px] font-bold">Branch Profile</h1>
        <div className="flex justify-center  items-center gap-7">
          <p className="hover:bg-black hover:text-white cursor-pointer transition duration-200 p-[15px] rounded-[12px] ">
            NARIMANOV
          </p>
          <p className="hover:bg-black hover:text-white cursor-pointer transition duration-200 p-[15px]  rounded-[12px]">
            NARIMANOV
          </p>
          <p className="hover:bg-black hover:text-white cursor-pointer transition duration-200 p-[15px]  rounded-[12px]">
            KHATAI
          </p>
          <p className="hover:bg-black hover:text-white cursor-pointer transition duration-200 p-[15px]  rounded-[12px]">
            GARAYEV
          </p>
          <p className="hover:bg-black hover:text-white cursor-pointer transition duration-200 p-[15px]  rounded-[12px]">
            ELMLAR
          </p>
        </div>
      </div>
      <img src={CarWash} alt="carwash" className="rounded-[20px] mt-[40px]" style={{ width: "100%", height: "auto" }} />
      <div className="mt-[40px]">
        <h2 className="text-[28px] font-bold">Workhours</h2>
        <div className="flex text-[18px]">
          <p className="text-[#595D73]">
            Mon <span className="text-[#A9ACBC]">8:30 - 21:00 /</span>
          </p>
          <p className="text-[#595D73]">
            Mon <span className="text-[#A9ACBC]"> 8:30 - 21:00 /</span>
          </p>
          <p className="text-[#595D73]">
            {" "}
            Mon <span className="text-[#A9ACBC]">8:30 - 21:00</span>
          </p>
        </div>
      </div>
      <Location />
    </div>
  );
}

export default BranchProfile;
