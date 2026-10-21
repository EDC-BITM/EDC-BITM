import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";

const BlogLayout = ({ children, title, date, author }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/Blogs")}
          className="flex items-center cursor-pointer gap-2 text-[#D4A017] hover:text-[#B8860B] transition-colors mb-8 group font-semibold text-sm"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <MoveLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Blogs
        </motion.button>

        {/* Blog Header */}
        <motion.header
          className="mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400">By</span>
            <span className="font-semibold text-gray-700">{author}</span>
            <span className="w-1 h-1 bg-[#FED853] rounded-full" />
            <span className="text-gray-400">{date}</span>
          </div>
        </motion.header>

        {/* Blog Content */}
        <motion.article
          className="prose prose-gray max-w-none 
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-strong:text-[#D4A017]
            prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
            prose-li:text-gray-600
            prose-blockquote:border-l-[#FED853] prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-600
            prose-a:text-[#D4A017] prose-a:no-underline hover:prose-a:underline
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
