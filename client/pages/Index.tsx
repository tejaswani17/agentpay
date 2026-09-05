import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  LayoutDashboard,
  MoreHorizontal,
  Package,
  Search,
  Settings2,
  ShieldCheck,
  Store,
  WalletCards,
} from "lucide-react";

type ActivityStatus = "completed" | "pending" | "blocked";
type Filter = "All" | "Completed" | "Pending" | "Blocked";

type ActivityItem = {
  id: number;
  product: string;
  detail: string;
  amount: string;
  time: string;
  status: ActivityStatus;
  statusLabel: string;
  action: string;
  rule: string;
  outcome: string;
  search: string;
};

const activities: ActivityItem[] = [
  {
    id: 1,
    product: "2× Cotton Tote",
    detail: "Agent purchased 2× Cotton Tote for ₹840",
    amount: "₹840",
    time: "10:42 AM",
    status: "completed",
    statusLabel: "Completed",
    action: "Searched for reusable everyday bags under ₹1,000.",
    rule: "Default transaction cap · ₹2,000",
    outcome: "Razorpay order created · #ord_N8K4P2",
    search: "cotton tote, reusable bag",
  },
  {
    id: 2,
    product: "Ceramic Pour-over Set",
    detail: "Agent requested Ceramic Pour-over Set",
    amount: "₹2,450",
    time: "09:18 AM",
    status: "pending",
    statusLabel: "Awaiting approval",
    action: "Matched a pour-over coffee set to the buyer’s request.",
    rule: "Default transaction cap · ₹2,000",
    outcome: "Approval required · order not created",
    search: "coffee dripper, ceramic, gift",
  },
  {
    id: 3,
    product: "Linen Apron",
    detail: "Agent tried to purchase Linen Apron",
    amount: "₹1,280",
    time: "Yesterday, 4:06 PM",
    status: "blocked",
    statusLabel: "Blocked · cap exceeded",
    action: "Selected the closest match from the available catalog.",
    rule: "Daily spend limit · ₹5,000 reached",
    outcome: "Razorpay request declined by rule engine",
    search: "linen apron, natural, one size",
  },
  {
    id: 4,
    product: "Notebook — Grid",
    detail: "Agent purchased Notebook — Grid",
    amount: "₹360",
    time: "Yesterday, 12:14 PM",
    status: "completed",
    statusLabel: "Completed",
    action: "Chose a two-pack after comparing price and stock.",
    rule: "Default transaction cap · ₹2,000",
    outcome: "Razorpay payment captured · #pay_7G1QW9",
    search: "grid notebook, recycled paper",
  },
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Agent activity", icon: Activity, count: "3" },
  { label: "Catalog", icon: Package },
  { label: "Spend rules", icon: ShieldCheck },
];

const filters: Filter[] = ["All", "Completed", "Pending", "Blocked"];

function StatusDot({ status }: { status: ActivityStatus }) {
  return (
    <span
      className={`mt-1.5 size-2 shrink-0 rounded-full ${
        status === "completed"
          ? "bg-teal"
          : status === "pending"
            ? "bg-rust"
            : "bg-ink/35"
      }`}
      aria-hidden="true"
    />
  );
}

function StatusChip({ status, label }: { status: ActivityStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[-0.01em] ${
        status === "completed"
          ? "border-teal/20 bg-teal/8 text-teal"
          : status === "pending"
            ? "border-rust/25 bg-rust/8 text-rust"
            : "border-ink/15 bg-ink/5 text-ink/60"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          status === "completed"
            ? "bg-teal"
            : status === "pending"
              ? "bg-rust"
              : "bg-ink/35"
        }`}
      />
      {label}
    </span>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [approvalState, setApprovalState] = useState<"pending" | "approved">("pending");

  const visibleActivities = useMemo(() => {
    if (activeFilter === "All") return activities;
    const status = activeFilter.toLowerCase() as ActivityStatus;
    return activities.filter((activity) => activity.status === status);
  }, [activeFilter]);

  const selectNav = (label: string) => {
    setActiveNav(label);
    if (label === "Agent activity") {
      document.getElementById("activity-feed")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] flex-col border-r border-line bg-paper px-5 py-6 lg:flex">
        <div className="flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-[10px] bg-teal text-paper">
            <span className="font-display text-[17px] font-semibold">A</span>
          </div>
          <div>
            <div className="font-display text-[15px] font-semibold tracking-[-0.03em]">AgentPay</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink/40">Merchant console</div>
          </div>
        </div>

        <div className="mt-14 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/35">Workspace</div>
        <nav className="mt-3 space-y-1" aria-label="Primary navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => selectNav(item.label)}
                className={`flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-left text-[13px] transition-colors ${
                  isActive ? "bg-teal/10 font-medium text-teal" : "text-ink/55 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                <Icon size={17} strokeWidth={1.6} />
                <span className="flex-1">{item.label}</span>
                {item.count && <span className="text-[11px] text-rust">{item.count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-5">
          <div className="rounded-[12px] border border-line bg-white/45 p-4">
            <div className="flex items-center gap-2 text-teal">
              <ShieldCheck size={15} strokeWidth={1.7} />
              <span className="text-[11px] font-medium">Agent-ready store</span>
            </div>
            <p className="mt-2 text-[11px] leading-[1.55] text-ink/48">Your catalog and safety rules are live.</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/8">
              <div className="h-full w-full rounded-full bg-teal" />
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-line px-2 pt-4">
            <div className="flex size-8 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-paper">AK</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium">Arjun Kapoor</p>
              <p className="truncate text-[11px] text-ink/45">Kapoor Home Goods</p>
            </div>
            <Settings2 size={15} className="text-ink/40" strokeWidth={1.6} />
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-[248px]">
        <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-5 sm:px-8 lg:px-12 lg:pb-12 lg:pt-8">
          <header className="flex items-center justify-between border-b border-line pb-5">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex size-8 items-center justify-center rounded-[9px] bg-teal text-paper">
                <span className="font-display text-sm font-semibold">A</span>
              </div>
              <span className="font-display text-[15px] font-semibold tracking-[-0.03em]">AgentPay</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-[11px] uppercase tracking-[0.14em] text-ink/40">Friday, 14 June 2024</p>
              <p className="mt-1 text-[13px] text-ink/60">Kapoor Home Goods <span className="mx-1 text-ink/25">/</span> Overview</p>
            </div>
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
              <div className="hidden items-center gap-2 rounded-full border border-teal/20 bg-teal/7 px-3 py-1.5 text-[11px] font-medium text-teal sm:flex">
                <span className="size-1.5 rounded-full bg-teal" /> Live sync
              </div>
              <button type="button" className="relative flex size-9 items-center justify-center rounded-full border border-line text-ink/60 transition hover:border-ink/25 hover:text-ink" aria-label="Notifications">
                <Bell size={17} strokeWidth={1.6} />
                <span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-rust" />
              </button>
              <button type="button" className="hidden size-9 items-center justify-center rounded-full border border-line text-ink/60 transition hover:border-ink/25 hover:text-ink sm:flex" aria-label="Help">
                <CircleHelp size={17} strokeWidth={1.6} />
              </button>
            </div>
          </header>

          <section className="pt-8 lg:pt-10">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-teal">
                  <span className="size-1.5 rounded-full bg-teal" /> Secure workspace
                </div>
                <h1 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.045em] sm:text-[32px]">Good morning, Arjun</h1>
                <p className="mt-2 text-[13px] text-ink/50">Here’s what your AI agent has been doing today.</p>
              </div>
              <button type="button" className="group inline-flex w-fit items-center gap-2 text-[12px] font-medium text-ink/55 transition hover:text-teal">
                <FileText size={15} strokeWidth={1.6} /> View payout report <ArrowUpRight size={13} strokeWidth={1.8} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
              <div className="relative min-h-[260px] overflow-hidden rounded-[16px] bg-ink p-6 text-paper sm:p-8">
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.13em] text-paper/50">Today’s agent revenue</p>
                      <p className="mt-3 font-display text-[40px] font-semibold tracking-[-0.06em] sm:text-[48px]">₹18,640</p>
                    </div>
                    <div className="flex size-9 items-center justify-center rounded-full border border-paper/15 text-paper/70">
                      <WalletCards size={17} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="mt-10 flex items-end justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#82c4a8]"><ArrowUpRight size={14} /> 18.4% <span className="font-normal text-paper/45">vs yesterday</span></div>
                      <p className="mt-1 text-[11px] text-paper/38">Across 12 completed transactions</p>
                    </div>
                    <div className="hidden h-[72px] w-[46%] items-end gap-1 sm:flex" aria-label="Revenue trend">
                      {[35, 44, 31, 51, 42, 59, 48, 68, 58, 76, 65, 88].map((height, index) => (
                        <span key={index} className="flex-1 rounded-t-[2px] bg-teal/70" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-24 -right-16 size-64 rounded-full border border-paper/6" />
                <div className="absolute -bottom-16 -right-8 size-40 rounded-full border border-paper/6" />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 xl:grid-cols-1 xl:gap-0 xl:divide-y xl:divide-line">
                <MetricTile icon={Activity} label="Agent transactions" value="12" sub="today" />
                <MetricTile icon={ShieldCheck} label="Spend cap remaining" value="₹3,920" sub="of ₹5,000 daily" />
                <MetricTile icon={Clock3} label="Pending approvals" value="1" sub="needs your review" alert />
              </div>
            </div>
          </section>

          <section className="mt-10 grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.8fr)]">
            <div id="activity-feed" className="scroll-mt-6 rounded-[16px] border border-line bg-white/35">
              <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-[18px] font-semibold tracking-[-0.035em]">Recent agent activity</h2>
                    <span className="rounded-full bg-ink/6 px-2 py-0.5 text-[10px] font-medium text-ink/45">Audit trail</span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink/45">Every action is recorded and explained.</p>
                </div>
                <div className="flex items-center gap-1 rounded-[9px] border border-line bg-paper p-1">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-medium transition ${activeFilter === filter ? "bg-ink text-paper" : "text-ink/45 hover:text-ink"}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-5 sm:px-6">
                <div className="flex items-center gap-2 border-b border-line py-3 text-[10px] font-medium uppercase tracking-[0.13em] text-ink/35"><span className="h-px flex-1 bg-line" /> Today <span className="h-px flex-1 bg-line" /></div>
                {visibleActivities.map((activity, index) => (
                  <ActivityRow
                    key={activity.id}
                    activity={activity}
                    expanded={expandedId === activity.id}
                    onToggle={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                    showDateDivider={index === 2 && activeFilter === "All"}
                  />
                ))}
                {visibleActivities.length === 0 && <div className="py-12 text-center text-[13px] text-ink/45">No activity matches this filter.</div>}
              </div>
              <div className="border-t border-line px-5 py-4 sm:px-6">
                <button type="button" onClick={() => setActiveFilter("All")} className="group flex items-center gap-2 text-[12px] font-medium text-teal transition hover:text-ink">
                  View full activity history <ChevronRight size={14} strokeWidth={1.8} className="transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[16px] border border-rust/25 bg-rust/5 p-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-rust">
                    <div className="flex size-8 items-center justify-center rounded-full border border-rust/20 bg-paper"><Clock3 size={15} strokeWidth={1.7} /></div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.12em]">Needs your approval</span>
                  </div>
                  <button type="button" aria-label="More approval options" className="text-rust/55 hover:text-rust"><MoreHorizontal size={17} /></button>
                </div>
                {approvalState === "pending" ? (
                  <>
                    <h3 className="mt-5 font-display text-[19px] font-semibold tracking-[-0.04em]">Ceramic Pour-over Set</h3>
                    <p className="mt-1 text-[12px] text-ink/52">Requested by <span className="font-medium text-ink/75">Atlas</span> · new customer</p>
                    <div className="mt-5 flex items-end justify-between border-y border-rust/15 py-4">
                      <div><p className="text-[11px] text-ink/45">Requested amount</p><p className="mt-1 font-display text-[25px] font-semibold tracking-[-0.05em]">₹2,450</p></div>
                      <div className="text-right"><p className="text-[11px] text-ink/45">Your cap</p><p className="mt-1 text-[13px] font-medium text-rust">₹2,000</p></div>
                    </div>
                    <p className="mt-4 text-[12px] leading-[1.6] text-ink/58">This request is above the per-transaction cap. Review it once before money moves.</p>
                    <div className="mt-5 grid gap-2">
                      <button type="button" onClick={() => setApprovalState("approved")} className="flex h-10 items-center justify-center rounded-[8px] border border-ink/20 bg-paper text-[12px] font-medium transition hover:border-ink/45">Approve this once</button>
                      <button type="button" onClick={() => setApprovalState("approved")} className="flex h-10 items-center justify-center rounded-[8px] bg-teal text-[12px] font-medium text-paper transition hover:bg-teal/90">Approve &amp; raise limit to ₹3,000</button>
                    </div>
                    <button type="button" onClick={() => setApprovalState("approved")} className="mt-4 flex w-full justify-center text-[11px] font-medium text-ink/45 underline decoration-ink/20 underline-offset-4 hover:text-rust">Decline request</button>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-teal text-paper"><Check size={19} strokeWidth={2} /></div>
                    <h3 className="mt-4 font-display text-[18px] font-semibold tracking-[-0.035em]">Approval recorded</h3>
                    <p className="mx-auto mt-2 max-w-[230px] text-[12px] leading-[1.55] text-ink/52">The request is cleared and the agent can continue.</p>
                    <button type="button" onClick={() => setApprovalState("pending")} className="mt-5 text-[11px] font-medium text-teal hover:text-ink">Undo approval</button>
                  </div>
                )}
              </div>

              <div className="rounded-[16px] border border-line bg-white/35 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-teal" strokeWidth={1.6} /><h3 className="text-[13px] font-medium">Daily spend rule</h3></div>
                  <button type="button" className="text-[11px] font-medium text-teal hover:text-ink">Edit</button>
                </div>
                <div className="mt-5 flex items-end justify-between"><span className="font-display text-[24px] font-semibold tracking-[-0.05em]">₹1,080</span><span className="pb-1 text-[11px] text-ink/45">of ₹5,000 used</span></div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/8"><div className="h-full w-[22%] rounded-full bg-teal" /></div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-ink/45"><span>22% used</span><span>Resets in 14h 22m</span></div>
              </div>
            </div>
          </section>

          <div className="mt-8 flex items-center gap-2 border-t border-line pt-5 text-[11px] text-ink/35"><ShieldCheck size={14} strokeWidth={1.6} className="text-teal/75" /> Every rupee an AI agent moves is explainable, bounded, and reversible.</div>
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-3 py-2 backdrop-blur lg:hidden" aria-label="Mobile navigation">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {[
            { label: "Home", icon: LayoutDashboard, target: "Overview" },
            { label: "Activity", icon: Activity, target: "Agent activity" },
            { label: "Catalog", icon: Package, target: "Catalog" },
            { label: "Profile", icon: Store, target: "Spend rules" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.target;
            return <button key={item.label} type="button" onClick={() => selectNav(item.target)} className={`flex min-w-[64px] flex-col items-center gap-1 py-1 text-[10px] font-medium transition ${isActive ? "text-teal" : "text-ink/40"}`}><Icon size={18} strokeWidth={1.6} /><span>{item.label}</span></button>;
          })}
        </div>
      </nav>
    </div>
  );
}

function MetricTile({ icon: Icon, label, value, sub, alert = false }: { icon: typeof Activity; label: string; value: string; sub: string; alert?: boolean }) {
  return <div className="rounded-[14px] border border-line bg-white/35 p-4 sm:p-5 xl:rounded-none xl:border-0 xl:bg-transparent xl:px-0 xl:py-5 first:pt-0 last:pb-0">
    <div className="flex items-center gap-2 text-[11px] text-ink/45"><Icon size={14} strokeWidth={1.6} className={alert ? "text-rust" : "text-teal"} /><span className="hidden sm:inline xl:inline">{label}</span><span className="sm:hidden">{label.split(" ")[0]}</span></div>
    <div className={`mt-3 font-display text-[23px] font-semibold tracking-[-0.05em] sm:text-[27px] ${alert ? "text-rust" : "text-ink"}`}>{value}</div>
    <p className="mt-1 text-[10px] text-ink/40 sm:text-[11px]">{sub}</p>
  </div>;
}

function ActivityRow({ activity, expanded, onToggle, showDateDivider }: { activity: ActivityItem; expanded: boolean; onToggle: () => void; showDateDivider: boolean }) {
  return <>
    {showDateDivider && <div className="flex items-center gap-2 border-b border-line py-3 text-[10px] font-medium uppercase tracking-[0.13em] text-ink/35"><span className="h-px flex-1 bg-line" /> Yesterday <span className="h-px flex-1 bg-line" /></div>}
    <div className="border-b border-line last:border-0">
      <button type="button" onClick={onToggle} className="flex w-full items-start gap-3 py-4 text-left sm:items-center">
        <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${activity.status === "pending" ? "bg-rust/10 text-rust" : "bg-teal/10 text-teal"}`}><Bot size={16} strokeWidth={1.6} /></div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1"><StatusDot status={activity.status} /><p className="text-[12px] font-medium text-ink/85 sm:text-[13px]">{activity.detail}</p></div>
          <p className="mt-1 pl-3.5 text-[11px] text-ink/40">{activity.time} <span className="mx-1 text-ink/20">·</span> Atlas agent</p>
        </div>
        <div className="ml-auto flex shrink-0 flex-col items-end gap-2 pl-2"><span className="font-display text-[13px] font-semibold tracking-[-0.025em] sm:text-[14px]">{activity.amount}</span><StatusChip status={activity.status} label={activity.statusLabel} /></div>
        <ChevronDown size={15} strokeWidth={1.6} className={`mt-1 shrink-0 text-ink/35 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && <div className="mb-4 ml-11 rounded-[10px] border border-line bg-ink/[0.025] px-4 py-4 sm:ml-11"><div className="space-y-3 border-l border-teal/25 pl-4 text-[11px] text-ink/55"><div><p className="font-medium text-ink/75">Agent searched for</p><p className="mt-0.5 font-mono text-[10px] text-ink/45">“{activity.search}”</p></div><div><p className="font-medium text-ink/75">Why this action</p><p className="mt-0.5 leading-[1.5]">{activity.action}</p></div><div><p className="font-medium text-ink/75">Rule checked</p><p className="mt-0.5">{activity.rule}</p></div><div><p className="font-medium text-ink/75">API outcome</p><p className="mt-0.5 font-mono text-[10px] text-ink/45">{activity.outcome}</p></div></div></div>}
    </div>
  </>;
}
