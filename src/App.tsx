import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import BossNotification from "@/components/ui/boss-notification";
import { NotificationProvider, useNotification } from "@/contexts/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoomSearch from "./pages/RoomSearch";
import RoomDetails from "./pages/RoomDetails";
import BookingForm from "./pages/BookingForm";
import BookingConfirmation from "./pages/BookingConfirmation";
import AdminDashboard from "./pages/AdminDashboard";
import PCTSVDashboard from "./pages/PCTSVDashboard";
import SecurityCalendar from "./pages/SecurityCalendar";
import WeeklyCalendarPage from "./pages/WeeklyCalendarPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Global Notification Component
const GlobalNotification = () => {
  const { notification, hideNotification } = useNotification();
  
  return (
    <BossNotification
      type={notification.type}
      title={notification.title}
      message={notification.message}
      visible={notification.visible}
      onClose={hideNotification}
    />
  );
};

// Protected Route Component
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Role-based Dashboard Router
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "pctsv":
      return <PCTSVDashboard />;
    case "security":
      return <SecurityCalendar />;
    default:
      return <Navigate to="/" replace />;
  }
};

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rooms" element={<RoomSearch />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <BookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/confirmation"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pctsv"
              element={
                <ProtectedRoute requiredRole="pctsv">
                  <PCTSVDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/security"
              element={
                <ProtectedRoute requiredRole="security">
                  <SecurityCalendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/weekly-calendar"
              element={
                <ProtectedRoute>
                  <WeeklyCalendarPage />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <GlobalNotification />
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <NotificationProvider>
    <AppContent />
  </NotificationProvider>
);

export default App;
