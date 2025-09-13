import React, { useState } from "react";

const reasons = [
  "Hate Speech/Offensive Language",
  "False Information",
  "Irrelevant Content",
  "Conflict of Interest",
  "Privacy Violation",
  "Prohibited Content",
  "Other",
];

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  onReport: (reason: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ open, onClose, onReport }) => {
  const [selected, setSelected] = useState<number | null>(null);

  if (!open) return null;

  const isValid = selected !== null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      setSelected(null);
    }
  };

  const handleReportClick = () => {
    if (selected !== null) {
      const reason = reasons[selected];
      onReport(reason);
      setSelected(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm font-sans"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#14151A] rounded-2xl p-8 w-full max-w-xl relative text-[#A9ACBC]  max-h-[642px]">
        <h2 className="text-center text-lg font-bold mb-2 text-[#E2E3E9]">Report Review</h2>
        <p className="text-center text-sm mb-6 text-gray-300">
          By reporting this review, you confirm that you believe it violates our guidelines and consent to its submission for review
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {reasons.map((reason, idx) => (
            <button
              key={reason}
              type="button"
              className={`px-[30px] py-[10px] rounded-lg text-sm font-medium  transition bg-[#2C2F3A]
                ${selected === idx ? "bg-gray-200 text-black" : "bg-[#23252B] border-[#23252B] text-white hover:bg-[#31343A]"}`}
              onClick={() => setSelected(idx)}
            >
              {reason}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            className="flex-1 py-3 rounded-lg bg-[#2C2F3A] text-white font-semibold transition hover:bg-[#31343A]"
            onClick={() => {
              onClose();
              setSelected(null);
            }}
          >
            CANCEL
          </button>
          <button
            className={`flex-1 py-3 rounded-lg font-semibold transition
              ${isValid
                ? "bg-[#CF6365] hover:bg-[#c74e4e] text-[#14151A] cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
            disabled={!isValid}
            onClick={handleReportClick}
          >
            REPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;