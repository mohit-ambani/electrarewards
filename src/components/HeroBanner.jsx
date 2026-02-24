import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const banners = [
  {
    id: 'premium',
    title: 'Premium Rewards',
    subtitle: 'Redeem your hard-earned points for exclusive gifts',
    gradient: 'from-brand-600 via-brand-500 to-amber-500',
    emoji: '🏆',
  },
  {
    id: 'tools',
    title: 'Pro Tools Collection',
    subtitle: 'Top-tier equipment trusted by master electricians',
    gradient: 'from-electric-600 via-electric-500 to-cyan-500',
    emoji: '🔧',
  },
  {
    id: 'new_arrivals',
    title: 'New Arrivals',
    subtitle: 'Latest gadgets and premium electronics added!',
    gradient: 'from-purple-600 via-violet-500 to-fuchsia-500',
    emoji: '✨',
  },
];

export default function HeroBanner({ onBannerClick }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[current];

  return (
    <div className="px-4 pt-4">
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.95, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: -20 }}
        transition={{ duration: 0.5 }}
        onClick={() => onBannerClick?.(banner.id)}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${banner.gradient} p-5 cursor-pointer active:scale-[0.98] transition-transform`}
      >
        {/* Decorative circles */}
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 blur-sm" />
        <div className="absolute -right-2 -bottom-8 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute left-1/2 -top-4 w-16 h-16 rounded-full bg-white/5" />

        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: [-200, 400] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />

        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-display font-extrabold text-white"
            >
              {banner.title}
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-white/80 mt-1 max-w-[200px] leading-relaxed"
            >
              {banner.subtitle}
            </motion.p>
            {/* Explore indicator */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[11px] font-semibold text-white/90 mt-2 flex items-center gap-1"
            >
              Explore
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.p>
          </div>
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="text-5xl"
          >
            {banner.emoji}
          </motion.span>
        </div>

        {/* Dots */}
        <div className="flex gap-1.5 mt-4">
          {banners.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
