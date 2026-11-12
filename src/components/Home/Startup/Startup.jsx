import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FadeUpAnimation from "@animations/FadeUp.jsx";
import CldImage from "@/components/Images/CldImage";
import cldImageData from "@/data/CldImage.json";
import { STARTUPS_DATA } from "@/otherpages/Startupspage/startupsData";

const startupOrder = [
  "lenskart",
  "whitehatjr",
  "myoperator",
  "cropin",
  "eko",
  "indibni",
];

const featuredStartups = startupOrder.map((id) => {
  const startup = STARTUPS_DATA.find((item) => item.id === id);
  const homeData = cldImageData.Home.startups.find((item) => item.id === id);

  if (startup) return homeData ? { ...startup, ...homeData } : startup;
  return homeData;
}).filter(Boolean);

export default function Startup() {
  return (
    <FadeUpAnimation>
      <section className="my-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="glass-morphic rounded-2xl p-5 sm:p-8 lg:p-12 shadow-2xl">
          <div className="flex items-center">
            <div className="h-[50px] w-[50px] bg-[#FED853]" />
            <h2 className="text-[25px] ml-[-25px] font-bold">Our Startups</h2>
          </div>

          <div className="mt-6 mb-8">
            <p className="text-2xl font-bold lg:text-[35px]">Founders from BIT Mesra</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Meet alumni-led ventures building across technology, finance, telecom, consumer products, and artificial intelligence.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredStartups.map((startup) => (
              <article
                key={startup.id}
                className="group flex min-h-52 flex-col rounded-2xl border border-black/10 bg-white/80 p-5 shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
                    {startup.logoPublicId ? (
                      <CldImage
                        src={startup.logoPublicId}
                        alt={`${startup.company} logo`}
                        width={120}
                        height={120}
                        loading="lazy"
                        className="h-full w-full"
                      />
                    ) : (
                      <img
                        src={startup.logo}
                        alt={`${startup.company} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold">{startup.company}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#A77800]">
                      Founded by {startup.founder}
                    </p>
                  </div>
                </div>

                {startup.founderImagePublicId && (
                  <CldImage
                    src={startup.founderImagePublicId}
                    alt={`${startup.founder} founder image`}
                    width={600}
                    height={360}
                    loading="lazy"
                    className="mt-4 h-44 overflow-hidden rounded-xl bg-gray-100"
                  />
                )}

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">{startup.description || startup.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/Startups"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#FED853] px-5 py-3 font-bold transition-transform hover:scale-[1.03]"
            >
              View all startups
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </FadeUpAnimation>
  );
}
