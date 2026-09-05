import { type FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type AuthPageProps = {
  mode: "sign-in" | "sign-up";
};

const benefits = [
  "Set limits for every agent purchase",
  "Review every decision in a clear audit trail",
  "Stay in control of your Razorpay payments",
];

export default function Auth({ mode }: AuthPageProps) {
  const isSignUp = mode === "sign-up";
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const handlePhoneSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phone.replace(/\D/g, "").length >= 10) setStep("otp");
  };

  const handleOtpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.length === 6) navigate("/");
  };

  return (
    <main className="min-h-screen bg-paper text-ink lg:grid lg:grid-cols-[minmax(400px,0.9fr)_minmax(460px,1.1fr)]">
      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-[clamp(3rem,8vw,9rem)] lg:py-10">
        <Link to="/splash" className="flex w-fit items-center gap-2" aria-label="Back to AgentPay splash">
          <div className="flex size-9 items-center justify-center rounded-[10px] bg-teal text-paper">
            <span className="font-display text-[17px] font-semibold">A</span>
          </div>
          <span className="font-display text-[15px] font-semibold tracking-[-0.03em]">AgentPay</span>
        </Link>

        <div className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center py-12">
          {step === "phone" ? (
            <>
              <div className="mb-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-teal">Merchant access</p>
                <h1 className="mt-3 font-display text-[30px] font-semibold tracking-[-0.05em]">{isSignUp ? "Start with your phone number" : "Welcome back"}</h1>
                <p className="mt-3 max-w-[330px] text-[13px] leading-[1.6] text-ink/52">{isSignUp ? "Create your merchant workspace in a few quiet, secure steps." : "Sign in to your agent-ready storefront and stay in control."}</p>
              </div>

              <form onSubmit={handlePhoneSubmit}>
                <label htmlFor="phone" className="text-[12px] font-medium text-ink/70">Mobile number</label>
                <div className="mt-2 flex h-[52px] overflow-hidden rounded-[9px] border border-ink/20 bg-white/45 transition focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/10">
                  <div className="flex items-center border-r border-line px-3 text-[13px] font-medium text-ink/65">+91</div>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/[^0-9 ]/g, ""))}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    className="min-w-0 flex-1 bg-transparent px-4 text-[16px] tracking-[0.04em] outline-none placeholder:text-ink/25"
                  />
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] leading-[1.45] text-ink/42"><ShieldCheck size={13} className="shrink-0 text-teal" strokeWidth={1.6} /> We never move money without your explicit limits.</p>
                <button type="submit" className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-teal text-[13px] font-medium text-paper transition hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-50" disabled={phone.replace(/\D/g, "").length < 10}>
                  Continue <ArrowRight size={16} strokeWidth={1.7} />
                </button>
              </form>

              <p className="mt-7 text-center text-[12px] text-ink/50">
                {isSignUp ? "Already have an account?" : "New to AgentPay?"}{" "}
                <Link to={isSignUp ? "/sign-in" : "/sign-up"} className="font-medium text-teal transition hover:text-ink">{isSignUp ? "Sign in" : "Create account"}</Link>
              </p>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setStep("phone")} className="mb-8 flex w-fit items-center gap-1.5 text-[12px] font-medium text-ink/48 transition hover:text-teal"><ArrowLeft size={15} strokeWidth={1.7} /> Change number</button>
              <div className="mb-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-teal">Verification</p>
                <h1 className="mt-3 font-display text-[30px] font-semibold tracking-[-0.05em]">Enter your code</h1>
                <p className="mt-3 text-[13px] leading-[1.6] text-ink/52">We sent a six-digit code to <span className="font-medium text-ink/72">+91 {phone}</span>.</p>
              </div>
              <form onSubmit={handleOtpSubmit}>
                <label htmlFor="code" className="text-[12px] font-medium text-ink/70">One-time password</label>
                <input
                  id="code"
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="— — — — — —"
                  className="mt-2 h-14 w-full rounded-[9px] border border-ink/20 bg-white/45 px-4 text-center font-mono text-[20px] tracking-[0.32em] outline-none transition placeholder:tracking-[0.2em] placeholder:text-ink/28 focus:border-teal focus:ring-2 focus:ring-teal/10"
                  autoFocus
                />
                <button type="submit" className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-teal text-[13px] font-medium text-paper transition hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-50" disabled={code.length !== 6}>
                  Verify and continue <ArrowRight size={16} strokeWidth={1.7} />
                </button>
              </form>
              <p className="mt-6 text-center text-[12px] text-ink/50">Didn’t receive it? <button type="button" className="font-medium text-teal transition hover:text-ink">Resend code</button></p>
            </>
          )}
        </div>

        <p className="text-[10px] text-ink/35">By continuing, you agree to AgentPay’s merchant terms.</p>
      </section>

      <aside className="relative hidden overflow-hidden bg-ink p-[clamp(3rem,8vw,9rem)] text-paper lg:flex lg:flex-col lg:justify-between">
        <div className="absolute right-0 top-0 size-[420px] translate-x-1/3 -translate-y-1/3 rounded-full border border-paper/8" />
        <div className="absolute bottom-0 left-0 size-[380px] -translate-x-1/2 translate-y-1/2 rounded-full border border-paper/8" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-teal/85"><span className="size-1.5 rounded-full bg-teal" /> Built for merchants</div>
          <h2 className="mt-7 max-w-[410px] font-display text-[38px] font-semibold leading-[1.08] tracking-[-0.055em]">Give agents a way to buy. Keep every decision yours.</h2>
          <p className="mt-6 max-w-[385px] text-[14px] leading-[1.7] text-paper/58">AgentPay makes autonomous commerce easy to inspect, limit, and reverse — without slowing your business down.</p>
        </div>

        <div className="relative z-10 border-t border-paper/15 pt-7">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-paper/40">Your control layer</p>
          <ul className="mt-5 space-y-4">
            {benefits.map((benefit) => <li key={benefit} className="flex items-start gap-3 text-[13px] text-paper/78"><span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-teal"><Check size={10} strokeWidth={2.5} /></span>{benefit}</li>)}
          </ul>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium text-paper/55 transition hover:text-paper">View merchant console <ChevronRight size={14} strokeWidth={1.7} /></Link>
        </div>
      </aside>
    </main>
  );
}
