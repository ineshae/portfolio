import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";

export function HeroDisplay() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["30deg", "-30deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-30deg", "30deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-40px", "40px"]);
  const z = useTransform(mouseXSpring, [-0.5, 0.5], [50, 50]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      style={{
        rotateX,
        rotateY,
        translateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex aspect-[16/9] w-full max-w-5xl flex-col items-center justify-center rounded-[40px] border border-white/5 bg-[#050505] p-12 text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden"
    >
      {/* Symmetrical Wings - Replicating the image exactly inside the frame */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-500 group-hover:scale-110">
         {/* Left Wing */}
         <motion.div
          className="absolute left-[-10%] top-[-20%] bottom-[-20%] w-[65%] perspective-1000"
          style={{
            background: "linear-gradient(110deg, #3b82f6 0%, #172554 50%, transparent 100%)",
            clipPath: "polygon(0 0, 100% 35%, 100% 65%, 0 100%)",
            filter: "blur(20px)",
          }}
        />
        {/* Right Wing */}
        <motion.div
          className="absolute right-[-10%] top-[-20%] bottom-[-20%] w-[65%] perspective-1000"
          style={{
            background: "linear-gradient(-110deg, #3b82f6 0%, #172554 50%, transparent 100%)",
            clipPath: "polygon(100% 0, 0 35%, 0 65%, 100% 100%)",
            filter: "blur(20px)",
          }}
        />
        
        {/* Central Kinetic Light Bars (Video 0:01) */}
        <div className="absolute left-1/2 top-[10%] bottom-[10%] flex gap-1 -translate-x-1/2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scaleY: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-[1px] bg-white h-full blur-[1px]"
            />
          ))}
        </div>

        {/* White highlights like in the image */}
        <div className="absolute inset-0 opacity-40 contrast-200 mix-blend-screen bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,transparent_60%)] blur-[40px]" />
      </div>

      <div className="display-content relative z-10" style={{ transform: "translateZ(80px)" }}>
         <h1 className="text-[10vw] font-extralight tracking-tighter text-white leading-[0.8] lg:text-[120px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          KIM YEJUN
        </h1>
        <p className="mt-8 text-sm font-medium tracking-[0.8em] text-sleek-blue uppercase opacity-90 drop-shadow-lg">
          INES PORTFOLIO
        </p>
      </div>

      {/* Floating Sparkles inside display */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute h-1 w-1 rounded-full bg-white blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Glossy overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-[40px] bg-gradient-to-tr from-white/5 via-transparent to-transparent z-30" />
    </motion.div>
  );
}
