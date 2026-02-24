import { motion, AnimatePresence } from 'framer-motion';
import GiftCard from './GiftCard';
import { getGiftsByCategory } from '../data/gifts';

export default function GiftGrid({ category, onSelect, searchQuery }) {
  let filteredGifts = getGiftsByCategory(category);

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredGifts = filteredGifts.filter(
      g => g.name.toLowerCase().includes(query) || g.description.toLowerCase().includes(query)
    );
  }

  return (
    <div className="px-4 pb-24">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white">
          {searchQuery ? 'Search Results' : 'Gift Catalogue'}
        </h2>
        <span className="text-xs text-dark-400">{filteredGifts.length} gifts</span>
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredGifts.map((gift, index) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              index={index}
              onSelect={onSelect}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredGifts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <span className="text-5xl">🔍</span>
          <p className="text-dark-400 mt-3 text-sm">No gifts found</p>
          <p className="text-dark-500 text-xs mt-1">Try a different search or category</p>
        </motion.div>
      )}
    </div>
  );
}
