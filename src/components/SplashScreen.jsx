import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => onComplete(), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-950"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background electric arcs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-brand-400 to-transparent"
              style={{
                left: `${15 + i * 15}%`,
                height: '100%',
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 0.2 * i,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>

        {/* Lightning bolt icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={phase >= 0 ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(251, 146, 60, 0.3)',
                '0 0 60px rgba(251, 146, 60, 0.6)',
                '0 0 20px rgba(251, 146, 60, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center"
          >
            <span className="text-5xl">⚡</span>
          </motion.div>

          {/* Orbiting particles */}
          {phase >= 1 && [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-brand-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.cos(i * Math.PI / 4) * 60],
                y: [0, Math.sin(i * Math.PI / 4) * 60],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
              }}
              style={{
                left: '50%',
                top: '50%',
                marginLeft: -4,
                marginTop: -4,
              }}
            />
          ))}
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <h1 className="text-4xl font-display font-extrabold text-gradient">
            ElectraRewards
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-3 text-dark-400 font-medium text-sm tracking-wider uppercase"
        >
          Premium Rewards for Pro Electricians
        </motion.p>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          className="mt-8 w-48 h-1 bg-dark-800 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={phase >= 2 ? { width: '100%' } : {}}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-brand-500 to-electric-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
