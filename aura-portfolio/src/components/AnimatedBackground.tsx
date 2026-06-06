import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) / 15);
      mouseY.set((e.clientY - centerY) / 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#01040f]">
      {/* Deep Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a1428_0%,#01040f_100%)] opacity-80" />

      {/* Multi-layered Tunnel Panels (Video 0:09) */}
      <div className="absolute inset-0 perspective-1000">
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute inset-0"
        >
          {/* Left Side Panels */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`left-${i}`}
              style={{ 
                rotateY: useTransform(springX, [-50, 50], [`${60 + i * 5}deg`, `${10 + i * 2}deg`]),
                x: i * -50,
                z: i * -150,
                originX: 0
              }}
              className="absolute left-[5%] top-[10%] bottom-[10%] w-[40%] opacity-[0.4] transition-opacity duration-1000"
            >
              <div 
                className="h-full w-full border-l border-white/10"
                style={{
                  background: "linear-gradient(90deg, rgba(59,130,246,0.3) 0%, rgba(30,58,138,0.1) 40%, transparent 100%)",
                  clipPath: "polygon(0 0, 100% 30%, 100% 70%, 0 100%)",
                  filter: `blur(${10 + i * 10}px)`,
                }}
              />
            </motion.div>
          ))}

          {/* Right Side Panels */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`right-${i}`}
              style={{ 
                rotateY: useTransform(springX, [-50, 50], [`-10deg`, `-${60 + i * 5}deg`]),
                x: i * 50,
                z: i * -150,
                originX: 1
              }}
              className="absolute right-[5%] top-[10%] bottom-[10%] w-[40%] opacity-[0.4] transition-opacity duration-1000"
            >
              <div 
                className="h-full w-full border-r border-white/10"
                style={{
                  background: "linear-gradient(-90deg, rgba(59,130,246,0.3) 0%, rgba(30,58,138,0.1) 40%, transparent 100%)",
                  clipPath: "polygon(100% 0, 0 30%, 0 70%, 100% 100%)",
                  filter: `blur(${10 + i * 10}px)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Kinetic Motion Light Streaks (Video 0:06) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scaleZ: 0,
              opacity: 0
            }}
            animate={{ 
              z: [0, 2000],
              opacity: [0, 0.8, 0],
              scaleY: [1, 5, 1],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              ease: "circIn",
              delay: Math.random() * 5
            }}
            className="absolute h-[1px] w-[200px] bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ 
              transformStyle: "preserve-3d",
              rotateX: Math.random() * 360 + "deg",
              rotateY: Math.random() * 360 + "deg"
            }}
          />
        ))}
      </div>

      {/* Central Corridor Aura */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/40 to-transparent blur-[2px] opacity-50" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
    </div>
  );
}
