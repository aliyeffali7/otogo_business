import { useEffect, useState } from "react";
import Modal from "../../common/Modal";

export type BranchName = string;

export type User = {
  id: number;
  name: string;
  role: string;
  username: string;
  avatar: string;
  branch: BranchName;
  services: string[];
  bannerUrl?: string;
  rating?: number;
  reviewCount?: number;
};

type UserModalProps = {
  open: boolean;
  user: User | null;
  branchOptions: BranchName[];
  onClose: () => void;
  onSaveBranch: (userId: number, newBranch: BranchName) => void;
  onCollaborate?: (user: User) => void;
};

function cn(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(" ");
}

// Diakritik və case fərqlərinə dözümlü müqayisə
function canon(s: string | null | undefined) {
  return (s || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("az-Latn");
}

// Vizual etiketlər (ekranda görünən adlar)
const BRANCH_LABELS: Record<string, string> = {
  NARIMANOV: "Nərimanov",
  KHATAI: "Xətai",
  GARAYEV: "Qara Qarayev",
  ELMLAR: "Elmlər",
};

const UI = {
  cardBg: "#141826",
  bannerOverlay:
    "linear-gradient(180deg, rgba(0,0,0,0.00) 40%, rgba(0,0,0,0.55) 100%)",
  tileBg: "#2C2F3A",
  textMuted: "#A9ACBC",
  borderSoft: "rgba(255,255,255,0.10)",
};

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop";

export default function UserModal({
  open,
  user,
  branchOptions,
  onClose,
  onSaveBranch,
  onCollaborate,
}: UserModalProps) {
  const [selectedBranch, setSelectedBranch] = useState<BranchName | null>(null);

  useEffect(() => {
    setSelectedBranch(user?.branch ?? null);
  }, [user]);

  // BRANCHES dəyişəndə də uyğunluğu saxla
  useEffect(() => {
    if (!user) return;
    const match = branchOptions.find((b) => canon(b) === canon(user.branch));
    if (match && match !== selectedBranch) setSelectedBranch(match);
  }, [branchOptions, user]); // selectedBranch-ı bura əlavə etmə

  if (!user) return null;

  const dirty = selectedBranch !== user.branch;

  const rating = user.rating ?? 4.8;
  const reviewCount = user.reviewCount ?? 100_000;
  const banner = user.bannerUrl ?? DEFAULT_BANNER;

  const vitrineItems = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    count: 0,
    title: "Service name",
  }));

  return (
    <Modal open={open} onClose={onClose} widthClass="max-w-[1000px]">
      <div
className="rounded-[16px] max-h-[80vh] bg-[#14151A] flex flex-col overflow-hidden text-[#E2E3E9] shadow-2xl overflow-y-auto"
      >
        {/* Banner */}
        <div className="relative ">
          <div className="relative w-full h-[180px] sm:h-[220px] md:h-[240px]">
            <img
              src={banner}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: UI.bannerOverlay }}
              aria-hidden
            />
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-4">
            {dirty ? (
              <>
                <button
                  onClick={() =>
                    selectedBranch && onSaveBranch(user.id, selectedBranch)
                  }
                  className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90"
                >
                  Save
                </button>
                <button
                  onClick={() => setSelectedBranch(user.branch)}
                  className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10"
                >
                  Back
                </button>
                {/* <button
                  onClick={() => onCollaborate?.(user)}
                  className="px-4 py-2 rounded-lg bg-black text-white border border-white/10 hover:bg-black/80"
                >
                  Collaborate
                </button> */}
              </>
            )}
          </div>

          {/* Identity */}
          <div className="absolute  left-5 sm:left-6 md:left-8 -bottom-20 sm:-bottom-40 flex flex-col  gap-4">
            <div className="flex  items-end gap-5">
              <img
                src={user.avatar}
                alt={`${user.name} avatar`}
                className="w-34 h-34 sm:w-40 sm:h-40 rounded-[37px] border-8 border-[#E2E3E9] object-cover shadow-lg bg-black"
                loading="lazy"
              />
              <div className="text-2xl sm:text-5xl font-semibold leading-tight mb-1">
                {user.name}
              </div>
            </div>
            <div className="pb-1 sm:pb-2">
              <div
                className="flex flex-wrap items-center gap-2 text-[28px]"
                style={{ color: UI.textMuted }}
              >
                <span className="font-semibold text-[#A9ACBC]">
                  @{user.username}
                </span>
                <span className=" text-[#A9ACBC] ">|</span>
                <span className="text-[#595D73]">{user.role}</span>
              </div>
              <div
                className="mt-1 flex items-center gap-1.5 text-sm text-[#595D73]"
                style={{ color: UI.textMuted }}
              >
                <StarIcon />
                <span>{rating.toFixed(1)}</span>
                <span>({reviewCount.toLocaleString()}+ Review)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className=" pt-24 sm:pt-36 md:pt-40 px-5 sm:px-6 md:px-8 pb-6 sm:pb-8">
          {/* Branch pills */}
          <div className="mt-2 flex flex-wrap gap-2">
            {branchOptions.map((b) => {
              const active = canon(selectedBranch) === canon(b);
              const label = BRANCH_LABELS[b] ?? b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBranch(b)}
                  className={cn(
                    "px-[30px] py-3 rounded-[12px] bg-[#2C2F3A] text-xs sm:text-sm font-medium tracking-wide text-[e2e3e9]",
                    active
                      ? "bg-white text-[#14151A] border-white"
                      : "text-white border-white/25 hover:bg-white/10"
                  )}
                >
                  {label.toLocaleUpperCase("az-Latn")}
                </button>
              );
            })}
          </div>

          {/* Vitrine */}
          <div className="mt-6">
            <div className="mb-3 text-sm" style={{ color: UI.textMuted }}>
              Vitrine
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {vitrineItems.map((it) => (
                <li
                  key={it.id}
                  className="rounded-[12px] p-3"
                  style={{
                    backgroundColor: UI.tileBg,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] bg-white/10 flex items-center justify-center">
                      <CarIcon />
                    </div>
                    <div className="px-2 py-1 rounded-[8px] bg-white/20 text-white text-xs font-semibold leading-none">
                      0
                    </div>
                  </div>
                  <div
                    className="mt-2 text-xs sm:text-sm"
                    style={{ color: UI.textMuted }}
                  >
                    Service name
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Available Services */}
          <div className="mt-6">
            <div className="mb-2 text-sm" style={{ color: UI.textMuted }}>
              Available Services
            </div>
            {user.services?.length ? (
              <ul className="flex flex-wrap gap-2">
                {user.services.map((s, i) => (
                  <li
                    key={`${s}-${i}`}
                    className="px-3 py-1.5 rounded-full text-sm border"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderColor: UI.borderSoft,
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm" style={{ color: UI.textMuted }}>
                No services listed.
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* Inline ikonlar */
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l2.472 5.007 5.528.804-4 3.898.944 5.5L12 15.9 7.056 18.21 8 12.71 4 8.811l5.528-.804L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="8"
        width="18"
        height="7"
        rx="2"
        className="fill-white/65"
      />
      <rect
        x="5"
        y="9.5"
        width="6"
        height="3.5"
        rx="1"
        className="fill-[#2C2F3A]"
      />
      <rect
        x="13"
        y="9.5"
        width="6"
        height="3.5"
        rx="1"
        className="fill-[#2C2F3A]"
      />
      <circle cx="8" cy="17" r="2" className="fill-white" />
      <circle cx="16" cy="17" r="2" className="fill-white" />
    </svg>
  );
}
