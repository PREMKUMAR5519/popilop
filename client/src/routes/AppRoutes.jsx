import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage';
import FeaturesPage from '../pages/FeaturesPage';
import PricingPage from '../pages/PricingPage';
import CreatorProfilePage from '../pages/CreatorProfilePage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import NotFoundPage from '../pages/NotFoundPage';
import UsernameSetupPage from '../pages/UsernameSetupPage';
import OverviewPage from '../pages/dashboard/OverviewPage';
import LandingBuilderPage from '../pages/dashboard/LandingBuilderPage';
import LinksPage from '../pages/dashboard/LinksPage';
import InstagramPage from '../pages/dashboard/InstagramPage';
import CrmPage from '../pages/dashboard/CrmPage';
import LeadDetailPage from '../pages/dashboard/LeadDetailPage';
import SchedulerPage from '../pages/dashboard/SchedulerPage';
import CalendarPage from '../pages/dashboard/CalendarPage';
import AutomationsPage from '../pages/dashboard/AutomationsPage';
import ProductsPage from '../pages/dashboard/ProductsPage';
import ProductEditorPage from '../pages/dashboard/ProductEditorPage';
import OrdersPage from '../pages/dashboard/OrdersPage';
import AffiliateLinksPage from '../pages/dashboard/AffiliateLinksPage';
import AnalyticsPage from '../pages/dashboard/AnalyticsPage';
import AudiencePage from '../pages/dashboard/AudiencePage';
import SettingsPage from '../pages/dashboard/SettingsPage';
import ProfileCustomizationPage from '../pages/dashboard/ProfileCustomizationPage';
import MediaLibraryPage from '../pages/dashboard/MediaLibraryPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminCreatorDetailPage from '../pages/admin/AdminCreatorDetailPage';
import ProductModerationPage from '../pages/admin/ProductModerationPage';
import PlatformAnalyticsPage from '../pages/admin/PlatformAnalyticsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/creator/:slug" element={<CreatorProfilePage />} />
        <Route path="/:slug" element={<CreatorProfilePage />} />
        <Route path="/product/:slug" element={<ProductDetailsPage />} />
        <Route path="/checkout/:slug" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Username setup — protected but no dashboard shell */}
      <Route element={<ProtectedRoute roles={['creator', 'admin']} />}>
        <Route path="/username-setup" element={<UsernameSetupPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={['creator']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/app" element={<OverviewPage />} />
          <Route path="/app/page-builder" element={<LandingBuilderPage />} />
          <Route path="/app/links" element={<LinksPage />} />
          <Route path="/app/instagram" element={<InstagramPage />} />
          <Route path="/app/crm" element={<CrmPage />} />
          <Route path="/app/crm/:leadId" element={<LeadDetailPage />} />
          <Route path="/app/scheduler" element={<SchedulerPage />} />
          <Route path="/app/calendar" element={<CalendarPage />} />
          <Route path="/app/automations" element={<AutomationsPage />} />
          <Route path="/app/products" element={<ProductsPage />} />
          <Route path="/app/products/new" element={<ProductEditorPage />} />
          <Route path="/app/orders" element={<OrdersPage />} />
          <Route path="/app/affiliate-links" element={<AffiliateLinksPage />} />
          <Route path="/app/analytics" element={<AnalyticsPage />} />
          <Route path="/app/audience" element={<AudiencePage />} />
          <Route path="/app/settings" element={<SettingsPage />} />
          <Route path="/app/profile-customization" element={<ProfileCustomizationPage />} />
          <Route path="/app/media-library" element={<MediaLibraryPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route element={<DashboardLayout admin />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/creator-detail" element={<AdminCreatorDetailPage />} />
          <Route path="/admin/product-moderation" element={<ProductModerationPage />} />
          <Route path="/admin/platform-analytics" element={<PlatformAnalyticsPage />} />
        </Route>
      </Route>

      <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
