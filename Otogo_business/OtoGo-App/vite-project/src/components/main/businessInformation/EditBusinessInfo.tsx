// 
import React from "react";

type Props = {
  name: string;
  tag: string;
  description: string;
  onNameChange: (v: string) => void;
  onTagChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const EditBusinessInfo: React.FC<Props> = ({
  name,
  tag,
  description,
  onNameChange,
  onTagChange,
  onDescriptionChange,
  onSave,
  onCancel,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Business Profile</h2>
      <div className="flex flex-col gap-4 ">
        <div>
          <label className="block mb-1 font-medium">Business Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full rounded-lg p-2 bg-[#21232B] text-[#A9ACBC]"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Business Tag:</label>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A9ACBC] pointer-events-none">#</span>
            <input
              type="text"
              value={tag}
              onChange={(e) => onTagChange(e.target.value)}
              className="w-full rounded-lg p-2 pl-7 bg-[#21232B] text-[#A9ACBC] outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full rounded-lg p-2 min-h-[120px] bg-[#21232B] text-[#A9ACBC]"
          />
        </div>
      </div>
      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded-lg hover:bg-zinc-600 transition bg-[#21232B]"
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

export default EditBusinessInfo;