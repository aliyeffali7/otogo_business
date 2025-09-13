// import React from "react";
import BranchProfile from "../../components/main/branchProfile";
import BusinessInfo from "../../components/main/businessInformation";

function Profile() {
  return (
    <div className="container flex flex-col gap-[40px] font-sans">
      <BusinessInfo />
      <BranchProfile />
    </div>
  );
}

export default Profile;
