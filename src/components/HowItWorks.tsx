import Image from "next/image";

const steps = [
  {
    img: "/how-it-works-select-vehicle.png",
    title: "Select your job",
    desc: "Enter your reg or car details, plus your postcode. We'll give you an instant labour price for the job.",
  },
  {
    img: "/how-it-works-pick-date.png",
    title: "Pick a date and time",
    desc: "Choose a slot that suits you. No card details needed to book.",
  },
  {
    img: "/how-it-works-drop-car.png",
    title: "Drop your car",
    desc: "Bring your car to our partner garage at your chosen time. We'll take it from there and keep you posted.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-16" id="how">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-[640px] mb-12 reveal">
          <span className="inline-block font-[family-name:var(--font-rubik)] text-[11px] font-bold tracking-[0.1em] uppercase text-[#0D7A5F] mb-3">
            How it works
          </span>
          <h2 className="font-[family-name:var(--font-open-sans)] text-[34px] font-extrabold leading-[1.15] tracking-[-0.5px] mb-3">
            From select to sorted, in three simple steps.
          </h2>
          <p className="text-[#595C5B] text-[16px] leading-[1.7]">
            No ringing round, no waiting on quotes. Just enter your details, pick a time, and drop your car off.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <div key={step.title} className="reveal text-center">
              <div className="relative w-full aspect-[3/2] mb-5">
                <Image
                  src={step.img}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-[family-name:var(--font-open-sans)] text-[19px] font-bold mb-2">{step.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-[#595C5B]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
