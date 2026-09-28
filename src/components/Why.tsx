const whyItems = [
  {
    num: "01",
    title: "A straight price before you book",
    desc: "See the labour price upfront. If parts are needed, we'll confirm those within a day, your slot's booked either way.",
  },
  {
    num: "02",
    title: "Vetted, not just listed",
    desc: "Every mechanic is DBS-checked, qualification-verified, and insured before they take a single booking.",
  },
  {
    num: "03",
    title: "Pay only when it's done",
    desc: "No card details needed to book, we only take payment once the work's complete.",
  },
];

export default function Why() {
  return (
    <section className="relative bg-white py-24 md:py-16" id="about">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-14 md:gap-20 items-start">
          {/* Left: pull-quote statement */}
          <div className="reveal md:sticky md:top-28">
            <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
              Why Garage Gaffer
            </span>
            <h2 className="font-[family-name:var(--font-open-sans)] text-[32px] md:text-[30px] font-extrabold tracking-[-0.4px] leading-[1.25] text-[#0D7A5F] max-w-[420px]">
              A fair price before you book. A mechanic you can actually trust.
            </h2>
            <p className="text-[#595C5B] text-[16px] leading-[1.7] mt-6 max-w-[420px]">
              Garage Gaffer matches you with vetted local mechanics and shows you the labour fee upfront, before you book.
            </p>
          </div>

          {/* Right: numbered proof points */}
          <div className="reveal flex flex-col">
            {whyItems.map((item, i) => (
              <div
                key={item.num}
                className={`flex gap-6 py-8 ${i > 0 ? "border-t border-[#DADCDB]" : ""}`}
              >
                <span className="font-[family-name:var(--font-open-sans)] text-[44px] font-extrabold leading-none text-[#0D7A5F] opacity-[0.18] flex-shrink-0 w-[52px] select-none">
                  {item.num}
                </span>
                <div className="pt-1.5">
                  <strong className="font-[family-name:var(--font-open-sans)] block text-[18px] font-bold mb-1.5">
                    {item.title}
                  </strong>
                  <span className="text-[14.5px] text-[#595C5B] leading-[1.65]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
