import { motion } from 'framer-motion';


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function StatCard({ label, value, icon, color, delay }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className="bg-glass rounded-2xl p-4 flex flex-col items-center gap-1"
    >
      <span className="text-2xl">{icon}</span>
      <p className={`text-xl font-display font-extrabold ${color}`}>{value}</p>
      <p className="text-[10px] text-dark-400 font-medium">{label}</p>
    </motion.div>
  );
}

function LedgerRow({ entry, index }) {
  return (
    <motion.div
      variants={item}
      className="bg-glass rounded-xl p-3 flex items-center gap-3"
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${entry.color} flex items-center justify-center text-lg shrink-0`}>
        {entry.image}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{entry.name}</p>
        <p className="text-[10px] text-dark-400 mt-0.5">
          {new Date(entry.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-red-400">-{entry.points.toLocaleString()}</p>
        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-500/20 text-green-400">
          Redeemed
        </span>
      </div>
    </motion.div>
  );
}

export default function RewardsScreen({ userPoints, redemptionHistory, activeTab, onTabSelect }) {
  const totalSpent = redemptionHistory.reduce((sum, e) => sum + e.points, 0);
  const totalEarned = userPoints + totalSpent;
  const progressPercent = totalEarned > 0 ? Math.round((userPoints / totalEarned) * 100) : 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-950 max-w-[430px] mx-auto pb-24"
    >
      {/* Gradient Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-amber-500 px-5 pt-12 pb-8">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-sm" />
        <div className="absolute -left-6 bottom-0 w-28 h-28 rounded-full bg-white/5" />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
            animate={{
              y: [0, -60, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${40 + (i % 3) * 15}%`,
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center relative z-10"
        >
          <span className="text-4xl">⚡</span>
          <h1 className="text-2xl font-display font-extrabold text-white mt-2">
            Points & Rewards
          </h1>
          <p className="text-sm text-white/80 mt-1">Track your earning journey</p>
        </motion.div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            label="Available"
            value={`${(userPoints / 1000).toFixed(1)}k`}
            icon="⚡"
            color="text-brand-400"
            delay={0.2}
          />
          <StatCard
            label="Total Spent"
            value={`${(totalSpent / 1000).toFixed(1)}k`}
            icon="🎁"
            color="text-red-400"
            delay={0.3}
          />
          <StatCard
            label="Redeemed"
            value={redemptionHistory.length}
            icon="🏆"
            color="text-amber-400"
            delay={0.4}
          />
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-dark-400 font-medium">Points Balance</p>
            <p className="text-xs font-bold text-brand-400">{progressPercent}% remaining</p>
          </div>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-brand-500 to-amber-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </motion.div>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-[10px] text-dark-500">0</p>
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-bold text-white"
            >
              ⚡ {userPoints.toLocaleString()} pts
            </motion.p>
            <p className="text-[10px] text-dark-500">{totalEarned.toLocaleString()}</p>
          </div>
        </motion.div>

        {/* Ledger Section */}
        <div className="mt-5">
          <h2 className="text-sm font-display font-bold text-white mb-3">
            Redemption History
          </h2>

          {redemptionHistory.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-glass rounded-2xl p-8 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🎁
              </motion.div>
              <h3 className="text-base font-display font-bold text-white">
                No Redemptions Yet
              </h3>
              <p className="text-xs text-dark-400 mt-2 max-w-[240px] mx-auto leading-relaxed">
                Your redemption history will appear here once you redeem your first gift!
              </p>
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-4 text-2xl"
              >
                ⚡✨⚡
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {redemptionHistory.map((entry, i) => (
                <LedgerRow key={entry.timestamp + '-' + i} entry={entry} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

    </motion.div>
  );
}
