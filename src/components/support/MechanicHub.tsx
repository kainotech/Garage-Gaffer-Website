import { ArrowRightIcon } from "./SupportIcons";

const quickLinks = [
  "How do I apply to join as a mechanic?",
  "What does the vetting process involve?",
  "How do I set up my profile and availability?",
  "How does payment work for mechanics?",
  "How do I manage a job I&apos;ve accepted?",
  "How do I contact support about my account?",
];

const steps = [
  {
    number: "01",
    label: "Apply online",
    body: "Fill in your details — qualifications, experience, and areas you cover. Takes about 10 minutes.",
  },
  {
    number: "02",
    label: "Vetting check",
    body: "We verify your qualifications and run a DBS check. We&apos;ll be in touch within 3 working days.",
  },
  {
    number: "03",
    label: "Go live",
    body: "Once approved, your profile goes live and you start receiving job alerts in your area.",
  },
];

export default function MechanicHub() {
  return (
    <section className="bg-[#F5F7F6] py-24 md:py-16" id="help-onboarding">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-[1fr_0.8fr] md:grid-cols-1 gap-16 items-start">
          {/* Left Column */}
          <div className="reveal">
            <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
              For mechanics
            </span>
            <h2 className="font-[family-name:var(--font-open-sans)] text-[30px] font-extrabold tracking-[-0.5px] leading-[1.15] text-[#1A1E1D] mb-5">
              Joining, setting up, and getting jobs.
            </h2>
            <p className="font-[family-name:var(--font-rubik)] text-[15px] leading-[1.65] text-[#595C5B] mb-8">
              Everything you need to apply, get verified, and start taking jobs on Garage Gaffer. If you&apos;re already on the platform and need account help, these articles cover that too.
            </p>

            <div className="flex flex-col">
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href="/become-a-mechanic"
                  className="group flex items-center justify-between py-4 border-b border-[#EAECEA] hover:text-[#0D7A5F] transition-all"
                >
                  <span className="font-[family-name:var(--font-rubik)] text-[14px] text-[#0D7A5F]">
                    {link}
                  </span>
                  <ArrowRightIcon className="w-4 h-4 text-[#DADCDB] group-hover:text-[#0D7A5F] group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="reveal">
            <div className="bg-white border border-[#DADCDB] rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <h3 className="font-[family-name:var(--font-open-sans)] text-[16px] font-bold text-[#1A1E1D] mb-8">
                How the application works
              </h3>

              <div className="space-y-8 mb-10">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <span className="font-[family-name:var(--font-rubik)] text-[24px] font-bold text-[#0D7A5F] leading-none">
                      {step.number}
                    </span>
                    <div>
                      <h4 className="font-[family-name:var(--font-open-sans)] text-[14px] font-bold text-[#1A1E1D] mb-1">
                        {step.label}
                      </h4>
                      <p className="font-[family-name:var(--font-rubik)] text-[13.5px] leading-[1.5] text-[#595C5B]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/become-a-mechanic"
                className="btn btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 bg-[#0D7A5F] text-white font-[family-name:var(--font-rubik)] font-semibold text-[15px] shadow-[0_2px_8px_rgba(13,122,95,0.25)] hover:bg-[#055240] transition-all"
              >
                Apply to join
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
