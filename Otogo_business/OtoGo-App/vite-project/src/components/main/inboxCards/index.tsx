import eyeIcon from "../../../assets/icons/eye.svg";
import XIcon from "../../../assets/icons/x.svg"

const dummyMessages = [
  {
    id: 1,
    title: "System",
    text: "zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin.",
  },
  {
    id: 2,
    title: "System",
    text: "zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin.",
  },
  {
    id: 3,
    title: "System",
    text: "zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin.",
  },
];

function InboxCards() {
  return (
    <div>
      {/* Search bar */}
      <div className="flex justify-between items-center gap-[10px]">
        <input
          type="text"
          placeholder="Search "
          className="rounded-[12px] border border-[#A9ACBC] py-[15px] px-[16px] w-full"
        />
      </div>

      {/* Message cards */}
      <div className="mt-4 flex flex-col gap-3">
        {dummyMessages.map((m) => (
          <div
            key={m.id}
            className="bg-[#C5C8D3] rounded-[12px] p-4 flex flex-col gap-2 relative"
          >
            {/* Header row */}
            <div className="flex justify-between items-start">
              <div className="font-medium">{m.title}</div>
              <div className="flex gap-2 items-center">
                <img src={eyeIcon} alt="" />
                <img src={XIcon} alt="" />
              
              </div>
            </div>

            {/* Message text */}
            <div className="text-sm text-[#2C2F3A]">{m.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InboxCards;
