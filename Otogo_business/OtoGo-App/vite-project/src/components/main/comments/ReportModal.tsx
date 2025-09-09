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
  const [otherText, setOtherText] = useState<string>("");

  if (!open) return null;

  const isOther = selected === reasons.length - 1;
  const isValid =
    selected !== null &&
    (!isOther || (otherText && otherText.trim().length > 15));

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      setSelected(null);
      setOtherText("");
    }
  };

  const handleReportClick = () => {
    if (selected !== null) {
      const reason =
        isOther && otherText ? `Other: ${otherText.trim()}` : reasons[selected];
      onReport(reason); // Modalı bağlıyırıq, mesaj parent komponentdə çıxacaq
      setSelected(null);
      setOtherText("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#181A20] rounded-2xl p-8 w-full max-w-xl relative text-white shadow-2xl">
        <h2 className="text-center text-lg font-bold mb-2">Report Review</h2>
        <p className="text-center text-sm mb-6 text-gray-300">
          By reporting this review, you confirm that you believe it violates our guidelines and consent to its submission for review
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {reasons.map((reason, idx) => (
            <button
              key={reason}
              type="button"
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                ${selected === idx ? "bg-gray-200 text-black" : "bg-[#23252B] border-[#23252B] text-white hover:bg-[#31343A]"}`}
              onClick={() => setSelected(idx)}
            >
              {reason}
            </button>
          ))}
        </div>
        {isOther && (
          <textarea
            className="w-full rounded-lg p-2 text-black mb-6"
            rows={4}
            placeholder="Please write your reason (at least 15 characters)..."
            value={otherText}
            onChange={e => setOtherText(e.target.value)}
          />
        )}
        <div className="flex gap-4">
          <button
            className="flex-1 py-3 rounded-lg bg-[#23252B] text-white font-semibold transition hover:bg-[#31343A]"
            onClick={() => {
              onClose();
              setSelected(null);
              setOtherText("");
            }}
          >
            CANCEL
          </button>
          <button
            className={`flex-1 py-3 rounded-lg font-semibold transition
              ${isValid
                ? "bg-[#E8676B] hover:bg-[#c74e4e] text-white cursor-pointer"
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