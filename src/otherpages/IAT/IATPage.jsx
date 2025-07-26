import Background from "./components/background";
import Hero from "./components/Hero";

const IATPage = () => {
  return (
    <div className="relative min-h-screen flex justify-center ">
      <Background className="fixed -z-20 inset-0" />
      <div className="text-white">
        <Hero />
      </div>
    </div>
  );
};

export default IATPage;
