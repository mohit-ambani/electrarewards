import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { trackingStages, generateOrderId, generateDocket, generateOTP } from '../data/trackingSimulation';
import OTPVerification from './OTPVerification';

export default function TrackingScreen({ gift, onComplete }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [stages, setStages] = useState([]);
  const [showOTP, setShowOTP] = useState(false);
  const [orderId] = useState(generateOrderId);
  const [docket] = useState(generateDocket);
  const [otp] = useState(generateOTP);
  const [secondsToNext, setSecondsToNext] = useState(60);
  const bottomRef = useRef(null);

  // Process tracking stage details with real data
  const processDetail = (detail) => {
    return detail
      .replace('{orderId}', orderId)
      .replace('{docket}', docket);
  };

  // Advance stages every 60 seconds (1 minute)
  useEffect(() => {
    if (currentStage >= trackingStages.length) return;

    // Add initial stage immediately
    if (stages.length === 0) {
      setStages([{ ...trackingStages[0], timestamp: new Date() }]);
      setCurrentStage(1);
      return;
    }

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setSecondsToNext(prev => {
        if (prev <= 1) {
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    // Stage advancement timer (every 60 seconds)
    const stageTimer = setInterval(() => {
      setCurrentStage(prev => {
        const nextStage = prev;
        if (nextStage < trackingStages.length) {
          setStages(s => [...s, { ...trackingStages[nextStage], timestamp: new Date() }]);

          // If it's the OTP stage
          if (nextStage === trackingStages.length - 1) {
            setTimeout(() => setShowOTP(true), 1500);
          }

          return prev + 1;
        }
        return prev;
      });
      setSecondsToNext(60);
    }, 60000); // 60 seconds = 1 minute

    return () => {
      clearInterval(countdownTimer);
      clearInterval(stageTimer);
    };
  }, [currentStage, stages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [stages]);

  const handleOTPSuccess = () => {
    setShowOTP(false);
    onComplete();
  };

  const progressPercent = (stages.length / trackingStages.length) * 100;

  // For demo: advance to next stage immediately
  const skipToNext = () => {
    if (currentStage < trackingStages.length) {
      setStages(s => [...s, { ...trackingStages[currentStage], timestamp: new Date() }]);
      if (currentStage === trackingStages.length - 1) {
        setTimeout(() => setShowOTP(true), 1500);
      }
      setCurrentStage(prev => prev + 1);
      setSecondsToNext(60);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-dark-950 flex flex-col max-w-[430px] mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-10 bg-dark-950/90 backdrop-blur-xl border-b border-white/5 px-4 py-3"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-bold text-white">Live Tracking</h2>
            <p className="text-[11px] text-dark-400">Order #{orderId}</p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-400">LIVE</span>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-100, 200] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-dark-500">{stages.length}/{trackingStages.length} stages</span>
          {currentStage < trackingStages.length && (
            <span className="text-[10px] text-brand-400">Next update in {secondsToNext}s</span>
          )}
        </div>
      </motion.div>

      {/* Gift Summary Card */}
      <div className="px-4 pt-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-glass rounded-2xl p-3 flex items-center gap-3"
        >
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gift.color} flex items-center justify-center`}>
            <span className="text-2xl">{gift.image}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white">{gift.name}</h3>
            <p className="text-xs text-dark-400">Estimated delivery: 2-5 business days</p>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-32">
        <AnimatePresence>
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="flex gap-4 mb-1"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className={`w-10 h-10 rounded-full ${stage.bgColor} ${stage.borderColor} border flex items-center justify-center text-lg relative`}
                >
                  {index === stages.length - 1 && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${stage.borderColor} border`}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <span>{stage.icon}</span>
                </motion.div>
                {index < stages.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 60 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-0.5 bg-gradient-to-b from-dark-600 to-dark-800"
                  />
                )}
                {index === stages.length - 1 && currentStage < trackingStages.length && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 40 }}
                    className="w-0.5 bg-dark-800"
                  >
                    <motion.div
                      className="w-full bg-brand-500/50"
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`flex-1 pb-6 ${index === stages.length - 1 ? '' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`text-sm font-bold ${stage.color}`}>
                      {stage.title}
                    </h4>
                    <p className="text-xs text-dark-400 mt-0.5">{stage.subtitle}</p>
                  </div>
                  <span className="text-[10px] text-dark-500 whitespace-nowrap">
                    {stage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.5 }}
                  className={`mt-2 p-2.5 ${stage.bgColor} rounded-xl border ${stage.borderColor}`}
                >
                  <p className="text-[11px] text-dark-300">
                    {processDetail(stage.detail)}
                  </p>
                </motion.div>

                {/* Notification badge */}
                {index === stages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-2 flex items-center gap-1.5"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: 3 }}
                      className="text-xs"
                    >
                      🔔
                    </motion.div>
                    <span className="text-[10px] text-dark-400 italic">
                      Real-time notification sent
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Waiting indicator */}
        {currentStage < trackingStages.length && stages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 pl-14 mt-2"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex gap-1"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-brand-400"
                />
              ))}
            </motion.div>
            <span className="text-xs text-dark-500">
              Next: {trackingStages[currentStage]?.title}
            </span>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Skip button for demo */}
      {currentStage < trackingStages.length && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-950 via-dark-950/95 to-transparent max-w-[430px] mx-auto">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={skipToNext}
            className="w-full py-3.5 rounded-2xl bg-glass border border-brand-500/20 text-brand-400 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <span>Skip to Next Update</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
          <p className="text-center text-[10px] text-dark-500 mt-2">
            Demo mode: Updates every 1 minute (or tap to skip)
          </p>
        </div>
      )}

      {/* OTP Verification */}
      <AnimatePresence>
        {showOTP && (
          <OTPVerification
            otp={otp}
            gift={gift}
            onSuccess={handleOTPSuccess}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
