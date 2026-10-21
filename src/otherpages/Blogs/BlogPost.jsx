import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../../components/layout/Navbar";
import Footer from "../../components/footer/Footer";
import BlogLayout from "./BlogLayout";
import blobL from "@assets/blobs/blobL.png?w=400&format=webp&quality=90&as=meta";
import blobR from "@assets/blobs/blobR.png?w=400&format=webp&quality=90&as=meta";

const slugMap = {
  "Aadarsh": "MyOperator",
  "AaryanChoudhary": "WhiteHatJr",
  "AdityaMishra": "CRMNEXT",
  "AyeshaAkhtar": "DocOpd",
  "NityanandSingh": "Lenscart",
  "PriyanshuSinha": "DBSync",
  "SattwikJana": "Cropin",
  "ShrijaPandey": "Eko",
  "ShubhGhatak": "Khabri",
  "alok": "RedBlock"
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postModule, setPostModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    if (slugMap[slug]) {
      navigate(`/Blogs/${slugMap[slug]}`, { replace: true });
      return;
    }

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
        <div className="min-h-screen bg-white pt-20 flex flex-col relative overflow-x-clip">
          <img
            src={blobL.src}
            alt=""
            className="absolute w-[13rem] z-0 left-0 top-[20rem] opacity-80 pointer-events-none max-[649px]:w-0"
          />
          <img
            src={blobR.src}
            alt=""
            className="absolute w-[13rem] z-0 right-0 top-[30rem] opacity-80 pointer-events-none max-[649px]:w-0"
          />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FED853]" />
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
    <div className="relative overflow-x-clip bg-white">
      {/* Amoeba Blobs */}
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[13rem] z-0 left-0 top-[20rem] opacity-80 pointer-events-none max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-0 right-0 top-[45rem] opacity-80 pointer-events-none max-[649px]:w-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[14rem] z-0 left-0 top-[75rem] opacity-80 pointer-events-none max-[649px]:w-0"
      />

      <NavBar />
      <BlogLayout title={title} date={date} author={author}>
        <Component />
      </BlogLayout>
      <Footer />
    </div>
  );
};

export default BlogPost;
