import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";

const BlogLayout = ({ children, title, date, author }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pt-5 pb-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/Blogs")}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-8 group"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </motion.button>

        {/* Blog Header */}
        <motion.header
          className="mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>{date}</span>
            <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
            <span>By {"EDC BITM"}</span>
          </div>
        </motion.header>

        {/* Blog Content */}
        <motion.article
          className="prose prose-invert prose-yellow max-w-none 
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-strong:text-yellow-400
            prose-code:text-yellow-300 prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
            prose-li:text-gray-300
            prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.article>
      </div>
    </div>
  );
};

export default BlogLayout;
