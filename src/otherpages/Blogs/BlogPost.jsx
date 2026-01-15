import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../../components/layout/Navbar";
import Footer from "../../components/footer/Footer";
import BlogLayout from "./BlogLayout";

const BlogPost = () => {
  const { slug } = useParams();
  const [postModule, setPostModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Dynamic import to load the MDX module
    import(`./posts/${slug}.mdx`)
      .then((module) => {
        setPostModule(module);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blog post:", err);
        setError(err);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-black pt-20 flex flex-col">
          <div className="flex items-center justify-center min-h-[60vh] text-yellow-500">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !postModule) {
    return <Navigate to="/Blogs" replace />;
  }

  const { default: Component, frontmatter } = postModule;
  // Fallback to named exports for backward compatibility or if frontmatter is missing
  const meta = frontmatter || {};
  const title = meta.title || postModule.title;
  const date = meta.date || postModule.date;
  const author = meta.author || postModule.author || "EDC BITM";

  return (
    <>
      <NavBar />
      <BlogLayout title={title} date={date} author={author}>
        <Component />
      </BlogLayout>
      <Footer />
    </>
  );
};

export default BlogPost;
