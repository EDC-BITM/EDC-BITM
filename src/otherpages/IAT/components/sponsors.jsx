import coinbase from "../assets/sponsors/coinbase.svg";
import dachi from "../assets/sponsors/dachi.svg";
const Sponsors = () => {
  const sponsor = [
    {
      name: "coinbase",
      image: coinbase,
    },
    {
      name: "Star Union Dai-Ichi Life Insurance Company Limited",
      image: dachi,
    },
  ];

  return (
    <section className="w-full py-8 sm:py-10 ">
      <h2
        className="text-center text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-normal leading-tight tracking-tight bg-gradient-to-r from-[#2461E2] via-[#2461E2] to-[#FDA011] bg-clip-text text-transparent mb-4"
        style={{
          backgroundImage:
            "linear-gradient(86deg, #2461E2 24.3%, #FDA011 83.39%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Our Sponsors
      </h2>
      <div className="flex bg-black py-3 justify-evenly items-center gap-8 mt-8">
        {sponsor.map((s) => (
          <div key={s.name} className="flex w-38 sm:w-48 flex-col items-center">
            <img
              src={s.image}
              alt={s.name}
              className="h-20 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
