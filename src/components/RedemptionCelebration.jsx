import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

export default function RedemptionCelebration({ gift, onContinue }) {
  const [phase, setPhase] = useState(0);

  const fireConfetti = useCallback(() => {
    const count = 200;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        particleCount: Math.floor(count * particleRatio),
        origin: { x: Math.random(), y: Math.random() * 0.3 },
        ...opts,
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  useEffect(() => {
    // Phase transitions
    const timers = [
      setTimeout(() => { setPhase(1); fireConfetti(); }, 300),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => { setPhase(3); fireConfetti(); }, 2500),
      setTimeout(() => setPhase(4), 4000),
    ];

    // Continuous confetti
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fb923c', '#f97316', '#3b82f6'],
        zIndex: 100,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fb923c', '#f97316', '#3b82f6'],
        zIndex: 100,
      });
    }, 100);

    const stopConfetti = setTimeout(() => clearInterval(confettiInterval), 5000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(confettiInterval);
      clearTimeout(stopConfetti);
    };
  }, [fireConfetti]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] bg-dark-950 flex flex-col items-center justify-center overflow-hidden max-w-[430px] mx-auto"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-electric-500/20 blur-3xl"
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? '#fb923c' : '#3b82f6',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        {/* Success checkmark */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto mb-6"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.3)',
                    '0 0 60px rgba(34, 197, 94, 0.5)',
                    '0 0 20px rgba(34, 197, 94, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="text-5xl"
                >
                  ✓
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        {phase >= 2 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-3xl font-display font-extrabold text-gradient-gold">
              Congratulations! 🎉
            </h1>
            <p className="text-dark-300 mt-2 text-sm">
              Your gift has been successfully redeemed
            </p>
          </motion.div>
        )}

        {/* Gift card */}
        {phase >= 3 && (
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
            className="mt-8 p-6 bg-glass rounded-3xl relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: [-200, 400] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl block"
            >
              {gift.image}
            </motion.span>
            <h3 className="text-lg font-bold text-white mt-3">{gift.name}</h3>
            <p className="text-brand-400 text-sm font-bold mt-1">
              ⚡ {gift.points.toLocaleString()} Points Redeemed
            </p>
          </motion.div>
        )}

        {/* CTA */}
        {phase >= 4 && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-base shadow-lg shadow-brand-500/30 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-200, 400] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">Track Your Gift 📦</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
