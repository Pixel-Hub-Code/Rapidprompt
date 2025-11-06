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

type Page = "home" | "all-prompts" | "all-articles";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigateToAllPrompts = () => setCurrentPage("all-prompts");
  const navigateToAllArticles = () => setCurrentPage("all-articles");
  const navigateToHome = () => setCurrentPage("home");

  if (currentPage === "all-prompts") {
    return (
      <div className="min-h-screen">
        <Navigation />
        <AllPrompts onBack={navigateToHome} />
        <Footer />
        <Toaster />
      </div>
    );
  }

  if (currentPage === "all-articles") {
    return (
      <div className="min-h-screen">
        <Navigation />
        <AllArticles onBack={navigateToHome} />
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <TopPrompts onNavigateToAll={navigateToAllPrompts} />
      <Blog onNavigateToAll={navigateToAllArticles} />
      <Footer />
      <Toaster />
    </div>
  );
}
