import { create } from 'zustand';
import { fetchMyOrders } from '../services/api';

const useAppStore = create((set, get) => ({
  userPoints: 50000,
  selectedGift: null,
  category: 'all',
  searchQuery: '',
  activeTab: 'home',
  redemptionHistory: [],
  lastRedemption: null,
  ordersLoaded: false,

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

  syncOrders: async () => {
    try {
      const orders = await fetchMyOrders();
      const totalSpent = orders.reduce((sum, o) => sum + o.points_spent, 0);
      set({
        redemptionHistory: orders.map((o) => ({
          name: o.gift_name,
          image: o.gift_image,
          points: o.points_spent,
          color: o.gift_color,
          timestamp: new Date(o.created_at).getTime(),
          orderId: o.order_id,
          docketNumber: o.docket_number,
          otp: o.otp,
          redemptionId: o.id,
          status: o.status,
          updatedAt: o.updated_at,
          category: o.gift_category,
        })),
        userPoints: 50000 - totalSpent,
        ordersLoaded: true,
      });
    } catch {
      set({ ordersLoaded: true });
    }
  },
}));

export default useAppStore;
