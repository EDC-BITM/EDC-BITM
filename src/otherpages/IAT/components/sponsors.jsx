import CoinbaseLogo from "../assets/sponsors/coinbase.svg";
import DachiLogo from "../assets/sponsors/dachi.svg";
import DJ_Logo from "../assets/sponsors/DJ-Logo-Eng.png"
import adpro_Logo from "../assets/sponsors/adpro.jpeg"
// import NewSponsor1Logo from "../assets/sponsors/newsponsor1.svg";
// import NewSponsor2Logo from "../assets/sponsors/newsponsor2.svg";

const Sponsors = () => {
  const sponsorList = [
    {
      name: "Coinbase",
      title: "Prime Sponsor",
      Logo: CoinbaseLogo,
      url: "https://www.coinbase.com",
    },
    {
      name: "Star Union Dai-Ichi",
      title: "Title Sponsor",
      Logo: DachiLogo,
      url: "https://www.sudlife.in/",
    },
    {
      name: "Dainik Jagran",
      title: "Media Partner",
      Logo: DJ_Logo,
      url: "https://www.jagran.com/",
    },
    {
      name: "Adpro",
      title: "Events and Advertising Partner",
      Logo: adpro_Logo,
      url: "#",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-8xl tracking-tight bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #6366F1 0%, #8B5CF6 25%, #EC4899 55%, #F59E0B 80%, #FDE68A 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Sponsors
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            We are proud to partner with these innovative companies who support
            our mission.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-10 sm:gap-x-12 md:gap-x-16 lg:gap-x-20">
            {sponsorList.map(({ name, title, Logo, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name}`}
                className="text-gray-300 flex flex-col items-center group"
              >
                <img
                  src={Logo}
                  alt={name}
                  className="h-8 sm:h-9 md:h-10 w-auto mb-2 transition-transform group-hover:scale-105"
                />
                <div className="text-center">
                  <p className="text-xs text-gray-400 mt-1">{title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
