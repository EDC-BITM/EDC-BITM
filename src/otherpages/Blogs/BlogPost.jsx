import { useParams, Navigate } from "react-router-dom";
import { Suspense, lazy, useMemo } from "react";
import NavBar from "../../components/layout/Navbar";
import Footer from "../../components/footer/Footer";

const BlogPost = () => {
  const { slug } = useParams();
  
  const LazyComponent = useMemo(() => {
    try {
      return lazy(() => import(`./posts/${slug}.mdx`));
    } catch (e) {
      console.error("Failed to load blog post:", e);
      return null;
    }
  }, [slug]);

  if (!LazyComponent) {
    return <Navigate to="/Blogs" replace />;
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-black pt-20 flex flex-col">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh] text-yellow-500">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        }>
          <div className="flex-1">
            <LazyComponent />
          </div>
        </Suspense>
      </div>

      <Footer />
    </>
  );
};

export default BlogPost;
