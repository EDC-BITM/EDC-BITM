import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Trophy,
  Rocket,
  Search,
  BookOpen,
  Users,
  ChevronDown,
  Building2,
  Globe,
  X,
  Compass,
  SlidersHorizontal,
} from "lucide-react";
import blobL from "@assets/blobs/blobL.png?w=600&format=webp&quality=95&as=meta";
import blobR from "@assets/blobs/blobR.png?w=600&format=webp&quality=95&as=meta";
import { ERAS, SECTORS, STARTUPS_DATA } from "./startupsData";

// Individual Startup Timeline Card with interactive node linkage and scroll glow
function StartupCard({
  startup,
  index,
  isPassed,
  setNodeRef,
}) {
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative flex flex-col md:flex-row items-start md:items-center ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Year Badge on the Spine with scroll glow and hover pop */}
      <div
        ref={setNodeRef}
        className="absolute left-6 md:left-1/2 top-5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20"
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : isPassed ? 1.05 : 1,
            backgroundColor: isPassed || isHovered ? "#FED853" : "#FFFFFF",
            borderColor: isPassed || isHovered ? "#F59E0B" : "#1F2937",
            color: isPassed || isHovered ? "#000000" : "#111827",
          }}
          transition={{ type: "spring", stiffness: 450, damping: 28 }}
          className={`flex items-center justify-center w-12 h-12 rounded-full font-black text-xs border-2 transition-shadow duration-150 ${
            isPassed || isHovered
              ? "shadow-lg shadow-amber-400/50 ring-4 ring-amber-400/30"
              : "shadow-sm border-gray-800"
          }`}
        >
          {startup.year}
        </motion.div>
      </div>

      {/* Desktop spacer on the opposite side */}
      <div className="hidden md:block md:w-1/2" />

      {/* Venture Card with smooth scroll entrance */}
      <div
        className={`w-full pl-16 md:pl-0 md:w-1/2 ${
          isEven ? "md:pr-10" : "md:pl-10"
        }`}
      >
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -3,
            transition: { type: "spring", stiffness: 500, damping: 28 },
          }}
          className={`p-5 sm:p-6 rounded-2xl border transition-[border-color,box-shadow,background-color] duration-150 ${
            startup.isBreakthrough
              ? isPassed
                ? "bg-gradient-to-b from-amber-100/80 via-white to-white border-amber-400 shadow-2xl shadow-amber-500/15 ring-2 ring-amber-400/20"
                : "bg-gradient-to-b from-amber-50/70 via-white to-white border-amber-300 shadow-xl shadow-amber-500/10 hover:shadow-2xl hover:border-amber-400"
              : isPassed
              ? "bg-white/95 backdrop-blur-xl border-amber-300/80 shadow-xl shadow-amber-500/5 hover:border-amber-400 hover:shadow-2xl"
              : "bg-white/90 backdrop-blur-xl border-gray-200/90 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:border-gray-300"
          }`}
        >
          {/* Breakthrough Milestone Flag */}
          {startup.isBreakthrough && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FED853]/25 border border-amber-300 text-[11px] font-bold text-amber-900 mb-4 shadow-2xs">
              <Trophy className="w-3 h-3 text-amber-700" />
              <span>Featured Landmark Milestone</span>
            </div>
          )}

          {/* Card Header: Logo, Name, and Badges */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-2 sm:p-2.5 border border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:border-gray-300 transition-colors duration-150">
              <img
                src={startup.logo}
                alt={`${startup.company} logo`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight truncate group-hover:text-black transition-colors duration-150">
                  {startup.company}
                </h3>
                <span className="text-xs font-bold text-gray-400 font-mono flex-shrink-0">
                  {startup.year}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                  {startup.sectorDetail}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  {startup.milestone}
                </span>
              </div>
            </div>
          </div>

          {/* Founder & Affiliation Info */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-700 font-medium">
            <Users className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="truncate">{startup.founder}</span>
          </div>

          {/* Impact Description */}
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            {startup.desc}
          </p>

          {/* Footer Action Links */}
          <div className="mt-5 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-700 hover:text-black font-semibold transition-colors duration-150"
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span>Official Website</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>

            {startup.blogSlug && (
              <Link
                to={`/Blogs/${startup.blogSlug}`}
                className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-bold transition-colors duration-150 group/link"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Read Founder Story</span>
                <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-150" />
              </Link>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  );
}

// Era Section with synchronized dot and node glow
function EraTimelineSection({ era, startupsInEra }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const nodeRefs = useRef({});
  const [nodeThresholds, setNodeThresholds] = useState({});
  const [currentProgress, setCurrentProgress] = useState(0);

  // Scroll animation: track progress through this era's timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth out progress updates using spring physics
  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  // Calculate position of the glowing progress bead at the tip of the line
  const beadTop = useTransform(smoothScaleY, (v) => {
    const clamped = Math.min(Math.max(v, 0), 1);
    return `${clamped * 100}%`;
  });

  // Listen directly to the traveling beacon's progress
  useMotionValueEvent(smoothScaleY, "change", (latest) => {
    setCurrentProgress(latest);
  });

  // Measure exact vertical coordinate of each year node relative to the track
  const updateThresholds = () => {
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const trackHeight = trackRect.height;
    if (trackHeight <= 0) return;

    const thresholds = {};
    Object.entries(nodeRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const elRect = el.getBoundingClientRect();
      // The moment the yellow dot's leading edge contacts the top border of the year badge:
      // elRect.top - trackRect.top is the distance from track top to badge top.
      // The bead has radius 8px, so its bottom edge reaches badge top when bead center reaches (badge top - 8px).
      const contactY = Math.max(0, elRect.top - trackRect.top - 8);
      thresholds[id] = contactY / trackHeight;
    });

    setNodeThresholds(thresholds);
  };

  useEffect(() => {
    updateThresholds();
    setCurrentProgress(smoothScaleY.get());

    let resizeObserver = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateThresholds();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateThresholds);
    const timer = setTimeout(updateThresholds, 250);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", updateThresholds);
      clearTimeout(timer);
    };
  }, [startupsInEra, smoothScaleY]);

  return (
    <section id={`era-${era.id}`} className="mb-24 last:mb-12 scroll-mt-36">
      {/* Era Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-14 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 mb-3 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>{era.range}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {era.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
          {era.tagline}
        </p>
      </motion.div>

      {/* Vertical Timeline Spine Container with Scroll Animation */}
      <div ref={containerRef} className="relative">
        {/* Single Responsive Line Track & Traveling Bead Container (left-6 mobile, centered desktop) */}
        <div
          ref={trackRef}
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 pointer-events-none"
        >
          {/* Background Rail (Inactive) */}
          <div className="absolute inset-0 bg-gray-200/80 rounded-full" />

          {/* Active Animated Fill Line */}
          <motion.div
            style={{ scaleY: smoothScaleY }}
            className="absolute inset-0 bg-gradient-to-b from-green-500 via-teal-400 to-[#FED853] rounded-full origin-top z-10 shadow-xs"
          />

          {/* Traveling Progress Bead */}
          <motion.div
            style={{ top: beadTop }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FED853] border-2 border-white shadow-md shadow-amber-400/60 z-20"
          >
            <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-60" />
          </motion.div>
        </div>

        {/* Startup Timeline Nodes */}
        <div className="space-y-12">
          {startupsInEra.map((startup, index) => {
            const threshold = nodeThresholds[startup.id] ?? 999;
            // The year badge glows IF AND ONLY IF the yellow beacon has reached or passed it
            const isPassed = currentProgress >= threshold;

            return (
              <StartupCard
                key={startup.id}
                startup={startup}
                index={index}
                isPassed={isPassed}
                setNodeRef={(el) => {
                  if (el) {
                    nodeRefs.current[startup.id] = el;
                  } else {
                    delete nodeRefs.current[startup.id];
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Startups() {
  const [selectedSector, setSelectedSector] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEra, setActiveEra] = useState("all");

  // Filter startups by sector, search, and active era
  const filteredStartups = useMemo(() => {
    return STARTUPS_DATA.filter((item) => {
      const matchesSector =
        selectedSector === "All" || item.sector === selectedSector;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.company.toLowerCase().includes(query) ||
        item.founder.toLowerCase().includes(query) ||
        item.sector.toLowerCase().includes(query) ||
        item.sectorDetail.toLowerCase().includes(query) ||
        item.milestone.toLowerCase().includes(query) ||
        item.year.includes(query) ||
        item.desc.toLowerCase().includes(query);
      const matchesEra = activeEra === "all" || item.eraId === activeEra;

      return matchesSector && matchesSearch && matchesEra;
    });
  }, [selectedSector, searchQuery, activeEra]);

  const scrollToTimeline = (eraId = "timeline-root") => {
    const el = document.getElementById(eraId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 relative text-gray-800 overflow-x-hidden selection:bg-[#FED853] selection:text-black">
      {/* Decorative Greenish Blobs matching Home & Team pages (darker, saturated tone) */}
      <img
        src={blobL.src}
        alt=""
        aria-hidden="true"
        className="absolute w-[22rem] sm:w-[28rem] lg:w-[34rem] pointer-events-none -z-10 left-0 top-20 opacity-95 select-none mix-blend-multiply"
        style={{ filter: "brightness(0.68) saturate(2) contrast(1.25)" }}
      />
      <img
        src={blobR.src}
        alt=""
        aria-hidden="true"
        className="absolute w-[22rem] sm:w-[28rem] lg:w-[34rem] pointer-events-none -z-10 right-0 top-[45rem] opacity-95 select-none mix-blend-multiply"
        style={{ filter: "brightness(0.68) saturate(2) contrast(1.25)" }}
      />
      <img
        src={blobL.src}
        alt=""
        aria-hidden="true"
        className="absolute w-[22rem] sm:w-[28rem] lg:w-[34rem] pointer-events-none -z-10 left-0 top-[90rem] opacity-95 select-none mix-blend-multiply"
        style={{ filter: "brightness(0.68) saturate(2) contrast(1.25)" }}
      />
      <img
        src={blobR.src}
        alt=""
        aria-hidden="true"
        className="absolute w-[22rem] sm:w-[28rem] lg:w-[34rem] pointer-events-none -z-10 right-0 top-[140rem] opacity-95 select-none mix-blend-multiply"
        style={{ filter: "brightness(0.68) saturate(2) contrast(1.25)" }}
      />
      <img
        src={blobL.src}
        alt=""
        aria-hidden="true"
        className="absolute w-[22rem] sm:w-[28rem] lg:w-[34rem] pointer-events-none -z-10 left-0 top-[190rem] opacity-95 select-none mix-blend-multiply"
        style={{ filter: "brightness(0.68) saturate(2) contrast(1.25)" }}
      />
      <img
        src={blobR.src}
        alt=""
        aria-hidden="true"
        className="absolute w-[22rem] sm:w-[28rem] lg:w-[34rem] pointer-events-none -z-10 right-0 top-[240rem] opacity-95 select-none mix-blend-multiply"
        style={{ filter: "brightness(0.68) saturate(2) contrast(1.25)" }}
      />

      {/* Hero Header */}
      <header className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center z-10">
        {/* EDC Identity Badge with Yellow Box Accent */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-10 w-3 bg-[#FED853] rounded-sm shadow-sm" />
          <span className="text-sm sm:text-base font-bold text-gray-900 tracking-wide uppercase">
            Entrepreneurship Development Cell • BIT Mesra
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.15]">
          Over Six Decades of Enterprise Born at BIT Mesra
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From pioneering India&apos;s first private hydro stations in 1958 to
          scaling global consumer unicorns and frontier autonomous AI agents.
          Trace the living timeline of student and alumni founders who turned
          campus ideas into world-changing ventures.
        </p>

        {/* Verified Proof Metrics Bar in Light Theme */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-5 rounded-2xl bg-white/80 border border-gray-200/90 backdrop-blur-md text-center shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#D49E00]">
              50+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
              Ventures Founded
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/80 border border-gray-200/90 backdrop-blur-md text-center shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">
              2+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
              Tech Unicorns ($1B+)
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/80 border border-gray-200/90 backdrop-blur-md text-center shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
              $300M+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
              Landmark Exits
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/80 border border-gray-200/90 backdrop-blur-md text-center shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              66 Years
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
              Legacy (1958 – Present)
            </div>
          </div>
        </div>

        {/* Scroll CTA Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => scrollToTimeline("timeline-root")}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-[#FED853] hover:text-black transition-all duration-200 shadow-xl shadow-gray-900/10 cursor-pointer"
          >
            <span>Explore the Timeline</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Floating Interactive Controls Deck */}
      <nav
        id="timeline-root"
        aria-label="Timeline navigation and filters"
        className="sticky top-16 sm:top-20 z-30 px-3 sm:px-6 pointer-events-none mb-8"
      >
        <div className="max-w-5xl mx-auto pointer-events-auto bg-white/95 backdrop-blur-2xl rounded-2xl border border-gray-200/90 shadow-xl shadow-gray-200/50 p-3 sm:p-4 transition-all">
          {/* Top Controls Row: Era Scrubber + Search */}
          <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3 items-stretch md:items-center justify-between">
            {/* Segmented Era Scrubber (Horizontal scroll without any visible scrollbar) */}
            <div className="bg-gray-100/90 p-1 rounded-xl flex items-center gap-1 border border-gray-200/60 overflow-x-auto no-scrollbar touch-pan-x">
              <button
                onClick={() => setActiveEra("all")}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  activeEra === "all"
                    ? "bg-white text-gray-950 shadow-xs border border-gray-200/80"
                    : "text-gray-600 hover:text-gray-950 hover:bg-gray-200/50"
                }`}
              >
                {activeEra === "all" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FED853]" />
                )}
                <span>All Eras</span>
                <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">1958–Now</span>
              </button>
              {ERAS.map((era) => (
                <button
                  key={era.id}
                  onClick={() => {
                    setActiveEra(era.id);
                    scrollToTimeline(`era-${era.id}`);
                  }}
                  className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    activeEra === era.id
                      ? "bg-white text-gray-950 shadow-xs border border-gray-200/80"
                      : "text-gray-600 hover:text-gray-950 hover:bg-gray-200/50"
                  }`}
                >
                  {activeEra === era.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FED853]" />
                  )}
                  <span>{era.range}</span>
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-auto md:min-w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search 23 startups, founders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-gray-50/90 hover:bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Sector Chips Row with full width scroll on mobile */}
          <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-gray-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-pan-x w-full sm:flex-1 py-0.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 uppercase tracking-wider mr-1 flex-shrink-0">
                <SlidersHorizontal className="w-3 h-3 text-gray-500" />
                Sector:
              </span>
              {SECTORS.map((sector) => {
                const count =
                  sector === "All"
                    ? STARTUPS_DATA.length
                    : STARTUPS_DATA.filter((s) => s.sector === sector).length;
                const isSelected = selectedSector === sector;

                return (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                      isSelected
                        ? "bg-gray-900 text-white shadow-xs"
                        : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 hover:text-gray-950 border border-gray-200/50"
                    }`}
                  >
                    <span>{sector}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-gray-200/80 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results count & reset (Clean full-width row on mobile, inline on desktop) */}
            {(selectedSector !== "All" || searchQuery || activeEra !== "all") && (
              <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-gray-500 pt-1 sm:pt-0 flex-shrink-0">
                <span>
                  Showing <strong className="text-gray-900">{filteredStartups.length}</strong> of 23
                </span>
                <button
                  onClick={() => {
                    setSelectedSector("All");
                    setSearchQuery("");
                    setActiveEra("all");
                  }}
                  className="text-amber-800 hover:text-amber-950 font-bold hover:underline cursor-pointer ml-1"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Timeline Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {filteredStartups.length === 0 ? (
          /* Empty Search State */
          <div className="py-20 text-center max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-8 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              No matching startups found
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              No startup entries matched &ldquo;{searchQuery}&rdquo; in the selected filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSector("All");
                setActiveEra("all");
              }}
              className="mt-5 px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          /* Grouped by Era with Scroll-Driven Timeline Progression */
          ERAS.map((era) => {
            const startupsInEra = filteredStartups.filter(
              (item) => item.eraId === era.id
            );
            if (startupsInEra.length === 0) return null;

            return (
              <EraTimelineSection
                key={era.id}
                era={era}
                startupsInEra={startupsInEra}
              />
            );
          })
        )}
      </main>

      {/* Dual Conversion Launchpad Section */}
      <section className="border-t border-gray-200/90 bg-white/70 backdrop-blur-md py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              The Next Chapter Starts on Campus
            </h2>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              Whether you are an aspiring student founder building your first prototype
              or an alumnus who launched a venture, connect with EDC BIT Mesra.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Founder Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 border border-amber-200 shadow-xl shadow-amber-500/5 hover:border-amber-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FED853] flex items-center justify-center text-gray-950 mb-5 shadow-sm">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Building the Next BIT Mesra Unicorn?
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Have an early-stage startup idea, research MVP, or pitch deck?
                  Submit it directly to the EDC Incubation &amp; Mentorship pipeline
                  for structured faculty guidance, alumni reviews, and seed access.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to="/Submissions"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#FED853] text-black font-bold text-sm hover:bg-yellow-400 transition-colors shadow-md shadow-amber-400/20"
                >
                  <span>Submit Your Idea / Pitch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Alumni Founder Card */}
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-gray-200/50 hover:border-gray-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white mb-5 shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Are You a BITian Founder?
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Did you launch a venture born out of BIT Mesra that isn&apos;t on
                  this timeline yet? Get featured in the EDC Hall of Fame and
                  connect with the next generation of student builders as a mentor or partner.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="mailto:edc@bitmesra.ac.in?subject=BIT%20Mesra%20Alumni%20Startup%20Submission"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-sm transition-colors shadow-md"
                >
                  <span>Get Featured in the Timeline</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
