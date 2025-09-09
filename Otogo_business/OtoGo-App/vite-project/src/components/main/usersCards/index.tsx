// import React from "react";
import ZoomIn from "../../../assets/zoom.svg";
function UsersCards() {
  const users = [
    {
      id: 1,
      name: "Amil Abbasov",
      role: "Motorist",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "Aysel Quliyeva",
      role: "Designer",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Ramil Huseynov",
      role: "Developer",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "Leyla Məmmədova",
      role: "Manager",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 5,
      name: "Leyla Məmmədova",
      role: "Manager",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 6,
      name: "Leyla Məmmədova",
      role: "Manager",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 7,
      name: "Leyla Məmmədova",
      role: "Manager",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 8,
      name: "Leyla Məmmədova",
      role: "Manager",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 9,
      name: "Leyla Məmmədova",
      role: "Manager",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 10,
      name: "Leyla Məmmədova",
      role: "Manager",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center gap-[10px]">
        <input
          type="text"
          placeholder="Search Staff"
          className="rounded-[12px] border border-[#A9ACBC] py-[15px] px-[16px] w-[832px]"
        />
        <div className="flex gap-[10px] items-center justify-center">
          <button className="bg-black text-white rounded-[12px] w-[200px]  py-[14px] text-[18px]">
            COLLABORATE
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-[17px]">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#0F0F12] rounded-[12px] px-6 py-4 flex items-center justify-between"
          >
            {/* Left - Avatar + Info */}
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-[50px] h-[50px] rounded-full border-2 border-white"
              />
              <div>
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-[#A9ACBC] text-sm">{user.role}</p>
              </div>
            </div>

            {/* Right - Icon */}
            <img src={ZoomIn} alt="" />
            {/* <FaExpandAlt className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersCards;
