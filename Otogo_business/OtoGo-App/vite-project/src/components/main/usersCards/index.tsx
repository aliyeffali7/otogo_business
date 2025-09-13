// @refresh reset
import  { useMemo, useState, useDeferredValue, useCallback } from "react";
import ZoomIn from "../../../assets/zoom.svg";
import UserModal, { type User, type BranchName } from "./UserModal";

function normalize(str: string): string {
  return (str || "")
    .toLocaleLowerCase("az")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

const BRANCHES: BranchName[] = ["NARIMANOV", "KHATAI", "GARAYEV", "ELMLAR"]; // istədiyiniz qədər əlavə edin

const initialUsers: User[] = [
  {
    id: 1,
    name: "Amil Abbasov",
    role: "Motorist",
    username: "amil.abbasov",
    avatar: "https://i.pravatar.cc/100?img=1",
    branch: "NARIMANOV",
    services: ["Oil change", "Diagnostics"],
  },
  {
    id: 2,
    name: "Aysel Quliyeva",
    role: "Designer",
    username: "aysel.quliyeva",
    avatar: "https://i.pravatar.cc/100?img=2",
    branch: "KHATAI",
    services: ["UI review", "Brand update"],
  },
  {
    id: 3,
    name: "Ramil Huseynov",
    role: "Developer",
    username: "ramil.huseynov",
    avatar: "https://i.pravatar.cc/100?img=3",
    branch: "KHATAI",
    services: ["API integration", "Bug fixing"],
  },
  {
    id: 4,
    name: "Leyla Məmmədova",
    role: "Manager",
    username: "leyla.mammadova",
    avatar: "https://i.pravatar.cc/100?img=4",
    branch: "GARAYEV",
    services: ["Team scheduling", "Reporting"],
  },
  {
    id: 5,
    name: "Elvin Əliyev",
    role: "Mechanic",
    username: "elvin.aliyev",
    avatar: "https://i.pravatar.cc/100?img=5",
    branch: "GARAYEV",
    services: ["Brake service", "Suspension"],
  },
  {
    id: 6,
    name: "Nigar Məmmədli",
    role: "Support",
    username: "nigar.mammadli",
    avatar: "https://i.pravatar.cc/100?img=6",
    branch: "GARAYEV",
    services: ["Customer support", "Phone inquiries"],
  },
  {
    id: 7,
    name: "Turan Qasımov",
    role: "QA Engineer",
    username: "turan.qasimov",
    avatar: "https://i.pravatar.cc/100?img=7",
    branch: "ELMLAR",
    services: ["Test planning", "Automation"],
  },
  {
    id: 8,
    name: "Amina Hacıyeva",
    role: "Accountant",
    username: "amina.haciyeva",
    avatar: "https://i.pravatar.cc/100?img=8",
    branch: "ELMLAR",
    services: ["Invoices", "Payroll"],
  },
  {
    id: 9,
    name: "Orxan Rzayev",
    role: "Service Advisor",
    username: "orxan.rzayev",
    avatar: "https://i.pravatar.cc/100?img=9",
    branch: "NARIMANOV",
    services: ["Intake", "Estimates"],
  },
  {
    id: 10,
    name: "Sara Əhmədova",
    role: "Receptionist",
    username: "sara.ehmedova",
    avatar: "https://i.pravatar.cc/100?img=10",
    branch: "NARIMANOV",
    services: ["Front desk", "Bookings"],
  },
];

const UserRow = ({
  user,
  onExpand,
}: {
  user: User;
  onExpand: (u: User) => void;
}) => {
  return (
    <li className="bg-[#2C2F3A] rounded-[12px] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={`${user.name} avatar`}
          className="w-[50px] h-[50px] rounded-full border-2 border-white object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div>
          <p className="text-white font-semibold">{user.name}</p>
          <p className="text-[#A9ACBC] text-sm">{user.role}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onExpand(user)}
        className="p-2 rounded-md hover:bg-white/10 transition-colors"
        aria-label={`Expand details for ${user.name}`}
      >
        <img src={ZoomIn} alt="" aria-hidden="true" />
      </button>
    </li>
  );
};

export default function UsersCards() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const q = normalize(deferredQuery);

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<User | null>(null);

  const filtered = useMemo(() => {
    if (!q) return users;
    return users.filter(
      (u) => normalize(u.name).includes(q) || normalize(u.role).includes(q)
    );
  }, [users, q]);

  const onExpand = useCallback((u: User) => {
    setCurrent(u);
    setOpen(true);
  }, []);

  const onSaveBranch = useCallback(
    (userId: number, newBranch: BranchName) => {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, branch: newBranch } : u))
      );
    },
    []
  );

  const onCollaborate = useCallback((u: User) => {
    // Burada istədiyiniz əməliyyatı edin (routing, dialog, API və s.)
    console.log("Collaborate with", u);
  }, []);

  return (
    <section className="w-full font-sans">
      <div className="flex justify-between items-center gap-[10px] font-sans">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Staff"
          className="rounded-[12px] border border-[#A9ACBC] py-[15px] px-[16px] w-[832px] bg-transparent text-[#2C2F3A] placeholder:text-[#A9ACBC] focus:outline-none focus:ring-2 "
          aria-label="Search staff by name or role"
        />
        {/* <div className="flex gap-[10px] items-center justify-center">
          <button
            className="bg-black text-white rounded-[12px] w-[200px] py-[14px] text-[18px] hover:bg-black/80 transition-colors"
            type="button"
            onClick={() => console.log("Collaborate with filtered", filtered)}
          >
            COLLABORATE
          </button>
        </div> */}
      </div>

      <ul className="flex flex-col gap-4 mt-[17px]">
        {filtered.length === 0 ? (
          <li className="text-[#A9ACBC] text-sm px-2 py-4">
            No users match “{query}”.
          </li>
        ) : (
          filtered.map((user) => (
            <UserRow key={user.id} user={user} onExpand={onExpand} />
          ))
        )}
      </ul>

      <UserModal
        open={open}
        user={current}
        branchOptions={BRANCHES}
        onClose={() => setOpen(false)}
        onSaveBranch={(id, b) => {
          onSaveBranch(id, b);
          // Save-dən sonra modal açıq qalır, düymələr Back/Collaborate-ə qayıdır
          // istəsəniz avtomatik bağlamaq üçün setOpen(false) əlavə edin
        }}
        onCollaborate={onCollaborate}
      />
    </section>
  );
}
