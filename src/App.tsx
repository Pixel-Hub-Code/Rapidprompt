import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { TopPrompts } from "./components/TopPrompts";
import { Blog } from "./components/Blog";
import { Footer } from "./components/Footer";
import { AllPrompts } from "./components/pages/AllPrompts";
import { AllArticles } from "./components/pages/AllArticles";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { Dashboard } from "./components/pages/Dashboard";
import { BlogPost } from "./components/pages/BlogPost";

type Page = "home" | "all-prompts" | "all-articles" | "login" | "signup" | "dashboard" | "blog-post";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateToHome = () => setCurrentPage("home");
  const navigateToAllPrompts = () => setCurrentPage("all-prompts");
  const navigateToAllArticles = () => setCurrentPage("all-articles");
  const navigateToLogin = () => setCurrentPage("login");
  const navigateToSignup = () => setCurrentPage("signup");
  const navigateToDashboard = () => setCurrentPage("dashboard");
  const navigateToBlogPost = () => setCurrentPage("blog-post");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  // Login Page
  if (currentPage === "login") {
    return (
      <>
        <Login
          onNavigateToSignup={navigateToSignup}
          onNavigateToHome={navigateToHome}
          onLoginSuccess={handleLogin}
        />
        <Toaster />
      </>
    );
  }

  // Signup Page
  if (currentPage === "signup") {
    return (
      <>
        <Signup
          onNavigateToLogin={navigateToLogin}
          onNavigateToHome={navigateToHome}
          onSignupSuccess={handleSignup}
        />
        <Toaster />
      </>
    );
  }

  // Dashboard Page
  if (currentPage === "dashboard") {
    return (
      <div className="min-h-screen">
        <Navigation 
          onNavigateToLogin={navigateToLogin}
          onNavigateToDashboard={navigateToDashboard}
          isLoggedIn={isLoggedIn}
        />
        <Dashboard onNavigateToHome={navigateToHome} onLogout={handleLogout} />
        <Footer onNavigateToHome={navigateToHome} />
        <Toaster />
      </div>
    );
  }

  // Blog Post Page
  if (currentPage === "blog-post") {
    return (
      <div className="min-h-screen">
        <Navigation 
          onNavigateToLogin={navigateToLogin}
          onNavigateToDashboard={navigateToDashboard}
          isLoggedIn={isLoggedIn}
        />
        <BlogPost onBack={navigateToAllArticles} />
        <Footer onNavigateToHome={navigateToHome} />
        <Toaster />
      </div>
    );
  }

  // All Prompts Page
  if (currentPage === "all-prompts") {
    return (
      <div className="min-h-screen">
        <Navigation 
          onNavigateToLogin={navigateToLogin}
          onNavigateToDashboard={navigateToDashboard}
          isLoggedIn={isLoggedIn}
        />
        <AllPrompts onBack={navigateToHome} />
        <Footer onNavigateToHome={navigateToHome} />
        <Toaster />
      </div>
    );
  }

  // All Articles Page
  if (currentPage === "all-articles") {
    return (
      <div className="min-h-screen">
        <Navigation 
          onNavigateToLogin={navigateToLogin}
          onNavigateToDashboard={navigateToDashboard}
          isLoggedIn={isLoggedIn}
        />
        <AllArticles 
          onBack={navigateToHome}
          onNavigateToBlogPost={navigateToBlogPost}
        />
        <Footer onNavigateToHome={navigateToHome} />
        <Toaster />
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen">
      <Navigation 
        onNavigateToLogin={navigateToLogin}
        onNavigateToDashboard={navigateToDashboard}
        isLoggedIn={isLoggedIn}
      />
      <Hero onNavigateToPrompts={navigateToAllPrompts} />
      <Features />
      <TopPrompts onNavigateToAll={navigateToAllPrompts} />
      <Blog 
        onNavigateToAll={navigateToAllArticles}
        onNavigateToBlogPost={navigateToBlogPost}
      />
      <Footer onNavigateToHome={navigateToHome} />
      <Toaster />
    </div>
  );
}
