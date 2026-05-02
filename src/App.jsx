import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
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
import QuickNav from './components/QuickNav';
import ProfileScreen from './components/ProfileScreen';
import RewardsScreen from './components/RewardsScreen';
import BannerPage from './components/BannerPage';
import NotificationsScreen from './components/NotificationsScreen';
import OrderHistoryScreen from './components/OrderHistoryScreen';
import DeliveryAddressScreen from './components/DeliveryAddressScreen';
import EarnPointsScreen from './components/EarnPointsScreen';
import SupportScreen from './components/SupportScreen';
import TermsScreen from './components/TermsScreen';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Redemptions from './admin/Redemptions';
import RedemptionDetail from './admin/RedemptionDetail';
import BulkUpload from './admin/BulkUpload';
import useAppStore from './store/useAppStore';

function CataloguePage() {
  return (
    <>
      <Header />
      <HeroBanner />
      <QuickNav />
      <SearchBar />
      <CategoryFilter />
      <GiftGrid />
    </>
  );
}

function AdminRoutes() {
  useEffect(() => {
    document.body.classList.add('admin-mode');
    document.getElementById('root').classList.add('admin-root');
    return () => {
      document.body.classList.remove('admin-mode');
      document.getElementById('root').classList.remove('admin-root');
    };
  }, []);

  return (
    <AdminLayout>
      <Switch>
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/dashboard" component={Dashboard} />
        <Route exact path="/admin/redemptions" component={Redemptions} />
        <Route path="/admin/redemptions/:id" component={RedemptionDetail} />
        <Route exact path="/admin/bulk-upload" component={BulkUpload} />
      </Switch>
    </AdminLayout>
  );
}

export default function App() {
  const location = useLocation();
  const syncOrders = useAppStore((s) => s.syncOrders);

  useEffect(() => {
    syncOrders();
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={SplashScreen} />
      <Route exact path="/home" component={CataloguePage} />
      <Route path="/gift/:id" component={GiftDetail} />
      <Route exact path="/celebrate" component={RedemptionCelebration} />
      <Route exact path="/tracking" component={TrackingScreen} />
      <Route exact path="/delivered" component={DeliverySuccess} />
      <Route exact path="/profile" component={ProfileScreen} />
      <Route exact path="/rewards" component={RewardsScreen} />
      <Route exact path="/notifications" component={NotificationsScreen} />
      <Route exact path="/orders" component={OrderHistoryScreen} />
      <Route exact path="/address" component={DeliveryAddressScreen} />
      <Route exact path="/earn" component={EarnPointsScreen} />
      <Route exact path="/support" component={SupportScreen} />
      <Route exact path="/terms" component={TermsScreen} />
      <Route path="/banner/:type" component={BannerPage} />
      <Route path="/admin" component={AdminRoutes} />
    </Switch>
  );
}
