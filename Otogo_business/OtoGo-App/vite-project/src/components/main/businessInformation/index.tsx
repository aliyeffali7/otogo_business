// 

import React, { useEffect, useState } from "react";
import { businessProfile } from "../../../services/businessProfile";
import EditBusinessInfo from "./EditBusinessInfo";
import EditBranchInfo from "./EditBranchInfo";

type Biz = {
  id: number;
  name: string;
  tag?: string;
  description?: string;
};

function BusinessInfo() {
  const [data, setData] = useState<Biz | null>(null);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [activeTab, setActiveTab] = useState<"business" | "branch">("business");

  // Edit sahələri üçün state
  const [editName, setEditName] = useState("");
  const [editTag, setEditTag] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branchLocation, setBranchLocation] = useState("");

  // Biznes məlumatını yüklə
  const getBusinessInfo = async () => {
    try {
      setLoading(true);
      const res = await businessProfile();
      setData({
        id: res?.id ?? 0,
        name: res?.name ?? "",
        tag: res?.tag ?? res?.tagline ?? "",
        description: res?.description ?? "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessInfo();
  }, []);

  // Edit açılırsa, sahələri doldur
  const openEditModal = () => {
    setEditName(data?.name ?? "");
    setEditTag(data?.tag ?? "");
    setEditDescription(data?.description ?? "");
    setActiveTab("business");
    setOpenEdit(true);
  };

  // Modal Save və ya Cancel basılanda
  const handleModalClose = () => {
    setOpenEdit(false);
    setActiveTab("business");
  };

  // Modal Save və ya Cancel-da tab reset
  const handleSaveBusiness = () => {
    // Burada API call və s. edilə bilər
    setOpenEdit(false);
    setActiveTab("business");
    getBusinessInfo();
  };
  const handleSaveBranch = () => {
    // Branch üçün də ayrıca API call və s. ola bilər
    setOpenEdit(false);
    setActiveTab("business");
  };

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex justify-between items-center">
        <h1 className="text-[48px] font-space font-bold ">
          Business Information
        </h1>
        <button
          onClick={openEditModal}
          className="bg-[#14151A] hover:bg-zinc-800 transition duration-200 cursor-pointer text-white rounded-[12px] px-[40px] py-[10px]"
        >
          Edit
        </button>
      </div>

      <div className="flex">
        <div className="flex flex-col">
          <h2 className="text-[28px] font-bold">Name</h2>
          <p className="text-[18px] text-[#595D73]">
            {loading ? "Loading..." : (data?.name || "-")}
          </p>
        </div>
        <div className="flex flex-col m-auto">
          <h3 className="text-[28px] font-bold">Tagline</h3>
          <p className="text-[18px] text-[#595D73]">
            {loading ? "Loading..." : (data?.tag ? `#${data.tag.replace(/^#/,"")}` : "-")}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-[28px] font-bold">Description</h4>
        <p className="text-[18px] font-normal text-[#595D73] whitespace-pre-wrap">
          {loading ? "Loading..." : (data?.description || "-")}
        </p>
      </div>

      {/* Modal */}
      {openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-[#181920] text-white rounded-2xl shadow-lg w-full max-w-2xl p-8 relative">
            {/* Tablar */}
            <div className="flex justify-end mb-8">
              <button
                className={`px-5 py-2 rounded-md font-semibold transition ${
                  activeTab === "business" ? "bg-white text-black" : "bg-[#21232B] text-white"
                }`}
                onClick={() => setActiveTab("business")}
              >
                Business
              </button>
              <button
                className={`px-5 py-2 rounded-md font-semibold transition ml-2 ${
                  activeTab === "branch" ? "bg-white text-black" : "bg-[#21232B] text-white"
                }`}
                onClick={() => setActiveTab("branch")}
              >
                Branch
              </button>
            </div>
            {/* Content */}
            {activeTab === "business" ? (
              <EditBusinessInfo
                name={editName}
                tag={editTag}
                description={editDescription}
                onNameChange={setEditName}
                onTagChange={setEditTag}
                onDescriptionChange={setEditDescription}
                onSave={handleSaveBusiness}
                onCancel={handleModalClose}
              />
            ) : (
              <EditBranchInfo
                branchName={branchName}
                branchLocation={branchLocation}
                onBranchNameChange={setBranchName}
                onBranchLocationChange={setBranchLocation}
                onSave={handleSaveBranch}
                onCancel={handleModalClose}
              />
            )}
            {/* Close button */}

          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessInfo;