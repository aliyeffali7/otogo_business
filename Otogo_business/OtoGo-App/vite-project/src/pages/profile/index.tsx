// import React from "react";
import BranchProfile from "../../components/main/branchProfile";
import BusinessInfo from "../../components/main/businessInformation";

function Profile() {
  return (
    <div className="container flex flex-col gap-[40px]">
      <BusinessInfo />
      <BranchProfile />
    </div>
  );
}

export default Profile;
