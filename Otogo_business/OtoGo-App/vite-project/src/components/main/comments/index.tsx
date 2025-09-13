import  { useState } from "react";
import FlagIcon from "../../../assets/icons/flag.svg";
import PersonIcon from "../../../assets/icons/person.svg";
import ReportModal from "./ReportModal";
interface Comment {
  id: number;
  user: string;
  category: "service" | "product";
  title: string;
  text: string;
  rating: number;
}

const dummyComments: Comment[] = [
  {
    id: 1,
    user: "Amil A.",
    category: "service",
    title: "Service > Engine Repair",
    text: "zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin.",
    rating: 1,
  },
  {
    id: 2,
    user: "Leyla M.",
    category: "product",
    title: "Product > Turbo Spark Plug",
    text: "Super işləyir, çox razıyam!",
    rating: 5,
  },
  {
    id: 3,
    user: "Amil A.",
    category: "service",
    title: "Service > Oil Change",
    text: "Əla xidmət göstərdilər, tövsiyə edirəm.",
    rating: 4,
  },
];

function Comments() {
  const [activeTab, setActiveTab] = useState<"service" | "product" | null>(null);
  const [search, setSearch] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [reportOpenId, setReportOpenId] = useState<number | null>(null);
  // const handleReport = (reason: string) => {
  //   alert(`Reported for: ${reason}`);
  //   setReportOpenId(null);
  // };
  const filtered = dummyComments.filter((c) => {
    const matchesSearch =
      c.user.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.text.toLowerCase().includes(search.toLowerCase());

    if (!activeTab) return matchesSearch; // heç bir tab aktiv deyilsə hamısı
    return c.category === activeTab && matchesSearch;
  });

  const toggleTab = (tab: "service" | "product") => {
    setActiveTab((prev) => (prev === tab ? null : tab)); // eyni tab-a basanda söndür
  };
  const handleReport = (reason: string) => {
    setReportOpenId(null);
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 2000); // 2.5 saniyəyə gizlənir
  };
  return (
  
    <div>
      {/* Top bar */}
      <div className="flex justify-between items-center gap-[10px]">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-[12px] border border-[#A9ACBC] py-[15px] px-[16px] w-[832px]"
        />
        <div className="flex gap-[10px] items-center justify-center">
          <button
            onClick={() => toggleTab("service")}
            className={`rounded-[12px] w-[161px] py-[14px] text-[18px] ${
              activeTab === "service"
                ? "bg-[#2C2F3A] text-white"
                : "bg-[#C5C8D3] text-[#2C2F3A]"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => toggleTab("product")}
            className={`rounded-[12px] w-[161px] py-[14px] text-[18px] ${
              activeTab === "product"
                ? "bg-[#2C2F3A] text-white"
                : "bg-[#C5C8D3] text-[#2C2F3A]"
            }`}
          >
            Products
          </button>
        </div>
      </div>

<div className="mt-4 flex flex-col gap-3">
  {filtered.map((c) => (
    <div
      key={c.id}
      className="bg-[#C5C8D3] rounded-[12px] p-4 flex flex-col gap-2 relative"
    >
      {/* Top row - profil icon + user + title */}
      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px] bg-[#000] text-white flex items-center justify-center rounded-full">
          <img src={PersonIcon} alt="img" />
        </div>
        <div className="font-medium text-[#2C2F3A]">
          {c.user} &gt; {c.title}
        </div>
      </div>

      {/* Rating */}
      <div className="text-[#A9ACBC] text-sm">
        {"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}
      </div>

      {/* Comment text */}
      <div className="text-sm text-[#595D73]">{c.text}</div>

      {/* Flag icon sağ yuxarı küncdə */}
      <img
        src={FlagIcon}
        alt="flag"
        className="cursor-pointer absolute top-3 right-3"
        onClick={() => setReportOpenId(c.id)}
      />
       <ReportModal
  open={reportOpenId === c.id}
  onClose={() => setReportOpenId(null)}
  onReport={handleReport}
/>

    </div>
    
  ))}
</div>

{showPrompt && (
 <div className="fixed left-1/2 top-1/2 z-[1001] -translate-x-1/2 -translate-y-1/2 bg-[#14151A] text-[#A9ACBC] px-4 sm:px-8 py-4 rounded-xl shadow-lg text-base sm:text-lg text-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
 <p className="text-[#E2E3E9] font-bold">Thank you</p>
 Our team will investigate the review in question and take the necessary steps if it is found to breach our guidelines.<br />
 We appreciate your help in keeping the platform safe and reliable.
</div>
)}


    </div>
  );
 
}

export default Comments;
