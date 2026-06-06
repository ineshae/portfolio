import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Hash, Sparkles, Monitor, Layers } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectModalProps {
  project: {
    title: string;
    category: string;
    description: string;
    gradient: string;
    slides?: string[];
    hideConceptLabel?: boolean;
    description2?: string;
    deliverables?: string[];
    cardDescription?: string;
  };
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Default mock images if no custom slides are provided
  const images = project.slides || [
    `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80`,
    `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80`,
    `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80`
  ];

  const isVideo = (src: string) => {
    if (!src) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
    const lowerSrc = src.toLowerCase().split('?')[0];
    const hasVideoExt = videoExtensions.some(ext => lowerSrc.endsWith(ext) || src.toLowerCase().includes(ext + '?') || src.toLowerCase().includes(ext + '#'));
    return hasVideoExt || src.startsWith('data:video/');
  };

  const isYouTube = (src: string) => {
    if (!src) return false;
    return src.includes("youtube.com") || src.includes("youtu.be");
  };

  const getYouTubeEmbedUrl = (src: string) => {
    if (!src) return "";
    let videoId = "";
    if (src.includes("youtu.be/")) {
      videoId = src.split("youtu.be/")[1]?.split(/[?#]/)[0];
    } else if (src.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(src.split("?")[1]);
      videoId = urlParams.get("v") || "";
    } else if (src.includes("youtube.com/embed/")) {
      videoId = src.split("youtube.com/embed/")[1]?.split(/[?#]/)[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : src;
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Listen to Escape key to dismiss the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Framer Motion spring variants for slide transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      }
    })
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-sleek-black/95 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex flex-col md:flex-row w-full max-w-5xl h-[85vh] bg-white/[0.01] border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.85)] z-10"
        >
          {/* Glass-Border Overlay Accent */}
          <div className="absolute inset-0 border border-white/5 rounded-[32px] pointer-events-none" />

          {/* Left / Center Screen - Images Slideshow Area */}
          <div className="relative flex-1 bg-black/50 flex flex-col justify-center overflow-hidden group select-none h-2/3 md:h-full">
            {/* Interactive Image Slide Trigger (click left edge for prev, right for next, or hover indicator) */}
            <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 p-4 md:p-10 flex items-center justify-center"
                >
                  {isYouTube(images[currentIndex]) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(images[currentIndex])}
                      title={`${project.title} Video`}
                      className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/5 aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : isVideo(images[currentIndex]) ? (
                    <video
                      src={images[currentIndex]}
                      controls
                      autoPlay
                      muted
                      playsInline
                      loop
                      className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/5"
                    />
                  ) : (
                    <img
                      src={images[currentIndex]}
                      alt={`${project.title} Slide ${currentIndex + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/5"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Click-to-next active overlays */}
              {images.length > 1 && (
                <>
                  <div 
                    className="absolute inset-y-0 left-0 w-1/4 cursor-w-resize z-25" 
                    onClick={handlePrev}
                  />
                  <div 
                    className="absolute inset-y-0 right-0 w-1/4 cursor-e-resize z-25" 
                    onClick={handleNext}
                  />
                </>
              )}

              {/* Hover Navigation Chevrons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-6 z-30 p-4 rounded-full border border-white/10 bg-black/60 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-6 z-30 p-4 rounded-full border border-white/10 bg-black/60 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Progress Bar indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 bg-black/40 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      idx === currentIndex ? "w-6 bg-sleek-blue" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Float Page Number Counter */}
            {images.length > 1 && (
              <div className="absolute top-6 left-6 z-30 font-mono text-[10px] tracking-widest text-white/50 bg-black/40 px-3.5 py-1.5 rounded-md border border-white/5 backdrop-blur-sm select-none">
                <span className="text-sleek-blue font-semibold">{String(currentIndex + 1).padStart(2, "0")}</span>
                <span className="mx-1 text-white/20">/</span>
                {String(images.length).padStart(2, "0")}
              </div>
            )}
          </div>

          {/* Right Column - Project Metadata Panel */}
          <div className="w-full md:w-[360px] border-t md:border-t-0 md:border-l border-white/10 bg-white/[0.01]/10 px-8 py-10 flex flex-col justify-between overflow-y-auto h-1/3 md:h-full relative select-none">
            {/* Top Close Button (floating for mobile fallback) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all cursor-pointer z-40"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Project Details Content */}
            <div className="pt-4 space-y-8">
              <div>
                <span className="text-[9px] font-mono tracking-[0.4em] text-sleek-blue uppercase font-bold flex items-center gap-1.5">
                  <Hash className="h-3 w-3" />
                  {project.category}
                </span>
                <h2 className="mt-3 text-3xl font-extralight tracking-tight text-white leading-tight break-keep">
                  {project.title}
                </h2>
              </div>

              <div className="space-y-4">
                {!project.hideConceptLabel && (
                  <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase block">Concept & Philosophy</span>
                )}
                <p className="text-sm font-light leading-relaxed text-[#ccc] pr-2 whitespace-pre-line break-keep">
                  {project.description}
                </p>
                {project.description2 !== undefined ? (
                  project.description2 && (
                    <p className="text-sm font-light leading-relaxed text-[#999] pr-2 break-keep">
                      {project.description2}
                    </p>
                  )
                ) : (
                  <p className="text-sm font-light leading-relaxed text-[#999] pr-2">
                    Exploring pristine visuals and layouts with optimized typography. This project highlights a seamless interplay of light, user interaction, and robust modern architectures.
                  </p>
                )}
              </div>

              {/* Dynamic Deliverables Metadata */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase block">Deliverables</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(project.deliverables || ["System Architecture", "Interactive Web Interface", "Holographic UX", "Framer Motion"]).map((skill) => (
                    <span 
                      key={skill}
                      className="text-[10px] bg-white/5 px-2.5 py-1 rounded-md text-white/70 border border-white/5 font-mono flex items-center gap-1"
                    >
                      <Sparkles className="h-2.5 w-2.5 text-sleek-blue" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Guidelines */}
            <div className="pt-8 border-t border-white/5 hidden md:block">
              <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
                <span className="flex items-center gap-1">
                  <Monitor className="h-3 w-3" />
                  Sleek Desk Deck
                </span>
                <span>Press ESC to Back</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
