import { create } from 'zustand';

const useAppStore = create((set) => ({
  userPoints: 50000,
  selectedGift: null,
  category: 'all',
  searchQuery: '',
  activeTab: 'home',
  redemptionHistory: [],
  lastRedemption: null,

  setSelectedGift: (gift) => set({ selectedGift: gift }),
  setCategory: (category) => set({ category }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveTab: (activeTab) => set({ activeTab }),

  redeemGift: (gift, backendData) =>
    set((state) => ({
      userPoints: state.userPoints - gift.points,
      selectedGift: gift,
      lastRedemption: backendData || null,
      redemptionHistory: [
        {
          name: gift.name,
          image: gift.image,
          points: gift.points,
          color: gift.color,
          timestamp: Date.now(),
          orderId: backendData?.order_id || null,
          docketNumber: backendData?.docket_number || null,
          otp: backendData?.otp || null,
          redemptionId: backendData?.id || null,
          status: backendData?.status || 'redeemed',
        },
        ...state.redemptionHistory,
      ],
    })),
}));

export default useAppStore;
