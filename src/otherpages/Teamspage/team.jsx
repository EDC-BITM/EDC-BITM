import Collage from "./Collage";
import Timeline from "./Timeline";
import blobL from "@assets/blobs/blobL.png?w=200&format=webp&quality=50&as=meta";
import blobR from "@assets/blobs/blobR.png?w=200&format=webp&quality=50&as=meta";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import teamData from "./teamData.json";
import PropTypes from "prop-types";
import CldImage from "@/components/Images/CldImage";

// Reusable MemberCard component
const MemberCard = ({ member }) => {
  if (!member) {
    return null;
  }
  return (
    <div className="group relative flex flex-col items-center py-4 m-2 w-56 md:w-60 h-auto bg-white/70 backdrop-blur-sm shadow-2xl rounded-3xl transform transition-all duration-300 hover:scale-105 border border-gray-200/50">
      <CldImage
        src={member.publicId}
        alt={member.name}
        width={200}
        height={200}
        loading="lazy"
        className="w-40 h-40 md:w-48 md:h-48 overflow-hidden object-cover rounded-full border-2 border-white shadow-md mb-4 scale-95 group-hover:scale-100 transition-transform duration-300"
      />
      <p className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-300 text-center">
        {member.name}
      </p>
      <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300 text-center mb-3">
        {member.title}
      </p>
      <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {member.socials?.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#0077B5] transition-colors duration-200 text-2xl"
          >
            <FaLinkedin />
          </a>
        )}
        {member.socials?.instagram && (
          <a
            href={member.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#E4405F] transition-colors duration-200 text-2xl"
          >
            <FaInstagram />
          </a>
        )}
        {member.socials?.facebook && (
          <a
            href={member.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#1877F2] transition-colors duration-200 text-2xl"
          >
            <FaFacebook />
          </a>
        )}
        {member.socials?.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="text-gray-700 hover:text-[#FED853] transition-colors duration-200 text-2xl"
          >
            <IoIosMail />
          </a>
        )}
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    title: PropTypes.string,
    publicId: PropTypes.string,
    socials: PropTypes.shape({
      linkedin: PropTypes.string,
      instagram: PropTypes.string,
      facebook: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

// Helper function to render a row of members
const renderMemberRow = (members, keyPrefix) => (
  <div className="flex flex-wrap justify-center items-stretch gap-4 py-4">
    {members.map((member) => (
      <MemberCard key={`${keyPrefix}-${member.id}`} member={member} />
    ))}
  </div>
);

function Teamspage() {
  const { facultyMembers, leadershipBody, executiveBody } = teamData;

  return (
    <>
      <Collage />
      <div className="flex flex-row justify-start items-center mt-10 ml-4 sm:ml-10">
        <div className="h-[50px] w-[10px] sm:w-[50px] bg-[#FED853]"></div>
        <h1 className="text-xl sm:text-2xl ml-[-5px] sm:ml-[-35px] font-bold text-gray-800">
          Our Team
        </h1>
      </div>

      {/* Faculty Members */}
      <section className="mt-8 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Faculty Members
        </h2>
        {renderMemberRow(facultyMembers, "faculty")}
      </section>

      {/* Leadership Body */}
      <section className="my-12 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Leadership Body
        </h2>
        {/* President and Joint Presidents */}
        {renderMemberRow(leadershipBody.presidency, "presidency")}

        {/* Vice Presidents */}
        {renderMemberRow(
          leadershipBody.vicePresidents.slice(0, 4),
          "vice-presidents"
        )}
        {renderMemberRow(
          leadershipBody.vicePresidents.slice(4, 8),
          "vice-presidents-line2"
        )}

        {/* Directors */}
        {renderMemberRow(leadershipBody.directors.slice(0, 2), "dir-line1")}
        {renderMemberRow(leadershipBody.directors.slice(2, 5), "dir-line2")}
      </section>

      {/* Executive Body */}
      <section className="px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">
          Executive Body
        </h2>
        {/* Two General Secretaries and one Treasurer */}
        {renderMemberRow(executiveBody.genSecTreasurer, "gensec-treas")}

        {/* Two Joint Secretaries and two Joint Treasurers */}
        {renderMemberRow(executiveBody.jointSecTreasurers, "jointsec-treas")}

        {/* Four Associate Directors */}
        {renderMemberRow(executiveBody.associateDirectors, "assoc-dir")}

        {/* Two Events Heads and two Design Heads */}
        {renderMemberRow(executiveBody.eventsDesignHeads, "event-design")}

        {/* Three Technical Heads */}
        {renderMemberRow(executiveBody.techHeads, "tech-heads")}

        {/* Two Social Media Heads and two Public Relations Heads */}
        {renderMemberRow(executiveBody.socialMediaPrHeads, "social-pr")}

        {/* Two Content Heads and two Logistics & Resources Heads */}
        {renderMemberRow(
          executiveBody.contentLogisticsResourceHeads,
          "content-logistics"
        )}

        {/* Senior Executive Members */}
        {renderMemberRow(
          executiveBody.seniorExecutiveMembers.slice(0, 2),
          "sem-line1"
        )}
        {executiveBody.seniorExecutiveMembers.length > 2 &&
          renderMemberRow(
            executiveBody.seniorExecutiveMembers.slice(2, 5),
            "sem-line2"
          )}
      </section>

      <Timeline />

      {/* Blobs */}
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[13rem] z-[-10] left-0 top-[53rem] opacity-80
          max-[649px]:w-0 max-[649px]:h-auto max-[649px]:z-[-30] max-[649px]:left-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[13rem] z-[-10] right-0 top-[78rem] opacity-80
          max-[649px]:w-0 max-[649px]:h-auto max-[649px]:z-[-30] max-[649px]:left-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[14rem] z-[-10] left-0 top-[120rem] opacity-80
          max-[649px]:w-0 max-[649px]:h-auto max-[649px]:top-[10rem] max-[649px]:z-[-30] max-[649px]:left-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-[-10] right-0 top-[180rem] opacity-80
          max-[649px]:w-0 max-[649px]:top-[7rem] max-[649px]:z-[-30] max-[649px]:right-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[12rem] z-[-10] left-0 top-[230rem] opacity-80
          max-[649px]:w-0 max-[649px]:h-auto max-[649px]:mt-[30rem] max-[649px]:z-[-30]"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-[-10] right-0 top-[300rem] opacity-80
          max-[649px]:w-0 max-[649px]:h-auto max-[649px]:mt-[30rem] max-[649px]:z-[-30]"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[12rem] z-[-10] left-0 top-[350rem] opacity-80
          max-[649px]:w-0 max-[649px]:h-auto max-[649px]:mt-[30rem] max-[649px]:z-[-30]"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-[-10] right-0 top-[400rem] opacity-80
          max-[649px]:w-0 max-[649px]:h-auto max-[649px]:mt-[30rem] max-[649px]:z-[-30]"
      />
    </>
  );
}

export default Teamspage;
