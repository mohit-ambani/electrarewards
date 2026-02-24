import { motion } from 'framer-motion';
import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

export default function DeliverySuccess({ gift, onBackToCatalogue }) {
  const celebrate = useCallback(() => {
    // Star confetti
    const defaults = { spread: 360, ticks: 100, gravity: 0, decay: 0.94, startVelocity: 30, zIndex: 200 };

    function shoot() {
      confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ['star'], colors: ['#fb923c', '#f97316', '#3b82f6', '#22c55e', '#eab308'] });
      confetti({ ...defaults, particleCount: 20, scalar: 0.75, shapes: ['circle'], colors: ['#fb923c', '#f97316', '#3b82f6'] });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    setTimeout(shoot, 300);
  }, []);

  useEffect(() => {
    celebrate();
    const timer = setInterval(celebrate, 4000);
    return () => clearInterval(timer);
  }, [celebrate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[80] bg-dark-950 flex flex-col items-center justify-center px-6 max-w-[430px] mx-auto overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-48 origin-bottom"
              style={{ transform: `rotate(${i * 60}deg)` }}
            >
              <div className="w-full h-full bg-gradient-to-t from-brand-500/10 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating emojis */}
      {['🎉', '⚡', '🎁', '🏆', '✨', '🎊', '🔧', '💪'].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i * 8) % 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 20, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      <div className="relative z-10 text-center">
        {/* Trophy */}
        <motion.div
          initial={{ y: -50, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              boxShadow: [
                '0 0 30px rgba(234, 179, 8, 0.3)',
                '0 0 60px rgba(234, 179, 8, 0.5)',
                '0 0 30px rgba(234, 179, 8, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center mx-auto"
          >
            <span className="text-6xl">🏆</span>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-display font-extrabold text-gradient-gold mt-8"
        >
          Delivery Complete!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-dark-300 mt-3 text-sm max-w-xs mx-auto"
        >
          Your premium gift has been successfully delivered. Thank you for being an amazing electrician partner!
        </motion.p>

        {/* Gift recap */}
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
          className="mt-8 p-5 bg-glass rounded-3xl relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 shimmer-bg"
          />
          <span className="text-5xl block relative z-10">{gift.image}</span>
          <h3 className="text-lg font-bold text-white mt-3 relative z-10">{gift.name}</h3>
          <div className="flex items-center justify-center gap-2 mt-2 relative z-10">
            <span className="text-xs text-green-400 font-semibold">✓ Delivered</span>
            <span className="text-dark-600">•</span>
            <span className="text-xs text-dark-400">OTP Verified</span>
          </div>
        </motion.div>

        {/* Rating prompt */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6"
        >
          <p className="text-xs text-dark-400 mb-2">Rate your experience</p>
          <div className="flex justify-center gap-2">
            {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.3 + i * 0.1, type: 'spring' }}
                className="text-2xl cursor-pointer"
              >
                {star}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Back to catalogue */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackToCatalogue}
          className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-base shadow-lg shadow-brand-500/30 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-200, 400] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative z-10">Browse More Gifts ⚡</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
