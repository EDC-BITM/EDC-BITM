import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import blobL from "@assets/blobs/blobL.png?w=400&format=webp&quality=90&as=meta";
import blobR from "@assets/blobs/blobR.png?w=400&format=webp&quality=90&as=meta";

// Blog images
import crmnextImg from "./BlogPic/CRMNEXT.jpg";
import cropinImg from "./BlogPic/CROPIN.jpg";
import dbsyncImg from "./BlogPic/DBSYNC.jpg";
import docopdImg from "./BlogPic/DOCOPD.jpg";
import ekoImg from "./BlogPic/EKO.jpg";
import khabriImg from "./BlogPic/KHABRI.jpg";
import lenskartImg from "./BlogPic/LENSKART.png";
import myoperatorImg from "./BlogPic/MYOPERATOR.jpg";
import redblockImg from "./BlogPic/REDBLOCK.jpg";
import whitehatjrImg from "./BlogPic/WHITEHATJR.jpg";

const postFiles = import.meta.glob("./posts/*.mdx", { eager: true });

// Image mapping by slug
const imageMap = {
  CRMNEXT: crmnextImg,
  Cropin: cropinImg,
  DBSync: dbsyncImg,
  DocOpd: docopdImg,
  Eko: ekoImg,
  Khabri: khabriImg,
  Lenscart: lenskartImg,
  MyOperator: myoperatorImg,
  RedBlock: redblockImg,
  WhiteHatJr: whitehatjrImg,
};

// Category mapping
const categoryMap = {
  CRMNEXT: "Banking",
  Cropin: "AgriTech",
  DBSync: "Enterprise",
  DocOpd: "HealthTech",
  Eko: "FinTech",
  Khabri: "Media",
  Lenscart: "Retail",
  MyOperator: "SaaS",
  RedBlock: "Security",
  WhiteHatJr: "EdTech",
};

const posts = Object.entries(postFiles).map(([path, module]) => {
  const slug = path.split("/").pop().replace(".mdx", "");
  const fm = module.frontmatter || {};
  return {
    slug,
    title:
      fm.title ||
      module.title ||
      slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    date: fm.date || module.date || "Jan 1, 2024",
    excerpt:
      fm.excerpt ||
      module.description ||
      module.excerpt ||
      "Click to read more about this topic from EDC BITM.",
    author: fm.author || module.author || "EDC BITM",
    component: module.default,
    card_title: fm.card_title || fm.title || module.card_title,
    image: imageMap[slug],
    category: categoryMap[slug] || "Startup",
  };
});

const Blogs = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-x-clip">
      {/* ─── Amoeba Blobs ─── */}
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[13rem] z-0 left-0 top-[22rem] opacity-80 pointer-events-none max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[13rem] z-0 right-0 top-[48rem] opacity-80 pointer-events-none max-[649px]:w-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[14rem] z-0 left-0 top-[76rem] opacity-80 pointer-events-none max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-0 right-0 top-[104rem] opacity-80 pointer-events-none max-[649px]:w-0"
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ─── Section Heading (Yellow Square Pattern) ─── */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-row justify-start items-center mb-2">
              <div className="h-[50px] w-[50px] bg-[#FED853] rounded-md shadow-sm" />
              <h1 className="text-3xl sm:text-4xl ml-[-35px] font-bold text-gray-800">
                Insights & Stories
              </h1>
            </div>
            <p className="text-gray-500 text-lg max-w-xl mt-1">
              From Mesra to the World — BIT Alumni Who Built at Scale.
            </p>
          </motion.div>

          {/* ─── Blog Cards Grid ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  to={`/Blogs/${post.slug}`}
                  className="group block h-full bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Card Image */}
                  <div className="p-4 pb-0">
                    <div className="rounded-xl overflow-hidden aspect-[16/10]">
                      <img
                        src={post.image}
                        alt={post.card_title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 pt-4 flex flex-col">
                    {/* Category */}
                    <span className="text-sm font-semibold text-[#6941C6] mb-3">
                      {post.category}
                    </span>

                    {/* Title + Arrow */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h2 className="text-2xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {post.card_title}
                      </h2>
                      <ArrowUpRight
                        size={24}
                        className="text-gray-900 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>

                    {/* Excerpt */}
                    <p className="text-base text-gray-500 leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Footer: Author + Date */}
                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-900 pt-3">
                        <span className="text-gray-400 font-normal">By</span>{" "}
                        <span className="font-semibold">{post.author}</span>
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">{post.date}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
