import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="px-4 pt-3">
      <motion.div
        animate={{
          borderColor: focused ? 'rgba(251, 146, 60, 0.3)' : 'rgba(255, 255, 255, 0.05)',
          boxShadow: focused ? '0 0 20px rgba(251, 146, 60, 0.1)' : '0 0 0px rgba(0,0,0,0)',
        }}
        className="relative bg-dark-800/60 backdrop-blur-xl border rounded-2xl overflow-hidden"
      >
        <div className="flex items-center px-4 py-3">
          <motion.span
            animate={{ scale: focused ? 1.2 : 1 }}
            className="text-dark-400 mr-3"
          >
            🔍
          </motion.span>
          <input
            type="text"
            placeholder="Search gifts, tools, gadgets..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent text-sm text-white placeholder-dark-500 outline-none"
          />
          {value && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => onChange('')}
              className="text-dark-400 text-xs bg-dark-700 rounded-full w-5 h-5 flex items-center justify-center"
            >
              ✕
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
