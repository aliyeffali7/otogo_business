import { useState } from "react";
import eyeIcon from "../../../assets/icons/eye.svg";
import XIcon from "../../../assets/icons/x.svg";

const initialMessages = [
  {
    id: 1,
    title: "System",
    text: "zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin.",
  },
  {
    id: 2,
    title: "zerifre",
    text: " salam zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin.",
  },
  {
    id: 3,
    title: "System",
    text: " salam zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin. zordu davamı gəlsin.",
  },
];

function InboxCards() {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Filter messages by search string (case-insensitive)
  const filteredMessages = messages.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-sans">
      {/* Search bar */}
      <div className="flex justify-between items-center gap-[10px]">
        <input
          type="text"
          placeholder="Search"
          className="rounded-[12px] border border-[#A9ACBC] py-[15px] px-[16px] w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Message cards */}
      <div className="mt-4 flex flex-col gap-3">
        {filteredMessages.map((m) => (
          <div
            key={m.id}
            className="bg-[#C5C8D3] rounded-[12px] p-4 flex flex-col gap-2 relative"
          >
            {/* Header row */}
            <div className="flex justify-between items-start">
              <div className="font-medium">{m.title}</div>
              <div className="flex gap-2 items-center">
                <img src={eyeIcon} alt="" />
                <img
                  src={XIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => handleDelete(m.id)}
                />
              </div>
            </div>

            {/* Message text */}
            <div className="text-sm text-[#2C2F3A]">{m.text}</div>
          </div>
        ))}
        {filteredMessages.length === 0 && (
          <div className="text-center text-gray-500 mt-4">No messages found.</div>
        )}
      </div>
    </div>
  );
}

export default InboxCards;