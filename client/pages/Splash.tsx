import { useEffect } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = window.setTimeout(() => navigate("/sign-up"), 1500);
    return () => window.clearTimeout(timeout);
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-paper px-6 py-8 text-ink">
      <div className="absolute left-0 top-0 h-px w-full bg-line" />
      <div className="mx-auto flex w-full max-w-md flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.14em] text-ink/40">
          <span>Merchant console</span>
          <ShieldCheck size={16} className="text-teal" strokeWidth={1.6} />
        </div>

        <div className="-mt-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-[16px] bg-teal text-paper">
            <span className="font-display text-[29px] font-semibold tracking-[-0.06em]">A</span>
          </div>
          <h1 className="mt-5 font-display text-[34px] font-semibold tracking-[-0.055em]">AgentPay</h1>
          <p className="mt-3 text-[13px] text-ink/50">Control for autonomous commerce.</p>
          <div className="mx-auto mt-10 h-px w-40 overflow-hidden bg-line">
            <div className="h-full w-full origin-left animate-ledger bg-teal" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-5 text-[11px] text-ink/42">
          <span>Every transaction stays within your rules.</span>
          <Link to="/sign-up" className="group inline-flex items-center gap-1.5 font-medium text-teal transition hover:text-ink">
            Continue <ArrowRight size={13} strokeWidth={1.7} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
