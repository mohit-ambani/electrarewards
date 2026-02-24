import { motion } from 'framer-motion';
import { useRef } from 'react';
import { gifts } from '../data/gifts';

const PAGE_CONFIG = {
  premium: {
    title: 'Premium Rewards',
    subtitle: 'Exclusive high-value gifts for top earners',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    accentColor: 'text-amber-400',
    badgeColor: 'bg-amber-500/20 text-amber-400',
    cardAccent: 'border-amber-500/20',
    emoji: '👑',
    filterFn: (g) => g.category === 'premium' || g.points >= 10000,
    shimmerColor: 'via-amber-300/20',
  },
  tools: {
    title: 'Pro Tools Collection',
    subtitle: 'Top-tier equipment for master electricians',
    gradient: 'from-electric-600 via-electric-500 to-cyan-500',
    accentColor: 'text-electric-400',
    badgeColor: 'bg-electric-500/20 text-electric-400',
    cardAccent: 'border-electric-500/20',
    emoji: '🔧',
    filterFn: (g) => g.category === 'tools',
    shimmerColor: 'via-electric-300/20',
  },
  new_arrivals: {
    title: 'New Arrivals',
    subtitle: 'Latest additions to the catalogue',
    gradient: 'from-purple-600 via-violet-500 to-fuchsia-500',
    accentColor: 'text-purple-400',
    badgeColor: 'bg-purple-500/20 text-purple-400',
    cardAccent: 'border-purple-500/20',
    emoji: '✨',
    filterFn: (g) => ['Hot Pick', 'Exclusive', 'Top Rated', 'Premium'].includes(g.tag),
    shimmerColor: 'via-purple-300/20',
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function FeaturedCard({ gift, config, onSelect }) {
  return (
    <motion.div
      variants={cardVariant}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(gift)}
      className={`shrink-0 w-56 bg-glass rounded-2xl overflow-hidden border ${config.cardAccent} cursor-pointer`}
    >
      <div className={`relative h-36 bg-gradient-to-br ${gift.color} flex items-center justify-center overflow-hidden`}>
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute -left-2 -bottom-4 w-14 h-14 rounded-full bg-white/5" />

        {/* Shimmer overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-transparent ${config.shimmerColor} to-transparent`}
          animate={{ x: [-250, 250] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
        />

        <span className="text-5xl relative z-10 drop-shadow-lg">{gift.image}</span>

        {gift.tag && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-lg text-[9px] font-bold ${config.badgeColor}`}>
            {gift.tag}
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs font-bold text-white truncate">{gift.name}</p>
        <p className={`text-sm font-display font-extrabold mt-1 ${config.accentColor}`}>
          ⚡ {gift.points.toLocaleString()}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] text-amber-400">★</span>
          <span className="text-[10px] text-dark-400">{gift.rating}</span>
        </div>
      </div>
    </motion.div>
  );
}

function GridCard({ gift, config, onSelect, isNewArrivals }) {
  return (
    <motion.div
      variants={cardVariant}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(gift)}
      className={`bg-glass rounded-xl overflow-hidden border ${config.cardAccent} cursor-pointer`}
    >
      <div className={`relative h-28 bg-gradient-to-br ${gift.color} flex items-center justify-center overflow-hidden`}>
        <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full bg-white/10" />
        <span className="text-4xl relative z-10 drop-shadow-lg">{gift.image}</span>

        {isNewArrivals && (
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-fuchsia-500 text-[8px] font-bold text-white"
          >
            NEW
          </motion.span>
        )}
      </div>

      <div className="p-2.5">
        <p className="text-[11px] font-semibold text-white truncate">{gift.name}</p>
        <div className="flex items-center justify-between mt-1.5">
          <p className={`text-xs font-display font-extrabold ${config.accentColor}`}>
            ⚡ {gift.points.toLocaleString()}
          </p>
          <div className="flex items-center gap-0.5">
            <span className="text-[9px] text-amber-400">★</span>
            <span className="text-[9px] text-dark-400">{gift.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BannerPage({ pageType, onBack, onGiftSelect }) {
  const scrollRef = useRef(null);
  const config = PAGE_CONFIG[pageType];
  const filteredGifts = gifts.filter(config.filterFn);
  const featured = filteredGifts.slice(0, 5);
  const isNewArrivals = pageType === 'new_arrivals';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-950 max-w-[430px] mx-auto pb-24"
    >
      {/* Gradient Header with Parallax */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${config.gradient} px-5 pt-12 pb-10`}>
        {/* Decorative floating circles */}
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute -left-8 bottom-0 w-32 h-32 rounded-full bg-white/5"
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          className="absolute right-1/3 top-6 w-16 h-16 rounded-full bg-white/5"
        />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: [-400, 400] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="relative z-10 flex items-center gap-1 text-white/90 text-sm font-medium mb-4"
        >
          <span className="text-lg">←</span> Back
        </motion.button>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-2xl font-display font-extrabold text-white"
            >
              {config.title}
            </motion.h1>
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-xs text-white/80 mt-1 max-w-[220px] leading-relaxed"
            >
              {config.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-[10px] text-white/60 mt-2"
            >
              {filteredGifts.length} items
            </motion.p>
          </div>
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="text-5xl"
          >
            {config.emoji}
          </motion.span>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="px-4 -mt-5 relative z-10">
        <h2 className="text-sm font-display font-bold text-white mb-3">Featured</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {featured.map((gift) => (
            <FeaturedCard
              key={gift.id}
              gift={gift}
              config={config}
              onSelect={onGiftSelect}
            />
          ))}
        </motion.div>
      </div>

      {/* Full Grid */}
      <div className="px-4 mt-5">
        <h2 className="text-sm font-display font-bold text-white mb-3">All {config.title}</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          {filteredGifts.map((gift) => (
            <GridCard
              key={gift.id}
              gift={gift}
              config={config}
              onSelect={onGiftSelect}
              isNewArrivals={isNewArrivals}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
