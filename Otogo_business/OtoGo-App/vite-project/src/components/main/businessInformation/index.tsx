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
    <div className="flex flex-col gap-[40px] font-sans">
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

      <div className="flex font-sans">
        <div className="flex flex-col">
          <h2 className="text-[28px] font-bold">Name</h2>
          <p className="text-[18px] text-[#595D73]">
            {loading ? "Loading..." : data?.name || "-"}
          </p>
        </div>
        <div className="flex flex-col m-auto">
          <h3 className="text-[28px] font-bold">Tagline</h3>
          <p className="text-[18px] text-[#595D73]">
            {loading
              ? "Loading..."
              : data?.tag
              ? `#${data.tag.replace(/^#/, "")}`
              : "-"}
          </p>
        </div>
      </div>

      <div className="font-sans">
        <h4 className="text-[28px] font-bold">Description</h4>
        <p className="text-[18px] font-normal text-[#595D73] whitespace-pre-wrap">
          {loading ? "Loading..." : data?.description || "-"}
        </p>
      </div>

      {/* Modal */}
      {openEdit && (
        <div className="fixed inset-0 z-50 font-sans flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-[#14151A] text-[#E2E3E9] rounded-2xl shadow-lg w-[71.6vw]  p-8 relative">
            {/* Tablar */}
            <div className="flex justify-end mb-8">
              <button
                className={`px-[30px] py-2 rounded-md font-semibold transition flex items-center gap-[10px] ${
                  activeTab === "business"
                    ? "bg-white text-black"
                    : "bg-[#21232B] text-[#E2E3E9]"
                }`}
                onClick={() => setActiveTab("business")}
              >
                {/* SVG burada yerləşir */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 18 16"
                  fill="#14151A"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.50008 14.3333H2.33341V3.79998C2.33344 3.5376 2.41603 3.28187 2.56948 3.06904C2.72294 2.85621 2.93948 2.69706 3.18841 2.61415L9.85508 0.392481C10.043 0.329904 10.243 0.312861 10.4388 0.342756C10.6345 0.372652 10.8204 0.44863 10.981 0.564431C11.1417 0.680233 11.2725 0.832545 11.3628 1.00882C11.453 1.18509 11.5001 1.38028 11.5001 1.57831V14.3333H12.3334V6.82498C12.3335 6.76336 12.3472 6.70251 12.3735 6.64683C12.3999 6.59114 12.4383 6.542 12.486 6.50294C12.5337 6.46389 12.5894 6.43589 12.6492 6.42097C12.709 6.40604 12.7713 6.40457 12.8317 6.41665L14.6617 6.78331C14.945 6.83993 15.1999 6.99291 15.3831 7.21623C15.5664 7.43956 15.6666 7.71945 15.6667 8.00831V14.3333H16.5001C16.7211 14.3333 16.9331 14.4211 17.0893 14.5774C17.2456 14.7337 17.3334 14.9456 17.3334 15.1666C17.3334 15.3877 17.2456 15.5996 17.0893 15.7559C16.9331 15.9122 16.7211 16 16.5001 16H1.50008C1.27907 16 1.06711 15.9122 0.910826 15.7559C0.754545 15.5996 0.666748 15.3877 0.666748 15.1666C0.666748 14.9456 0.754545 14.7337 0.910826 14.5774C1.06711 14.4211 1.27907 14.3333 1.50008 14.3333Z" />
                </svg>
                Business
              </button>
              <button
                className={`px-[30px] py-2 rounded-md font-semibold transition ml-2 flex items-center gap-[10px] ${
                  activeTab === "branch"
                    ? "bg-white text-black"
                    : "bg-[#21232B] text-white"
                }`}
                onClick={() => setActiveTab("branch")}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.3264 0.600098C20.2476 0.600098 21.1312 0.966074 21.7826 1.61752C22.4341 2.26896 22.8 3.1525 22.8 4.07378V19.1264C22.8 20.0477 22.4341 20.9312 21.7826 21.5827C21.1312 22.2341 20.2476 22.6001 19.3264 22.6001H15.8527V15.6527C15.8527 14.7315 15.4867 13.8479 14.8353 13.1965C14.1838 12.545 13.3003 12.179 12.379 12.179H11.2211C10.2998 12.179 9.41628 12.545 8.76484 13.1965C8.11339 13.8479 7.74742 14.7315 7.74742 15.6527V22.6001H4.27373C3.35245 22.6001 2.46891 22.2341 1.81747 21.5827C1.16603 20.9312 0.800049 20.0477 0.800049 19.1264V4.07378C0.800049 3.1525 1.16603 2.26896 1.81747 1.61752C2.46891 0.966074 3.35245 0.600098 4.27373 0.600098H19.3264ZM12.379 14.4948C12.6626 14.4949 12.9363 14.599 13.1483 14.7875C13.3602 14.9759 13.4956 15.2356 13.5288 15.5173L13.5369 15.6527V22.6001H10.0632V15.6527C10.0632 15.3691 10.1674 15.0954 10.3558 14.8835C10.5443 14.6715 10.804 14.5361 11.0856 14.5029L11.2211 14.4948H12.379ZM19.3264 2.91589H4.27373C3.99013 2.91592 3.7164 3.02005 3.50446 3.2085C3.29253 3.39696 3.15713 3.65665 3.12394 3.93831L3.11584 4.07378V5.23168C3.11476 5.79712 3.3206 6.34343 3.69455 6.76757C4.06849 7.19171 4.5847 7.46438 5.14582 7.53417C5.70695 7.60395 6.27421 7.46603 6.74066 7.1464C7.2071 6.82677 7.54048 6.34753 7.67794 5.79904L7.715 5.61957C7.75733 5.3667 7.88239 5.13503 8.07056 4.96089C8.25874 4.78675 8.4994 4.67999 8.75479 4.65736L8.90531 4.65273C9.18892 4.65277 9.46265 4.75689 9.67459 4.94535C9.88652 5.1338 10.0219 5.39349 10.0551 5.67515L10.0632 5.81062C10.0634 6.25666 10.2352 6.68552 10.543 7.00833C10.8509 7.33115 11.2711 7.52316 11.7166 7.5446C12.1621 7.56603 12.5988 7.41524 12.9362 7.12347C13.2736 6.8317 13.4857 6.42132 13.5288 5.97736L13.5369 5.81062C13.5369 5.52702 13.6411 5.25329 13.8295 5.04135C14.018 4.82942 14.2777 4.69402 14.5593 4.66083L14.7156 4.65273C14.9713 4.64683 15.2218 4.72577 15.4279 4.87722C15.634 5.02867 15.7842 5.2441 15.855 5.48989L15.8851 5.61957C15.979 6.17801 16.2743 6.68269 16.7151 7.03818C17.1559 7.39367 17.7116 7.57533 18.2773 7.5488C18.8429 7.52228 19.3793 7.28942 19.7849 6.89424C20.1905 6.49907 20.4372 5.96898 20.4785 5.4042L20.4843 5.23168V4.07378C20.4842 3.79017 20.3801 3.51644 20.1916 3.30451C20.0032 3.09257 19.7435 2.95717 19.4618 2.92399L19.3264 2.91589Z"
                    fill="#C5C8D3"
                  />
                </svg>
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
