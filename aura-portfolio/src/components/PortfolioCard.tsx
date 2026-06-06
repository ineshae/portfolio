import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import React from "react";

interface PortfolioCardProps {
  title: string;
  category: string;
  description: string;
  gradient: string;
  delay?: number;
  onClick?: () => void;
  key?: React.Key | number | string;
}

export function PortfolioCard({ title, category, description, gradient, delay = 0, onClick }: PortfolioCardProps) {
  return (
    <div className="perspective-1000 group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        style={{ transformOrigin: "left center" }}
        whileHover={{ 
          rotateY: -65,
          translateX: 30,
          scale: 1.1,
          transition: { type: "spring", stiffness: 150, damping: 20 }
        }}
        onClick={onClick}
        className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[-50px_60px_100px_rgba(0,0,0,0.9)] cursor-pointer"
      >
        {/* Book "Spine" effect on left */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-white/10 to-transparent z-20" />
        
        {/* Subtle Theme Blue Glow on Hover (Internal Content) */}
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br from-sleek-blue/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />
        
        <div className="flex h-full flex-col justify-between relative z-10 transition-transform duration-700 group-hover:translate-x-2">
          <div>
            <p className="text-[10px] font-medium tracking-[0.4em] text-sleek-blue uppercase opacity-80">
              {category}
            </p>
            <h3 className="mt-4 text-3xl font-extralight tracking-tight text-white leading-tight break-keep">
              {title}
            </h3>
          </div>
          
          <div className="space-y-6">
            <p className="text-sm font-light leading-relaxed text-[#ccc] opacity-70 break-keep">
              {description}
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className="text-[10px] font-medium tracking-[0.2em] text-[#555] uppercase transition-colors group-hover:text-white">
                View Project
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#555] transition-all group-hover:text-white" />
            </div>
          </div>
        </div>
        
        {/* Page "Edge" Highlight */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Bottom depth glow */}
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-sleek-blue/5 blur-[80px]" />
      </motion.div>
    </div>
  );
}
