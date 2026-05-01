import { create } from 'zustand';

const useAppStore = create((set) => ({
  userPoints: 50000,
  selectedGift: null,
  category: 'all',
  searchQuery: '',
  activeTab: 'home',
  redemptionHistory: [],

  setSelectedGift: (gift) => set({ selectedGift: gift }),
  setCategory: (category) => set({ category }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveTab: (activeTab) => set({ activeTab }),

  redeemGift: (gift) =>
    set((state) => ({
      userPoints: state.userPoints - gift.points,
      selectedGift: gift,
      redemptionHistory: [
        {
          name: gift.name,
          image: gift.image,
          points: gift.points,
          color: gift.color,
          timestamp: Date.now(),
        },
        ...state.redemptionHistory,
      ],
    })),
}));

export default useAppStore;
