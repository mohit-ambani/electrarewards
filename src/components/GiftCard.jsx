import { motion } from 'framer-motion';

export default function GiftCard({ gift, index, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 100 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onSelect(gift)}
      className="relative group cursor-pointer"
    >
      <div className="bg-glass rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/30 transition-all duration-300">
        {/* Gift Image Area */}
        <div className={`relative h-36 bg-gradient-to-br ${gift.color} flex items-center justify-center overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
          <div className="absolute -left-2 -bottom-4 w-16 h-16 rounded-full bg-white/5" />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileInView={{ x: '200%' }}
            transition={{ duration: 1.5, delay: index * 0.1 }}
          />

          {/* Gift emoji */}
          <motion.span
            className="text-6xl relative z-10 drop-shadow-lg"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring' }}
          >
            {gift.image}
          </motion.span>

          {/* Tag */}
          {gift.tag && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-sm text-[10px] font-bold text-white"
            >
              {gift.tag}
            </motion.div>
          )}

          {/* Points badge */}
          <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-xl bg-black/50 backdrop-blur-md">
            <p className="text-xs font-bold text-brand-400">
              ⚡ {gift.points.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Gift Info */}
        <div className="p-3">
          <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">
            {gift.name}
          </h3>
          <p className="text-[11px] text-dark-400 mt-1 line-clamp-1">
            {gift.description}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-[10px] ${i < Math.floor(gift.rating) ? 'text-amber-400' : 'text-dark-600'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-[10px] text-dark-400">{gift.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
