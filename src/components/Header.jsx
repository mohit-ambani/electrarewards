import { motion } from 'framer-motion';

export default function Header({ userPoints, onProfileClick }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20"
          >
            <span className="text-lg">⚡</span>
          </motion.div>
          <div>
            <h1 className="text-sm font-display font-bold text-white leading-none">ElectraRewards</h1>
            <p className="text-[10px] text-dark-400 font-medium">Premium Catalogue</p>
          </div>
        </div>

        {/* Points Badge */}
        <motion.button
          onClick={onProfileClick}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-brand-500/10 to-brand-500/5 border border-brand-500/20 rounded-2xl px-3 py-1.5"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm"
          >
            ⚡
          </motion.div>
          <div className="text-right">
            <p className="text-xs font-bold text-brand-400 leading-none">
              {userPoints.toLocaleString()}
            </p>
            <p className="text-[9px] text-dark-400">points</p>
          </div>
        </motion.button>
      </div>
    </motion.header>
  );
}
