import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const postFiles = import.meta.glob("./posts/*.mdx", { eager: true });

const posts = Object.entries(postFiles).map(([path, module]) => {
  const slug = path.split("/").pop().replace(".mdx", "");
  return {
    slug,
    title: module.title || slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    date: module.date || "Jan 1, 2024",
    excerpt: module.excerpt || "Click to read more about this topic from EDC BITM.",
    author:  "EDC BITM",
    component: module.default,
    card_title: module.card_title
  };
});

const Blogs = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6">
            Insights & Stories
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            From Mesra to the World: BIT Alumni Who Built at Scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/Blogs/${post.slug}`}
                className="group block h-full p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 text-xs text-yellow-500/80 mb-4 font-medium uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 line-clamp-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 line-clamp-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors line-clamp-2 leading-tight">
                    {post.card_title}
                  </h2>
                  
                  <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-yellow-400 font-semibold group/btn">
                    Read Article
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
