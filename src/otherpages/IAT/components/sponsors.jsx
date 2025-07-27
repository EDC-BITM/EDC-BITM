import CoinbaseLogo from "../assets/sponsors/coinbase.svg";
import DachiLogo from "../assets/sponsors/dachi.svg";
const Sponsors = () => {
  // Storing sponsor data in an array makes it easy to add or remove sponsors.
  const sponsorList = [
    {
      name: "Coinbase",
      Logo: CoinbaseLogo,
      url: "https://www.coinbase.com",
    },
    {
      name: "Star Union Dai-Ichi",
      Logo: DachiLogo,
      url: "https://www.sudlife.in/",
    },
    // Add more sponsors here
  ];

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-8xl tracking-tight bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(86deg, #2461E2 24.3%, #FDA011 83.39%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Sponsors
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            We are proud to partner with these innovative companies who support
            our mission.
          </p>
        </div>

        {/* Sponsor Logos Grid */}
        <div className="mt-12">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-10 sm:gap-x-12 md:gap-x-16 lg:gap-x-20">
            {/* FIX: Destructure Logo and use a unique key for each item in the list. */}
            {sponsorList.map(({ name, Logo, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name}`}
                className="text-gray-300 "
              >
                <img
                  src={Logo}
                  alt={name}
                  className="h-8 sm:h-9 md:h-10 w-auto"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
