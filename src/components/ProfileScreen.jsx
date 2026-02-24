import { motion } from 'framer-motion';

export default function ProfileScreen({ userPoints, onClose }) {
  const tier = userPoints >= 20000 ? 'Platinum' : userPoints >= 10000 ? 'Gold' : userPoints >= 5000 ? 'Silver' : 'Bronze';
  const tierEmoji = { Platinum: '💎', Gold: '🥇', Silver: '🥈', Bronze: '🥉' }[tier];
  const tierColor = { Platinum: 'from-violet-400 to-purple-600', Gold: 'from-yellow-400 to-amber-600', Silver: 'from-gray-300 to-gray-500', Bronze: 'from-amber-600 to-amber-800' }[tier];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-950 max-w-[430px] mx-auto pb-24"
    >
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-br from-brand-600 via-brand-500 to-electric-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            animate={{
              y: [-10, -60],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
            style={{ left: `${10 + i * 12}%`, top: '80%' }}
          />
        ))}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white"
        >
          ✕
        </motion.button>

        <div className="absolute bottom-4 left-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mb-2"
          >
            👷
          </motion.div>
          <h2 className="text-xl font-display font-bold text-white">Rajesh Kumar</h2>
          <p className="text-xs text-white/70">Master Electrician • Member since 2024</p>
        </div>
      </div>

      {/* Points Card */}
      <div className="px-4 -mt-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-glass rounded-2xl p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-dark-400">Available Points</p>
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="text-3xl font-display font-extrabold text-brand-400 mt-1"
              >
                ⚡ {userPoints.toLocaleString()}
              </motion.p>
            </div>
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 10px rgba(251, 146, 60, 0.2)',
                  '0 0 25px rgba(251, 146, 60, 0.4)',
                  '0 0 10px rgba(251, 146, 60, 0.2)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${tierColor} flex items-center gap-1.5`}
            >
              <span className="text-lg">{tierEmoji}</span>
              <span className="text-sm font-bold text-white">{tier}</span>
            </motion.div>
          </div>

          {/* Progress to next tier */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] text-dark-400 mb-1">
              <span>Progress to next tier</span>
              <span>75%</span>
            </div>
            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Gifts Redeemed', value: '12', icon: '🎁' },
          { label: 'Points Earned', value: '85K', icon: '⚡' },
          { label: 'Rank', value: '#24', icon: '🏆' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="bg-glass rounded-xl p-3 text-center"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
            <p className="text-[10px] text-dark-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Menu items */}
      <div className="px-4 mt-6 pb-32">
        <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Settings</h3>
        {[
          { icon: '📦', label: 'Order History', sub: '12 orders' },
          { icon: '📍', label: 'Delivery Address', sub: 'Sector 21, Noida' },
          { icon: '🔔', label: 'Notifications', sub: 'All enabled' },
          { icon: '🎯', label: 'Earn More Points', sub: 'View missions' },
          { icon: '📞', label: 'Support', sub: '24/7 available' },
          { icon: '📄', label: 'Terms & Conditions', sub: '' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            whileTap={{ scale: 0.98, backgroundColor: 'rgba(255,255,255,0.02)' }}
            className="flex items-center gap-3 p-3 rounded-xl mb-1 cursor-pointer"
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{item.label}</p>
              {item.sub && <p className="text-[11px] text-dark-400">{item.sub}</p>}
            </div>
            <span className="text-dark-600 text-sm">›</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
