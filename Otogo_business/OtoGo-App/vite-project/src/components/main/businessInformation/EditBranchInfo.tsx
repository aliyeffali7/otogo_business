import React, { useState } from "react";

type Props = {
  branchName: string;
  branchLocation: string;
  onBranchNameChange: (v: string) => void;
  onBranchLocationChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const branchTabs = [
  "Narimanov",
  "Khatai",
  "Garayev",
  "Elmlar"
];

const EditBranchInfo: React.FC<Props> = ({
  branchName,
  branchLocation,
  onBranchNameChange,
  onBranchLocationChange,
  onSave,
  onCancel,
}) => {
  const [activeBranchTab, setActiveBranchTab] = useState(branchTabs[0]);
  // Demo üçün şəkil və workhours statik saxlanılıb

  return (
    <div className="font-sans">
      <h2 className="text-2xl font-bold mb-6">Edit Branch Profile</h2>

      {/* Branch tab-ları */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {branchTabs.map((branch) => (
          <button
            key={branch}
            className={`px-4 py-2 rounded-full font-semibold transition uppercase text-xs ${
              activeBranchTab === branch
                ? "bg-[#21232B] text-white"
                : "bg-[#23242D] text-[#A9ACBC]"
            }`}
            onClick={() => setActiveBranchTab(branch)}
            type="button"
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Şəkil və upload button */}
      <div className="flex gap-6 mb-6">
        {/* Mövcud şəkil */}
        <div className="w-1/2 h-[120px] bg-[#23242D] rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src="https://placehold.co/160x100/png"
            className="rounded-xl object-cover"
            alt="branch"
          />
        </div>
        {/* Upload üçün boş box */}
        <div className="w-1/2 h-[120px] bg-[#23242D] rounded-xl flex items-center justify-center text-[#A9ACBC] text-3xl cursor-pointer">
          +
        </div>
      </div>

      {/* Branch name input */}
      <div className="mb-6">
        <label className="block text-[#A9ACBC] mb-2 font-medium">Branch name:</label>
        <input
          className="w-full rounded-lg p-2 bg-[#21232B] text-[#A9ACBC]"
          value={branchName}
          onChange={(e) => onBranchNameChange(e.target.value)}
        />
      </div>

      {/* İş saatları (mockup üçün) */}
      <div className="mb-6">
        <label className="block text-[#A9ACBC] mb-2 font-medium">Workhours:</label>
        <div className="flex flex-wrap gap-2">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(day => (
            <div key={day} className="bg-[#23242D] rounded-lg px-3 py-1 text-xs text-[#A9ACBC]">
              {day} 00:00 - 12:00
            </div>
          ))}
        </div>
      </div>

      {/* Location input */}
      <div className="mb-6">
        <label className="block text-[#A9ACBC] mb-2 font-medium">Location:</label>
        <input
          className="w-full rounded-lg p-2 bg-[#21232B] text-[#A9ACBC]"
          value={branchLocation}
          onChange={(e) => onBranchLocationChange(e.target.value)}
        />
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded-lg bg-[#21232B] hover:bg-zinc-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="flex-1 px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBranchInfo;