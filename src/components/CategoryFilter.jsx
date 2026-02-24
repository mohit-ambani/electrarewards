import { motion } from 'framer-motion';
import { giftCategories } from '../data/gifts';
import { useRef } from 'react';

export default function CategoryFilter({ selected, onSelect }) {
  const scrollRef = useRef(null);

  return (
    <div className="px-4 pt-5 pb-2">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {giftCategories.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
              selected === cat.id
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30'
                : 'bg-dark-800/80 text-dark-300 border border-white/5 hover:border-brand-500/30'
            }`}
          >
            <span className="text-sm">{cat.icon}</span>
            {cat.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
