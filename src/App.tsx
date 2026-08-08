import { useEffect, useRef } from "react";
import logo from "./assets/waste-ui-logo.png";
import driverLogo from "./assets/driver-ui-logo.png";
import yardLogo from "./assets/yard-ui-logo.png";
import weighbridgeLogo from "./assets/weighbridge-ui-logo.png";
import { ProductScreenStrip } from "./ProductScreens";

const DEMO_MAIL =
  "mailto:support@wasteui.co.uk?subject=WasteUI%20demo%20request";

function useReveal() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

const modules = [
  {
    title: "Customers & orders",
    body: "Manage accounts, sites, and documents. Book skip hire, bin collections, haulage, and aggregates with pricing and permits in one flow.",
  },
  {
    title: "Driver rounds",
    body: "Dispatch work to drivers and vehicles, track priority jobs, and see live GPS from DriverUI on the map.",
  },
  {
    title: "Weighbridge",
    body: "Handle in/out weighing, tickets, and hardware weight reads — then hand off to WeighbridgeUI for signatures and print.",
  },
  {
    title: "Planning & tonnage",
    body: "Plan weekly collections, track weights, and review tonnage activity across orders and the weighbridge.",
  },
  {
    title: "Compliance",
    body: "Keep waste transfer notes, carriers licences, permits, and EWC-grade tracking ready for Defra digital waste tracking requirements.",
  },
  {
    title: "Accounts & portal",
    body: "Run queries, on-stop accounts, invoicing, and purchase ledger — while customers self-serve through the portal.",
  },
];

const apps = [
  {
    name: "DriverUI",
    logo: driverLogo,
    body: "Daily rounds, job status, signatures, photos, and live GPS back to dispatch.",
  },
  {
    name: "WeighbridgeUI",
    logo: weighbridgeLogo,
    body: "Create weighbridge orders, capture inductions and carrier signatures, print tickets.",
  },
  {
    name: "YardUI",
    logo: yardLogo,
    body: "Inspect inbound loads and attach yard photos or issues straight to the order.",
  },
];

export default function App() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} className="min-h-dvh overflow-x-clip">
      <header className="absolute inset-x-0 top-0 z-20 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-5 md:px-8 md:py-5">
          <a href="#top" className="inline-flex min-h-11 items-center gap-2" aria-label="WasteUI home">
            <img src={logo} alt="" className="h-7 w-auto brightness-0 invert sm:h-8 md:h-9" />
          </a>
          <a
            href={DEMO_MAIL}
            className="inline-flex min-h-11 items-center rounded-full bg-white/95 px-3.5 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-white sm:px-4"
          >
            <span className="sm:hidden">Demo</span>
            <span className="hidden sm:inline">Request a demo</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero — brand, headline, support, CTA, full-bleed image */}
        <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src="/hero-yard.jpg"
              alt=""
              className="animate-hero-drift h-full w-full object-cover object-[72%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.28)_0%,rgba(11,18,32,0.22)_40%,rgba(11,18,32,0.72)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(8,145,178,0.22),transparent_55%)]" />
          </div>

          <div className="mx-auto w-full max-w-6xl px-4 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-24 sm:px-5 sm:pb-16 md:px-8 md:pb-20 md:pt-32">
            <p className="animate-rise font-display text-xs font-semibold tracking-[0.2em] text-cyan-bright uppercase sm:text-sm sm:tracking-[0.22em]">
              WasteUI
            </p>
            <h1 className="animate-rise-delay-1 mt-3 max-w-3xl font-display text-[2rem] leading-[1.08] font-bold tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl">
              Waste operations software, built around the yard.
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:mt-5 md:text-lg">
              Self-hosted platform for UK waste operators — office, weighbridge,
              yard, and drivers working from the same system.
            </p>
            <div className="animate-rise-delay-3 mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={DEMO_MAIL}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(8,145,178,0.35)] transition hover:bg-[#0e7490] sm:w-auto"
              >
                Request a demo
              </a>
              <a
                href="#inside"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/16 sm:w-auto"
              >
                See the platform
              </a>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="relative overflow-hidden bg-fog py-14 sm:py-20 md:py-28">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-steel/10 blur-3xl" />
          <div className="reveal mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-cyan uppercase">
              Built for operators
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
              One system for skip hire, collections, haulage, and the tip.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft/80 sm:mt-5 sm:text-lg">
              WasteUI connects the office desk to the weighbridge cabin, yard
              inspections, and drivers on the road — so orders, weights,
              compliance, and customer access stay in sync.
            </p>
          </div>
        </section>

        {/* Inside the system — screenshot / UI strip */}
        <section
          id="inside"
          className="relative overflow-hidden bg-ink py-14 text-white sm:py-20 md:py-28"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(8,145,178,0.2),transparent_50%)]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
            <div className="reveal max-w-2xl">
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-cyan-bright uppercase">
                Inside WasteUI
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                See how the system looks day to day.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
                From dispatch and the weighbridge to planning and compliance —
                one platform your office and yard teams actually work in.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 md:mt-14">
              <ProductScreenStrip />
            </div>
          </div>
        </section>

        {/* Platform modules — editorial rows, not cards */}
        <section
          id="platform"
          className="border-y border-slate-line/60 bg-white py-14 sm:py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
            <div className="reveal max-w-2xl">
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-cyan uppercase">
                The platform
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                Everything your team runs day to day.
              </h2>
            </div>

            <div className="mt-10 divide-y divide-slate-line/70 sm:mt-14">
              {modules.map((item, index) => (
                <div
                  key={item.title}
                  className="reveal grid gap-2 py-6 sm:gap-3 sm:py-8 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:gap-10"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <h3 className="font-display text-lg font-semibold text-ink sm:text-xl md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink-soft/75 md:text-lg">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Companion apps */}
        <section className="relative overflow-hidden bg-ink py-14 text-white sm:py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(8,145,178,0.22),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(30,58,138,0.35)_100%)]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
            <div className="reveal max-w-2xl">
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-cyan-bright uppercase">
                Companion apps
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Driver, weighbridge, and yard — connected live.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
                Mobile and cabin apps keep the same jobs moving from booking to
                tip, without re-keying or chasing paperwork.
              </p>
            </div>

            <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-12 md:grid-cols-3 md:gap-8">
              {apps.map((app, index) => (
                <div
                  key={app.name}
                  className="reveal"
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <img
                    src={app.logo}
                    alt=""
                    className="h-12 w-auto brightness-0 invert sm:h-14"
                  />
                  <h3 className="mt-5 font-display text-xl font-semibold sm:mt-6 sm:text-2xl">
                    {app.name}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-white/65 sm:mt-3">
                    {app.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Self-hosted */}
        <section className="bg-[linear-gradient(160deg,#f4f7fb_0%,#e8eef5_45%,#dce9f2_100%)] py-14 sm:py-20 md:py-28">
          <div className="reveal mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-cyan uppercase">
              Your data, your hosting
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
              Self-hosted for operators who want control.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft/80 sm:mt-5 sm:text-lg">
              Run WasteUI on your own infrastructure. Keep customer records,
              weighbridge tickets, and compliance documents under your control —
              with MFA, secure sessions, and UK-oriented workflows for EWC codes,
              permits, and waste transfer notes.
            </p>
            <ul className="mt-8 grid gap-3 text-base text-ink-soft sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {[
                "Self-hosted deployment",
                "MFA for staff & portal users",
                "Customer self-service portal",
                "EWC grades & WTN workflows",
                "Live driver GPS on dispatch",
                "Hardware weighbridge support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DEFRA digital waste tracking */}
        <section
          id="defra"
          className="border-y border-slate-line/60 bg-white py-14 sm:py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
            <div className="reveal max-w-2xl">
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-cyan uppercase">
                DEFRA digital waste tracking
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                Built for the new UK waste tracking rules.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft/80 sm:mt-5 sm:text-lg">
                Mandatory digital waste tracking starts in October 2026 for
                permitted and licensed receiving sites in England and Wales,
                with Scotland and Northern Ireland following in January 2027.
                WasteUI is designed so your day-to-day weighbridge, yard, and
                transfer workflows line up with Defra’s Digital Waste Tracking
                Service — without bolting on a separate compliance tool.
              </p>
            </div>

            <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 md:grid-cols-3 md:gap-8">
              {[
                {
                  title: "Record what the law expects",
                  body: "Capture the waste movement details operators must enter into the digital waste tracking system — from load receipt through classification and site records.",
                },
                {
                  title: "Stay ready for October 2026",
                  body: "Use WasteUI ahead of the mandate so receiving sites, office staff, and weighbridge teams already work from digital records when the regulations take effect.",
                },
                {
                  title: "One operational source of truth",
                  body: "Orders, tickets, and compliance data stay in the same platform you run the yard from — ready to support Defra reporting and API integration as the service rolls out.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="reveal"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <h3 className="font-display text-lg font-semibold text-ink sm:text-xl md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-soft/75 sm:mt-3">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-steel py-14 sm:py-20 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.25),transparent_45%)]" />
          <div className="reveal relative mx-auto max-w-6xl px-4 text-center sm:px-5 md:px-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">
              Ready to run the yard from one place?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">
              Tell us how your operation works today. We’ll show you how WasteUI
              fits office, weighbridge, yard, and drivers.
            </p>
            <a
              href={DEMO_MAIL}
              className="mt-7 inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-steel transition hover:bg-mist sm:mt-8 sm:w-auto"
            >
              Email support@wasteui.co.uk
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-ink py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-white/55">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-5 md:px-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="WasteUI" className="h-7 w-auto brightness-0 invert" />
            <span className="text-sm">
              © {new Date().getFullYear()} WasteUI
            </span>
          </div>
          <p className="text-sm">
            Waste management software for UK operators.
          </p>
        </div>
      </footer>
    </div>
  );
}
