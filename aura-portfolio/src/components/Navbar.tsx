import { motion } from "motion/react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-10"
    >
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold tracking-[0.2em] text-white uppercase">INES PORTFOLIO</span>
      </div>
      
      <div className="hidden items-center gap-12 md:flex">
        {['Work', 'Contact'].map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`text-xs font-medium tracking-[0.2em] transition-colors uppercase ${index === 0 ? 'text-white' : 'text-[#888] hover:text-white'}`}
          >
            {item}
          </a>
        ))}
      </div>
      
      <div className="hidden md:block" />
    </motion.nav>
  );
}
