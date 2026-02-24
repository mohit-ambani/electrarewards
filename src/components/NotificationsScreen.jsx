import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

function getNotifications(redemptionHistory) {
  const notifs = [];

  redemptionHistory.forEach((entry) => {
    const time = new Date(entry.timestamp);

    notifs.push({
      id: `redeem-${entry.timestamp}`,
      type: 'redeemed',
      icon: '🎁',
      title: 'Gift Redeemed!',
      message: `You redeemed ${entry.name} for ${entry.points.toLocaleString()} points.`,
      time: time.getTime(),
      color: 'from-brand-500/20 to-brand-500/5',
      accent: 'border-brand-500/30',
    });

    notifs.push({
      id: `confirm-${entry.timestamp}`,
      type: 'confirmed',
      icon: '✅',
      title: 'Order Confirmed',
      message: `Your order for ${entry.name} has been confirmed and is being processed.`,
      time: time.getTime() + 1000,
      color: 'from-green-500/20 to-green-500/5',
      accent: 'border-green-500/30',
    });

    notifs.push({
      id: `ship-${entry.timestamp}`,
      type: 'shipped',
      icon: '🚚',
      title: 'Gift Shipped',
      message: `${entry.name} is on its way! Track your delivery in the app.`,
      time: time.getTime() + 2000,
      color: 'from-blue-500/20 to-blue-500/5',
      accent: 'border-blue-500/30',
    });

    notifs.push({
      id: `deliver-${entry.timestamp}`,
      type: 'delivered',
      icon: '📦',
      title: 'Gift Delivered',
      message: `${entry.name} has been delivered. Enjoy your reward!`,
      time: time.getTime() + 3000,
      color: 'from-purple-500/20 to-purple-500/5',
      accent: 'border-purple-500/30',
    });
  });

  return notifs.sort((a, b) => b.time - a.time);
}

function formatTime(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function NotificationsScreen({ redemptionHistory, onBack }) {
  const notifications = getNotifications(redemptionHistory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-950 max-w-[430px] mx-auto pb-24"
    >
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-500 to-purple-600 px-5 pt-12 pb-8">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-sm" />
        <div className="absolute -left-6 bottom-0 w-28 h-28 rounded-full bg-white/5" />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white text-lg"
        >
          ←
        </motion.button>

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${50 + (i % 3) * 10}%`,
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center relative z-10"
        >
          <span className="text-4xl">🔔</span>
          <h1 className="text-2xl font-display font-extrabold text-white mt-2">
            Notifications
          </h1>
          <p className="text-sm text-white/80 mt-1">
            {notifications.length} update{notifications.length !== 1 ? 's' : ''}
          </p>
        </motion.div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-glass rounded-2xl p-8 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🔕
            </motion.div>
            <h3 className="text-base font-display font-bold text-white">
              No Notifications Yet
            </h3>
            <p className="text-xs text-dark-400 mt-2 max-w-[240px] mx-auto leading-relaxed">
              Redeem a gift and your notifications will appear here!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                variants={item}
                className={`bg-gradient-to-r ${notif.color} border ${notif.accent} rounded-xl p-3.5 flex items-start gap-3`}
              >
                <div className="text-2xl shrink-0 mt-0.5">{notif.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{notif.title}</p>
                    <p className="text-[10px] text-dark-400 shrink-0">{formatTime(notif.time)}</p>
                  </div>
                  <p className="text-xs text-dark-300 mt-0.5 leading-relaxed">{notif.message}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
