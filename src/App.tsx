import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { TopPrompts } from "./components/TopPrompts";
import { Blog } from "./components/Blog";
import { Footer } from "./components/Footer";
import { AllPrompts } from "./components/pages/AllPrompts";
import { AllArticles } from "./components/pages/AllArticles";
import { Categories } from "./components/pages/Categories";
import { Dashboard } from "./components/pages/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

type Page = "home" | "all-prompts" | "all-articles" | "categories" | "dashboard";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const { user } = useAuth();

  const navigateToAllPrompts = () => setCurrentPage("all-prompts");
  const navigateToAllArticles = () => setCurrentPage("all-articles");
  const navigateToCategories = () => setCurrentPage("categories");
  const navigateToHome = () => setCurrentPage("home");
  const navigateToDashboard = () => setCurrentPage("dashboard");

  // Redirect to dashboard if user is logged in and on home page
  useEffect(() => {
    if (user && currentPage === "home") {
      // Don't auto-redirect, let user navigate manually
    }
  }, [user, currentPage]);

  if (currentPage === "dashboard") {
    return (
      <div className="min-h-screen">
        <Navigation onNavigateToDashboard={navigateToDashboard} currentPage={currentPage} />
        <Footer />
        <Toaster />
      </div>
    );
  }

  if (currentPage === "all-prompts") {
    return (
      <div className="min-h-screen">
        <Navigation onNavigateToDashboard={navigateToDashboard} />
        <AllPrompts onBack={navigateToHome} />
        <Footer />
        <Toaster />
      </div>
    );
  }

  if (currentPage === "all-articles") {
    return (
      <div className="min-h-screen">
        <Navigation onNavigateToDashboard={navigateToDashboard} />
        <AllArticles onBack={navigateToHome} />
        <Footer />
        <Toaster />
      </div>
    );
  }

  if (currentPage === "categories") {
    return (
      <div className="min-h-screen">
        <Navigation onNavigateToDashboard={navigateToDashboard} />
        <Categories onBack={navigateToHome} />
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation onNavigateToDashboard={navigateToDashboard} />
      <Hero onNavigateToDashboard={navigateToDashboard} />
      <Features onNavigateToCategories={navigateToCategories} />
      <TopPrompts onNavigateToAll={navigateToAllPrompts} />
      <Blog onNavigateToAll={navigateToAllArticles} />
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
