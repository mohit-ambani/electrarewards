import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const earnMethods = [
  { icon: '🔧', label: 'Complete Jobs', points: '+500', color: 'from-brand-500/20 to-brand-600/20' },
  { icon: '📄', label: 'Upload Bills', points: '+200', color: 'from-electric-500/20 to-electric-600/20' },
  { icon: '📅', label: 'Daily Login', points: '+50', color: 'from-green-500/20 to-green-600/20' },
  { icon: '⭐', label: 'Referrals', points: '+300', color: 'from-purple-500/20 to-purple-600/20' },
];

export default function GiftDetail({ gift, onClose, onRedeem, userPoints }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const canAfford = userPoints >= gift.points;
  const deficit = gift.points - userPoints;
  const progressPercent = Math.min(100, Math.round((userPoints / gift.points) * 100));

  const handleRedeem = () => {
    if (canAfford) {
      setShowConfirm(true);
    }
  };

  const confirmRedeem = () => {
    onRedeem(gift);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-dark-950/95 backdrop-blur-xl"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="absolute inset-0 flex flex-col max-w-[430px] mx-auto"
      >
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-lg"
        >
          ✕
        </motion.button>

        {/* Gift Image */}
        <div className={`relative h-72 bg-gradient-to-br ${gift.color} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute -left-6 -bottom-10 w-32 h-32 rounded-full bg-white/5" />

          {/* Animated sparkles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            />
          ))}

          <motion.span
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-8xl relative z-10 drop-shadow-2xl"
          >
            {gift.image}
          </motion.span>

          {gift.tag && (
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-black/40 backdrop-blur-sm text-xs font-bold text-white"
            >
              {gift.tag}
            </motion.div>
          )}

          {/* Locked overlay for unaffordable gifts */}
          {!canAfford && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
                className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10"
              >
                <motion.span
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl inline-block mr-2"
                >
                  🔒
                </motion.span>
                <span className="text-sm font-bold text-white">Premium Reward</span>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-display font-extrabold text-white leading-tight">
              {gift.name}
            </h2>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(gift.rating) ? 'text-amber-400' : 'text-dark-600'}`}>
                    ★
                  </span>
                ))}
                <span className="text-sm text-dark-400 ml-1">{gift.rating}</span>
              </div>
              <span className="text-dark-600">•</span>
              <span className="text-xs text-dark-400 capitalize">{gift.category}</span>
            </div>

            <p className="text-sm text-dark-300 mt-4 leading-relaxed">
              {gift.description}
            </p>

            {/* Points Cost Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-glass rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-dark-400">Redemption Cost</p>
                  <p className="text-2xl font-display font-extrabold text-brand-400 mt-1">
                    ⚡ {gift.points.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-dark-400">Your Balance</p>
                  {canAfford ? (
                    <p className="text-lg font-bold mt-1 text-green-400">
                      ⚡ {userPoints.toLocaleString()}
                    </p>
                  ) : (
                    <motion.p
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-lg font-bold mt-1 text-red-400"
                    >
                      ⚡ {userPoints.toLocaleString()}
                    </motion.p>
                  )}
                </div>
              </div>

              {canAfford ? (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="mt-3 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                />
              ) : (
                <div className="mt-3">
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-amber-400 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-dark-400 mt-1.5 text-center">
                    {progressPercent}% of the way there
                  </p>
                </div>
              )}
            </motion.div>

            {/* Delivery info */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: '🚚', label: 'Free Delivery', sub: '2-5 days' },
                { icon: '🔒', label: 'Secure', sub: 'Packaging' },
                { icon: '✅', label: 'Verified', sub: 'Authentic' },
              ].map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center p-3 bg-glass rounded-xl"
                >
                  <span className="text-lg">{info.icon}</span>
                  <p className="text-[10px] font-semibold text-white mt-1">{info.label}</p>
                  <p className="text-[9px] text-dark-400">{info.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Aspiration Panel - only for unaffordable gifts */}
            {!canAfford && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-5"
              >
                {/* Points needed message */}
                <div className="bg-glass rounded-2xl p-4 text-center">
                  <motion.span
                    animate={{ rotate: [-8, 8, -8] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-3xl inline-block"
                  >
                    🔒
                  </motion.span>
                  <p className="text-sm text-dark-300 mt-2">
                    You need <span className="text-brand-400 font-extrabold">⚡ {deficit.toLocaleString()}</span> more points
                  </p>
                </div>

                {/* Ways to Earn Grid */}
                <div className="mt-3">
                  <p className="text-xs font-display font-bold text-white mb-2">Ways to Earn</p>
                  <div className="grid grid-cols-2 gap-2">
                    {earnMethods.map((method, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.08 }}
                        className={`bg-gradient-to-br ${method.color} border border-white/5 rounded-xl p-3 text-center`}
                      >
                        <span className="text-xl">{method.icon}</span>
                        <p className="text-[10px] font-semibold text-white mt-1">{method.label}</p>
                        <p className="text-xs font-bold text-brand-400 mt-0.5">{method.points}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-dark-950 via-dark-950 to-transparent max-w-[430px] mx-auto">
          {canAfford ? (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRedeem}
              className="w-full py-4 rounded-2xl text-base font-bold relative overflow-hidden bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-200, 400] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10">
                Redeem for ⚡ {gift.points.toLocaleString()} Points
              </span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full py-4 rounded-2xl text-base font-bold relative overflow-hidden bg-glass border border-white/10 text-center cursor-default"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: [-200, 400] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10 text-dark-300">
                🔒 <span className="text-brand-400 font-extrabold">⚡ {deficit.toLocaleString()}</span> Points Away
              </span>
            </motion.div>
          )}
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                className="bg-dark-800 border border-white/10 rounded-3xl p-6 w-full max-w-sm"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl mb-4"
                  >
                    🎁
                  </motion.div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Confirm Redemption
                  </h3>
                  <p className="text-sm text-dark-300 mt-2">
                    You're about to redeem <span className="text-brand-400 font-bold">{gift.name}</span> for{' '}
                    <span className="text-brand-400 font-bold">⚡ {gift.points.toLocaleString()}</span> points
                  </p>

                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 py-3 rounded-xl bg-dark-700 text-dark-300 text-sm font-semibold"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={confirmRedeem}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-bold shadow-lg shadow-brand-500/30"
                    >
                      Confirm ⚡
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
