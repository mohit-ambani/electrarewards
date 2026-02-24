import { motion } from 'framer-motion';

const tabs = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'catalogue', icon: '🎁', label: 'Gifts' },
  { id: 'rewards', icon: '⚡', label: 'Points' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

export default function BottomNav({ active, onSelect }) {
  return (
    <motion.nav
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-dark-950/90 backdrop-blur-xl border-t border-white/5"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(tab.id)}
            className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all duration-300 ${
              active === tab.id ? 'bg-brand-500/10' : ''
            }`}
          >
            <motion.span
              animate={active === tab.id ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="text-lg"
            >
              {tab.icon}
            </motion.span>
            <span
              className={`text-[10px] font-semibold transition-colors ${
                active === tab.id ? 'text-brand-400' : 'text-dark-500'
              }`}
            >
              {tab.label}
            </span>
            {active === tab.id && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -bottom-0 w-8 h-0.5 rounded-full bg-brand-500"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Safe area spacer */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </motion.nav>
  );
}
