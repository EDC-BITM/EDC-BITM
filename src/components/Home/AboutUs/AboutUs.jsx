import FadeUpAnimation from "@animations/FadeUp.jsx";

function About_us() {
  return (
    <FadeUpAnimation className="flex justify-center recbox1 md:p-[5rem] sm:p-4 p-2">
      <div className="glass-morphism md:w-[80%] w-full md:p-8 p-3">
        <div className="flex flex-row justify-start items-center">
          <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
          <h1 className="text-[25px] ml-[-35px] font-bold">About Us</h1>
        </div>
        <p className="mt-5 text-lg">
          The Entrepreneurship Cell (E-Cell) at BIT MESRA is a student-driven
          initiative dedicated to promoting entrepreneurship among students.
          Through workshops, events, and mentorship programs, it cultivates a
          culture of innovation and supports budding entrepreneurs in turning
          their ideas into reality.
        </p>
      </div>
    </FadeUpAnimation>
  );
}

export default About_us;
