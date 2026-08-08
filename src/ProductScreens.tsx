import { useState, type ReactNode } from "react";

/** Stylised UI previews of WasteUI. Drop real JPEGs into /public/screenshots to replace them. */

type Shot = {
  id: string;
  title: string;
  caption: string;
  /** Optional real screenshot under /public/screenshots/ — when present, used instead of the CSS preview */
  image?: string;
  preview: "dispatch" | "customers" | "weighbridge" | "planning" | "compliance";
};

export const productShots: Shot[] = [
  {
    id: "dispatch",
    title: "Driver rounds",
    caption: "Dispatch jobs and track live GPS on the route map.",
    image: "/screenshots/dispatch.jpg",
    preview: "dispatch",
  },
  {
    id: "customers",
    title: "Customers & orders",
    caption: "Accounts, sites, and bookings in one office view.",
    image: "/screenshots/customers.jpg",
    preview: "customers",
  },
  {
    id: "weighbridge",
    title: "Weighbridge",
    caption: "In/out weighing, tickets, and live weight reads.",
    image: "/screenshots/weighbridge.jpg",
    preview: "weighbridge",
  },
  {
    id: "planning",
    title: "Planning",
    caption: "Weekly collections and tonnage across the yard.",
    image: "/screenshots/planning.jpg",
    preview: "planning",
  },
  {
    id: "compliance",
    title: "Compliance",
    caption: "WTNs, permits, carriers, and EWC-grade records.",
    image: "/screenshots/compliance.jpg",
    preview: "compliance",
  },
];

function Shell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full overflow-hidden rounded-md bg-[#f3f4f6] text-left shadow-inner">
      <aside className="flex w-9 shrink-0 flex-col items-center gap-2 bg-[#0f172a] py-2.5">
        <span className="mb-1 h-3.5 w-3.5 rounded-sm bg-cyan/80" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-sm ${i === 1 ? "bg-white/80" : "bg-white/25"}`}
          />
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-7 items-center gap-3 border-b border-slate-200 bg-white px-2.5">
          <span className="font-display text-[9px] font-semibold tracking-wide text-slate-700">
            WasteUI
          </span>
          <span className="text-[8px] text-slate-400">Dashboard</span>
          <span className="text-[8px] font-medium text-cyan">{title}</span>
        </div>
        <div className="h-5 bg-gradient-to-r from-[#0f172a] to-[#1e3a8a]" />
        <div className="min-h-0 flex-1 overflow-hidden p-2">{children}</div>
      </div>
    </div>
  );
}

function DispatchPreview() {
  return (
    <Shell title="Driver rounds">
      <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-1.5">
        <div className="space-y-1">
          {["Round A — North", "Round B — City", "Priority — Tip"].map(
            (label, i) => (
              <div
                key={label}
                className="rounded border border-slate-200 bg-white px-1.5 py-1 shadow-sm"
              >
                <div className="text-[8px] font-semibold text-slate-700">
                  {label}
                </div>
                <div className="mt-1 flex gap-0.5">
                  {[0, 1, 2].map((j) => (
                    <span
                      key={j}
                      className={`h-3 flex-1 rounded-sm ${
                        i === j ? "bg-cyan/40" : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
        <div className="relative overflow-hidden rounded border border-slate-200 bg-[#dbe7f3]">
          <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(#94a3b844_1px,transparent_1px),linear-gradient(90deg,#94a3b844_1px,transparent_1px)] [background-size:12px_12px]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 120 90">
            <path
              d="M10 70 C30 40, 50 55, 70 30 S100 20, 110 35"
              fill="none"
              stroke="#0891b2"
              strokeWidth="2.5"
            />
            <circle cx="70" cy="30" r="3.5" fill="#0f172a" />
            <circle cx="40" cy="48" r="3" fill="#1e3a8a" />
            <circle cx="95" cy="28" r="3" fill="#0891b2" />
          </svg>
        </div>
      </div>
    </Shell>
  );
}

function CustomersPreview() {
  return (
    <Shell title="Customers">
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex gap-1">
          <div className="h-4 flex-1 rounded border border-slate-200 bg-white" />
          <div className="h-4 w-10 rounded bg-cyan/80" />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden rounded border border-slate-200 bg-white">
          {["Ashford Skips Ltd", "Riverside Aggregates", "Metro Bin Hire", "County Haulage"].map(
            (name, i) => (
              <div
                key={name}
                className={`flex items-center justify-between px-1.5 py-1 text-[8px] ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <span className="font-medium text-slate-700">{name}</span>
                <span className="text-slate-400">{i % 2 === 0 ? "Active" : "On stop"}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </Shell>
  );
}

function WeighbridgePreview() {
  return (
    <Shell title="Weighbridge">
      <div className="grid h-full grid-cols-2 gap-1.5">
        <div className="space-y-1 rounded border border-slate-200 bg-white p-1.5">
          <div className="text-[8px] font-semibold text-slate-600">In weighing</div>
          {["Vehicle", "Customer", "EWC"].map((label) => (
            <div key={label} className="space-y-0.5">
              <div className="text-[7px] text-slate-400">{label}</div>
              <div className="h-3 rounded bg-slate-100" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center rounded border border-slate-200 bg-[#0f172a] text-white">
          <div className="text-[7px] tracking-widest text-cyan-bright/80 uppercase">
            Live weight
          </div>
          <div className="font-display text-2xl font-bold tracking-tight text-cyan-bright">
            12,480
          </div>
          <div className="text-[8px] text-white/50">kg</div>
        </div>
      </div>
    </Shell>
  );
}

function PlanningPreview() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <Shell title="Planning">
      <div className="grid h-full grid-cols-5 gap-1">
        {days.map((day, i) => (
          <div
            key={day}
            className="flex flex-col gap-0.5 rounded border border-slate-200 bg-white p-1"
          >
            <div className="text-center text-[7px] font-semibold text-slate-500">
              {day}
            </div>
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className={`h-3 rounded-sm ${
                  (i + row) % 3 === 0
                    ? "bg-cyan/35"
                    : (i + row) % 3 === 1
                      ? "bg-steel/25"
                      : "bg-slate-100"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function CompliancePreview() {
  return (
    <Shell title="Compliance">
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex gap-1">
          {["WTNs", "Permits", "Carriers"].map((tab, i) => (
            <span
              key={tab}
              className={`rounded px-1.5 py-0.5 text-[7px] font-semibold ${
                i === 0
                  ? "bg-cyan/15 text-cyan"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="min-h-0 flex-1 space-y-1">
          {[
            ["WTN-10482", "Complete"],
            ["WTN-10481", "Pending"],
            ["WTN-10480", "Complete"],
          ].map(([id, status]) => (
            <div
              key={id}
              className="flex items-center justify-between rounded border border-slate-200 bg-white px-1.5 py-1"
            >
              <span className="text-[8px] font-medium text-slate-700">{id}</span>
              <span
                className={`text-[7px] font-semibold ${
                  status === "Complete" ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

const previews = {
  dispatch: DispatchPreview,
  customers: CustomersPreview,
  weighbridge: WeighbridgePreview,
  planning: PlanningPreview,
  compliance: CompliancePreview,
};

function ShotFrame({ shot }: { shot: Shot }) {
  const Preview = previews[shot.preview];
  const [showImage, setShowImage] = useState(Boolean(shot.image));

  return (
    <figure className="w-[min(85vw,20rem)] shrink-0 snap-center sm:w-[min(78vw,22rem)] sm:snap-start md:w-[24rem]">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1220] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="ml-2 truncate text-[10px] text-white/40">
            app.wasteui — {shot.title}
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-fog p-1.5 sm:p-2">
          {showImage && shot.image ? (
            <img
              src={shot.image}
              alt={`WasteUI ${shot.title} screen`}
              className="absolute inset-0 h-full w-full object-cover object-top"
              onError={() => setShowImage(false)}
            />
          ) : (
            <Preview />
          )}
        </div>
      </div>
      <figcaption className="mt-3 px-1 sm:mt-4">
        <p className="font-display text-base font-semibold text-white sm:text-lg">
          {shot.title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white/60">
          {shot.caption}
        </p>
      </figcaption>
    </figure>
  );
}

export function ProductScreenStrip() {
  return (
    <div className="reveal">
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-5 sm:gap-6 sm:px-5 md:mx-0 md:gap-8 md:px-0 [&::-webkit-scrollbar]:hidden">
        {productShots.map((shot) => (
          <ShotFrame key={shot.id} shot={shot} />
        ))}
      </div>
      <p className="mt-1 text-sm text-white/40 md:hidden">Swipe to browse →</p>
    </div>
  );
}
