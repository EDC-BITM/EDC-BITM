import Background from "./components/background";
import Footer from "./components/footer";

const IATPage = () => {
  return (
    <div className="relative min-h-screen">
      <Background className="absolute -z-10 inset-0" />

      <div className="flex items-center justify-center min-h-[90vh]">
        <h1 className="text-white text-4xl font-bold">hello</h1>
      </div>

      <Footer />
    </div>
  );
};

export default IATPage;
