import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createRedemption } from './services/api';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import GiftGrid from './components/GiftGrid';
import GiftDetail from './components/GiftDetail';
import RedemptionCelebration from './components/RedemptionCelebration';
import TrackingScreen from './components/TrackingScreen';
import DeliverySuccess from './components/DeliverySuccess';
import BottomNav from './components/BottomNav';
import ProfileScreen from './components/ProfileScreen';
import RewardsScreen from './components/RewardsScreen';
import BannerPage from './components/BannerPage';
import NotificationsScreen from './components/NotificationsScreen';

// App screens
const SCREENS = {
  SPLASH: 'splash',
  CATALOGUE: 'catalogue',
  GIFT_DETAIL: 'gift_detail',
  CELEBRATION: 'celebration',
  TRACKING: 'tracking',
  DELIVERY_SUCCESS: 'delivery_success',
  PROFILE: 'profile',
  REWARDS: 'rewards',
  BANNER_PREMIUM: 'banner_premium',
  BANNER_TOOLS: 'banner_tools',
  BANNER_NEW_ARRIVALS: 'banner_new_arrivals',
  NOTIFICATIONS: 'notifications',
};

const BANNER_SCREEN_MAP = {
  premium: SCREENS.BANNER_PREMIUM,
  tools: SCREENS.BANNER_TOOLS,
  new_arrivals: SCREENS.BANNER_NEW_ARRIVALS,
};

const BANNER_TYPE_MAP = {
  [SCREENS.BANNER_PREMIUM]: 'premium',
  [SCREENS.BANNER_TOOLS]: 'tools',
  [SCREENS.BANNER_NEW_ARRIVALS]: 'new_arrivals',
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SPLASH);
  const [prevScreen, setPrevScreen] = useState(null);
  const [userPoints, setUserPoints] = useState(50000); // Demo: generous points
  const [selectedGift, setSelectedGift] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [redemptionHistory, setRedemptionHistory] = useState([]);

  const handleSplashComplete = useCallback(() => {
    setScreen(SCREENS.CATALOGUE);
  }, []);

  const handleGiftSelect = useCallback((gift) => {
    setPrevScreen(screen);
    setSelectedGift(gift);
    setScreen(SCREENS.GIFT_DETAIL);
  }, [screen]);

  const handleGiftClose = useCallback(() => {
    setSelectedGift(null);
    setScreen(prevScreen && prevScreen !== SCREENS.GIFT_DETAIL ? prevScreen : SCREENS.CATALOGUE);
  }, [prevScreen]);

  const handleRedeem = useCallback((gift) => {
    setUserPoints(prev => prev - gift.points);
    setRedemptionHistory(prev => [
      {
        name: gift.name,
        image: gift.image,
        points: gift.points,
        color: gift.color,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
    setSelectedGift(gift);
    setScreen(SCREENS.CELEBRATION);

    // Fire-and-forget: notify backend (non-blocking)
    createRedemption(gift.id);
  }, []);

  const handleCelebrationContinue = useCallback(() => {
    setScreen(SCREENS.TRACKING);
  }, []);

  const handleTrackingComplete = useCallback(() => {
    setScreen(SCREENS.DELIVERY_SUCCESS);
  }, []);

  const handleBackToCatalogue = useCallback(() => {
    setSelectedGift(null);
    setScreen(SCREENS.CATALOGUE);
    setActiveTab('home');
  }, []);

  const handleTabSelect = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'profile') {
      setScreen(SCREENS.PROFILE);
    } else if (tab === 'rewards') {
      setScreen(SCREENS.REWARDS);
    } else {
      setScreen(SCREENS.CATALOGUE);
    }
  }, []);

  const handleProfileClose = useCallback(() => {
    setScreen(SCREENS.CATALOGUE);
    setActiveTab('home');
  }, []);

  const handleBannerClick = useCallback((bannerId) => {
    const targetScreen = BANNER_SCREEN_MAP[bannerId];
    if (targetScreen) {
      setScreen(targetScreen);
    }
  }, []);

  const handleBannerBack = useCallback(() => {
    setScreen(SCREENS.CATALOGUE);
    setActiveTab('home');
  }, []);

  const isBannerScreen = screen === SCREENS.BANNER_PREMIUM ||
    screen === SCREENS.BANNER_TOOLS ||
    screen === SCREENS.BANNER_NEW_ARRIVALS;

  return (
    <div className="min-h-screen bg-dark-950 relative">
      <AnimatePresence mode="wait">
        {/* Splash Screen */}
        {screen === SCREENS.SPLASH && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}

        {/* Main Catalogue */}
        {screen === SCREENS.CATALOGUE && (
          <div key="catalogue">
            <Header
              userPoints={userPoints}
              onProfileClick={() => setScreen(SCREENS.PROFILE)}
              onNotificationsClick={() => setScreen(SCREENS.NOTIFICATIONS)}
              notificationCount={redemptionHistory.length * 4}
            />
            <HeroBanner onBannerClick={handleBannerClick} />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <CategoryFilter selected={category} onSelect={setCategory} />
            <GiftGrid
              category={category}
              onSelect={handleGiftSelect}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {/* Gift Detail */}
        {screen === SCREENS.GIFT_DETAIL && selectedGift && (
          <GiftDetail
            key="detail"
            gift={selectedGift}
            onClose={handleGiftClose}
            onRedeem={handleRedeem}
            userPoints={userPoints}
          />
        )}

        {/* Redemption Celebration */}
        {screen === SCREENS.CELEBRATION && selectedGift && (
          <RedemptionCelebration
            key="celebration"
            gift={selectedGift}
            onContinue={handleCelebrationContinue}
          />
        )}

        {/* Live Tracking */}
        {screen === SCREENS.TRACKING && selectedGift && (
          <TrackingScreen
            key="tracking"
            gift={selectedGift}
            onComplete={handleTrackingComplete}
          />
        )}

        {/* Delivery Success */}
        {screen === SCREENS.DELIVERY_SUCCESS && selectedGift && (
          <DeliverySuccess
            key="success"
            gift={selectedGift}
            onBackToCatalogue={handleBackToCatalogue}
          />
        )}

        {/* Profile */}
        {screen === SCREENS.PROFILE && (
          <ProfileScreen
            key="profile"
            userPoints={userPoints}
            onClose={handleProfileClose}
          />
        )}

        {/* Rewards / Points History */}
        {screen === SCREENS.REWARDS && (
          <RewardsScreen
            key="rewards"
            userPoints={userPoints}
            redemptionHistory={redemptionHistory}
            activeTab={activeTab}
            onTabSelect={handleTabSelect}
          />
        )}

        {/* Notifications */}
        {screen === SCREENS.NOTIFICATIONS && (
          <NotificationsScreen
            key="notifications"
            redemptionHistory={redemptionHistory}
            onBack={() => {
              setScreen(SCREENS.CATALOGUE);
              setActiveTab('home');
            }}
          />
        )}

        {/* Banner Pages */}
        {isBannerScreen && (
          <BannerPage
            key={screen}
            pageType={BANNER_TYPE_MAP[screen]}
            onBack={handleBannerBack}
            onGiftSelect={handleGiftSelect}
          />
        )}
      </AnimatePresence>

      {/* Bottom Nav - visible on all main screens */}
      {screen !== SCREENS.SPLASH &&
        screen !== SCREENS.GIFT_DETAIL &&
        screen !== SCREENS.CELEBRATION &&
        screen !== SCREENS.TRACKING &&
        screen !== SCREENS.DELIVERY_SUCCESS && (
          <BottomNav active={activeTab} onSelect={handleTabSelect} />
        )}
    </div>
  );
}
