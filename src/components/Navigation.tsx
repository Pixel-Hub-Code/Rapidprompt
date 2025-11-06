import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Code2, Menu, X, Sparkles } from "lucide-react";
import { SignupDialog } from "./SignupDialog";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Prompts", href: "#prompts" },
  { label: "Categories", href: "#features" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
];

interface NavigationProps {
  onNavigateToDashboard?: () => void;
}

export function Navigation({ onNavigateToDashboard }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      
      // Check if we're over a light section (Features, Blog, etc.)
      const featuresSection = document.getElementById("features");
      const blogSection = document.getElementById("blog");
      const promptsSection = document.getElementById("prompts");
      const homeSection = document.getElementById("home");
      
      // Check if we're in light sections
      const isInFeatures = featuresSection && 
        scrollY >= featuresSection.offsetTop - 100 && 
        scrollY < (featuresSection.offsetTop + featuresSection.offsetHeight);
      
      const isInBlog = blogSection && 
        scrollY >= blogSection.offsetTop - 100 && 
        scrollY < (blogSection.offsetTop + blogSection.offsetHeight);
      
      const isInPrompts = promptsSection && 
        scrollY >= promptsSection.offsetTop - 100 && 
        scrollY < (promptsSection.offsetTop + promptsSection.offsetHeight);
      
      // Check if we're in the Hero section (dark background)
      const isInHero = homeSection && 
        scrollY >= homeSection.offsetTop - 100 && 
        scrollY < (homeSection.offsetTop + homeSection.offsetHeight);
      
      // Use light theme if:
      // 1. We're in a light section (Features, Blog, Prompts), OR
      // 2. We're scrolled past the Hero section (scrollY > 100) and not in Hero, OR
      // 3. We're on a separate page (no home section exists and scrollY > 0)
      const shouldUseLightTheme = isInFeatures || isInBlog || isInPrompts || 
        (scrollY > 100 && !isInHero) || 
        (!homeSection && scrollY > 0);
      
      setIsOverLightSection(shouldUseLightTheme);
    };
    
    // Check on mount and after a short delay to ensure DOM is ready
    handleScroll();
    const timeoutId = setTimeout(handleScroll, 100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine if we should use light or dark theme
  // Use light theme (white bg, black text) when over light sections (Features, Blog, etc.)
  // Use dark theme (dark bg, white text) when over Hero section or scrolled
  const useLightTheme = isOverLightSection;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useLightTheme
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200/50"
          : isScrolled
          ? "bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button 
            onClick={() => window.location.href = "#home"}
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#8A2BE2] to-[#6EE7FF] rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className={`text-xl transition-colors duration-300 ${useLightTheme ? "text-slate-900" : "text-white"}`}>RapidPrompt</span>
              <div className={`flex items-center gap-1 text-xs transition-colors duration-300 ${useLightTheme ? "text-[#8A2BE2]" : "text-[#6EE7FF]"}`}>
                <Sparkles className="w-3 h-3" />
                <span>AI-Powered</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`transition-colors duration-200 relative group ${
                  useLightTheme 
                    ? "text-slate-700 hover:text-slate-900" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#6EE7FF] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className={useLightTheme ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100" : "text-slate-300 hover:text-white hover:bg-white/10"}
                  onClick={() => onNavigateToDashboard?.()}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className={useLightTheme ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100" : "text-slate-300 hover:text-white hover:bg-white/10"}
                  onClick={logout}
                >
                  Logout
                </Button>
                <div className={`text-sm ${useLightTheme ? "text-slate-700" : "text-slate-300"}`}>
                  {user.displayName || user.email}
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className={useLightTheme ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100" : "text-slate-300 hover:text-white hover:bg-white/10"}
                  onClick={() => setLoginDialogOpen(true)}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
                  onClick={() => setSignupDialogOpen(true)}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={useLightTheme ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className={`w-full sm:w-80 ${
                useLightTheme
                  ? "bg-white border-slate-200"
                  : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition-colors duration-200 py-2 border-b ${
                      useLightTheme
                        ? "text-slate-700 hover:text-slate-900 border-slate-200 hover:border-[#8A2BE2]"
                        : "text-slate-300 hover:text-white border-slate-800 hover:border-[#6EE7FF]"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-6">
                  {user ? (
                    <>
                      <div className={`text-sm text-center py-2 ${useLightTheme ? "text-slate-700" : "text-slate-300"}`}>
                        {user.displayName || user.email}
                      </div>
                      <Button
                        variant="outline"
                        className={`w-full ${
                          useLightTheme
                            ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                            : "border-slate-700 text-white hover:bg-white/10"
                        }`}
                        onClick={() => {
                          setIsOpen(false);
                          onNavigateToDashboard?.();
                        }}
                      >
                        Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        className={`w-full ${
                          useLightTheme
                            ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                            : "border-slate-700 text-white hover:bg-white/10"
                        }`}
                        onClick={() => {
                          setIsOpen(false);
                          logout();
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className={`w-full ${
                          useLightTheme
                            ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                            : "border-slate-700 text-white hover:bg-white/10"
                        }`}
                        onClick={() => {
                          setIsOpen(false);
                          setLoginDialogOpen(true);
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white"
                        onClick={() => {
                          setIsOpen(false);
                          setSignupDialogOpen(true);
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SignupDialog 
        open={signupDialogOpen} 
        onOpenChange={setSignupDialogOpen}
        defaultTab="email"
        onSuccess={() => {
          // Small delay to ensure auth state is updated
          setTimeout(() => {
            onNavigateToDashboard?.();
          }, 500);
        }}
      />
      <SignupDialog 
        open={loginDialogOpen} 
        onOpenChange={setLoginDialogOpen}
        defaultTab="email"
        initialMode="login"
        onSuccess={() => {
          // Small delay to ensure auth state is updated
          setTimeout(() => {
            onNavigateToDashboard?.();
          }, 500);
        }}
      />
    </nav>
  );
}
