import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

export default function OTPVerification({ otp, gift, onSuccess }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOTP, setShowOTP] = useState(true);
  const inputRefs = useRef([]);

  const fireSuccessConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#22c55e', '#10b981', '#34d399'],
        zIndex: 200,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#22c55e', '#10b981', '#34d399'],
        zIndex: 200,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInput = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);
    setError(false);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all digits are entered
    if (newDigits.every(d => d !== '') && index === 3) {
      const entered = newDigits.join('');
      if (entered === otp) {
        setSuccess(true);
        fireSuccessConfetti();
        setTimeout(onSuccess, 3000);
      } else {
        setError(true);
        setDigits(['', '', '', '']);
        setTimeout(() => inputRefs.current[0]?.focus(), 300);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-dark-950/95 backdrop-blur-xl flex flex-col items-center justify-center px-6 max-w-[430px] mx-auto"
    >
      {!success ? (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full text-center"
        >
          {/* Lock icon */}
          <motion.div
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            🔐
          </motion.div>

          <h2 className="text-2xl font-display font-extrabold text-white">
            Delivery Confirmation
          </h2>
          <p className="text-sm text-dark-300 mt-2">
            Enter the OTP to confirm gift delivery
          </p>

          {/* OTP Display (for demo) */}
          {showOTP && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl"
            >
              <p className="text-xs text-dark-400">Your OTP (Demo)</p>
              <motion.p
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-display font-extrabold text-brand-400 tracking-[0.3em] mt-1"
              >
                {otp}
              </motion.p>
              <button
                onClick={() => setShowOTP(false)}
                className="text-[10px] text-dark-500 mt-1 underline"
              >
                Hide OTP
              </button>
            </motion.div>
          )}

          {/* OTP Input */}
          <div className="flex gap-3 justify-center mt-8">
            {digits.map((digit, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <input
                  ref={el => inputRefs.current[i] = el}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInput(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`otp-input w-16 h-20 text-center text-3xl font-display font-bold bg-dark-800/80 rounded-2xl border-2 outline-none transition-all duration-300 ${
                    error
                      ? 'border-red-500 text-red-400'
                      : digit
                      ? 'border-brand-500 text-brand-400'
                      : 'border-dark-600 text-white'
                  }`}
                />
                {!digit && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-3 h-0.5 rounded-full bg-dark-500" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-4 font-medium"
            >
              Invalid OTP. Please try again.
            </motion.p>
          )}

          {/* Info text */}
          <p className="text-dark-500 text-xs mt-6">
            Share this OTP with the delivery agent
          </p>
        </motion.div>
      ) : (
        /* Success State */
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          {/* Success animation background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 4 + Math.random() * 8,
                  height: 4 + Math.random() * 8,
                  background: ['#22c55e', '#10b981', '#34d399', '#fb923c', '#3b82f6'][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -200],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="relative z-10"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(34, 197, 94, 0.3)',
                  '0 0 80px rgba(34, 197, 94, 0.5)',
                  '0 0 30px rgba(34, 197, 94, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto"
            >
              <span className="text-7xl">🎉</span>
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-display font-extrabold text-gradient-gold mt-6 relative z-10"
          >
            Gift Delivered!
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-dark-300 mt-2 text-sm relative z-10"
          >
            Your {gift.name} has been delivered successfully!
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative z-10 mt-6 p-4 bg-glass rounded-2xl"
          >
            <span className="text-5xl">{gift.image}</span>
            <p className="text-sm font-bold text-white mt-2">Enjoy your reward!</p>
            <p className="text-xs text-dark-400 mt-1">Thank you for being a valued electrician partner</p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
