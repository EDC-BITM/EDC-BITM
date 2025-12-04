import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Loader2, AlertCircle, Bell, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { usePublishedNotice } from "@/hooks/useNotices";
import blobL from "@assets/blobs/blobL.png?w=200&format=webp&quality=50&as=meta";
import blobR from "@assets/blobs/blobR.png?w=200&format=webp&quality=50&as=meta";
import FadeUpAnimation from "@/components/Animations/FadeUp.jsx";

const AnnouncementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: publishedArticle,
    isLoading,
    error,
    refetch,
  } = usePublishedNotice();

  // Refetch announcement when component mounts or location changes
  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  // Load Twitter widget script
  useEffect(() => {
    // Load Twitter widget script if not already loaded
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    } else {
      // If script already loaded, reload widgets
      window.twttr.widgets.load();
    }
  }, [publishedArticle]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderContent = (content) => {
    if (!content) return null;

    try {
      const contentObj =
        typeof content === "string" ? JSON.parse(content) : content;

      const renderNode = (node, index = 0) => {
        if (!node) return null;

        // Handle text nodes
        if (node.text !== undefined) {
          let text = node.text;
          let className = "";

          if (node.format) {
            if (node.format & 1) className += " font-bold";
            if (node.format & 2) className += " italic";
            if (node.format & 8) className += " underline";
            if (node.format & 4) className += " line-through";
          }

          if (node.type === "link") {
            return (
              <a
                key={index}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                {text}
              </a>
            );
          }

          return (
            <span key={index} className={className}>
              {text}
            </span>
          );
        }

        // Handle element nodes
        const children = node.children?.map((child, idx) =>
          renderNode(child, idx)
        );

        switch (node.type) {
          case "heading":
            const HeadingTag = `h${node.tag.replace("h", "")}`;
            const headingClasses = {
              h1: "text-4xl md:text-5xl font-bold mb-6 mt-8 text-gray-900",
              h2: "text-3xl md:text-4xl font-bold mb-5 mt-7 text-gray-800",
              h3: "text-2xl md:text-3xl font-bold mb-4 mt-6 text-gray-800",
            };
            return (
              <HeadingTag key={index} className={headingClasses[node.tag]}>
                {children}
              </HeadingTag>
            );

          case "list":
            const ListTag = node.listType === "number" ? "ol" : "ul";
            const listClass =
              node.listType === "number"
                ? "list-decimal list-inside mb-4 space-y-2 ml-6"
                : "list-disc list-inside mb-4 space-y-2 ml-6";
            return (
              <ListTag key={index} className={listClass}>
                {children}
              </ListTag>
            );

          case "listitem":
            return (
              <li key={index} className="text-gray-700 leading-relaxed text-lg">
                {children}
              </li>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-yellow-500 pl-6 py-3 my-6 italic text-gray-700 bg-yellow-50 rounded-r-lg"
              >
                {children}
              </blockquote>
            );

          case "code":
            return (
              <pre
                key={index}
                className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm"
              >
                <code>{children}</code>
              </pre>
            );

          case "image":
            return (
              <div
                key={index}
                className="my-8"
                style={{
                  display: "flex",
                  justifyContent:
                    node.alignment === "left"
                      ? "flex-start"
                      : node.alignment === "right"
                      ? "flex-end"
                      : "center",
                }}
              >
                <img
                  src={node.src}
                  alt={node.altText || ""}
                  style={{
                    width: node.width || "auto",
                    height: node.height || "auto",
                    maxWidth: "100%",
                  }}
                  className="rounded-xl shadow-2xl"
                />
              </div>
            );

          case "youtube":
            const getYouTubeId = (url) => {
              const patterns = [
                /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
                /(?:youtu\.be\/)([^&\s]+)/,
                /(?:youtube\.com\/embed\/)([^&\s]+)/,
                /^([a-zA-Z0-9_-]{11})$/,
              ];
              for (const pattern of patterns) {
                const match = url.match(pattern);
                if (match && match[1]) return match[1];
              }
              return url;
            };

            const videoId = getYouTubeId(node.url || node.videoId || "");

            return (
              <div key={index} className="my-8">
                <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            );

          case "tweet":
            const tweetId = node.tweetId || node.id || "";
            return (
              <div key={index} className="my-8 flex justify-center">
                <blockquote
                  className="twitter-tweet"
                  data-theme="light"
                  data-dnt="true"
                >
                  <a href={`https://twitter.com/x/status/${tweetId}`}>
                    Loading tweet...
                  </a>
                </blockquote>
              </div>
            );

          case "divider":
            return (
              <hr
                key={index}
                className="my-8 border-0 h-px bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded"
              />
            );

          case "paragraph":
          default:
            return (
              <p
                key={index}
                className="mb-4 text-gray-700 leading-relaxed text-lg"
              >
                {children}
              </p>
            );
        }
      };

      return contentObj.root?.children?.map((node, idx) =>
        renderNode(node, idx)
      );
    } catch (error) {
      console.error("Error rendering content:", error);
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">Error displaying content</p>
        </div>
      );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Background blobs */}
        <img
          src={blobL.src}
          alt="Decoration"
          className="absolute w-48 md:w-64 -z-10 left-0 top-20 opacity-20"
        />
        <img
          src={blobR.src}
          alt="Decoration"
          className="absolute w-48 md:w-64 -z-10 right-0 bottom-20 opacity-20"
        />

        <div className="text-center px-4">
          <Loader2 className="w-12 h-12 md:w-16 md:h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700 text-base md:text-lg font-medium">
            Loading announcement...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Background blobs */}
        <img
          src={blobL.src}
          alt="Decoration"
          className="absolute w-48 md:w-64 -z-10 left-0 top-20 opacity-20"
        />
        <img
          src={blobR.src}
          alt="Decoration"
          className="absolute w-48 md:w-64 -z-10 right-0 bottom-20 opacity-20"
        />

        <div className="text-center max-w-md mx-4 px-4">
          <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Failed to load announcement
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-sm md:text-base"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No published article - check for both null and undefined
  if (
    !isLoading &&
    !error &&
    (!publishedArticle || Object.keys(publishedArticle).length === 0)
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Background blobs */}
        <img
          src={blobL.src}
          alt="Decoration"
          className="absolute w-48 md:w-64 -z-10 left-0 top-20 opacity-20"
        />
        <img
          src={blobR.src}
          alt="Decoration"
          className="absolute w-48 md:w-64 -z-10 right-0 bottom-20 opacity-20"
        />

        <FadeUpAnimation>
          <div className="text-center max-w-md mx-4 px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="relative inline-block">
                <Bell className="w-16 h-16 md:w-20 md:h-20 text-gray-400 mx-auto mb-6" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              No Announcements Yet
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8">
              There are currently no published announcements. Check back later
              for important updates and news!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-sm md:text-base transform hover:scale-105"
            >
              Back to Home
            </button>
          </div>
        </FadeUpAnimation>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <img
        src={blobL.src}
        alt="Decoration"
        className="absolute w-48 md:w-64 lg:w-80 -z-10 left-0 top-40 opacity-15"
      />
      <img
        src={blobR.src}
        alt="Decoration"
        className="absolute w-48 md:w-64 lg:w-80 -z-10 right-0 top-[30rem] opacity-15"
      />
      <img
        src={blobL.src}
        alt="Decoration"
        className="absolute w-48 md:w-64 lg:w-80 -z-10 left-0 bottom-40 opacity-15"
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <FadeUpAnimation>
          {/* Header Section */}
          <div className="mb-8 md:mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 border border-blue-300 rounded-full mb-4 md:mb-6"
            >
              <Bell className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <span className="text-blue-600 font-semibold uppercase tracking-wide text-xs md:text-sm">
                Latest Announcement
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2"
            >
              {publishedArticle.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-600 text-sm md:text-base"
            >
              {publishedArticle.created && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(publishedArticle.created)}</span>
                </div>
              )}
              {publishedArticle.updated &&
                publishedArticle.updated !== publishedArticle.created && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs sm:text-sm md:text-base">
                      Updated {formatDateTime(publishedArticle.updated)}
                    </span>
                  </div>
                )}
            </motion.div>
          </div>

          {/* Content Card */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl"
          >
            <div className="prose prose-base md:prose-lg prose-gray max-w-none">
              {renderContent(publishedArticle.content)}
            </div>
          </motion.article>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 md:mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-gray-500 text-xs md:text-sm">
              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Published on {formatDate(publishedArticle.created)}</span>
            </div>
          </motion.div>
        </FadeUpAnimation>
      </div>
    </div>
  );
};

export default AnnouncementPage;
