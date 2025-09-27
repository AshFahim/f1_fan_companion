import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { 
  Home, 
  Target, 
  Trophy, 
  Flame, 
  Newspaper, 
  Users, 
  BarChart3, 
  Settings, 
  User, 
  Bell,
  Sun,
  Moon,
  ChevronUp
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, shortLabel: 'Home' },
  { id: 'predict', label: 'Predict', icon: Target, shortLabel: 'Predict' },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, shortLabel: 'Rankings' },
  { id: 'streaks', label: 'Streaks', icon: Flame, shortLabel: 'Streaks' },
  { id: 'news', label: 'F1 Pulse', icon: Newspaper, shortLabel: 'News' },
  { id: 'drivers', label: 'Drivers', icon: Users, shortLabel: 'Drivers' },
  { id: 'compare', label: 'StatTest', icon: BarChart3, shortLabel: 'Compare' },
  { id: 'alerts', label: 'Alerts', icon: Bell, shortLabel: 'Alerts' },
  { id: 'account', label: 'Profile', icon: User, shortLabel: 'Profile' },
  { id: 'settings', label: 'Settings', icon: Settings, shortLabel: 'Settings' },
];

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  teamTheme: any;
  isMobile: boolean;
}

export function Navigation({ currentPage, onNavigate, teamTheme, isMobile }: NavigationProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for mobile navigation styling
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Bottom Navigation */}
        <div className={`
          fixed bottom-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? 'transform translate-y-0' : ''}
          safe-area-bottom
        `}>
          <Card className="rounded-t-3xl rounded-b-none border-t border-x-0 border-b-0 glass-card shadow-2xl">
            <div className="p-2">
              {/* Main Navigation */}
              <div className="flex justify-around items-center">
                {navItems.slice(0, 5).map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`
                        flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 relative card-interactive
                        min-h-[var(--touch-target-lg)] min-w-[var(--touch-target-lg)]
                        ${isActive 
                          ? 'text-white transform scale-105' 
                          : 'text-muted-foreground hover:text-foreground active:scale-95'
                        }
                      `}
                      style={isActive ? { 
                        backgroundColor: teamTheme?.primary,
                        boxShadow: `0 4px 20px rgba(${teamTheme?.rgb}, 0.4)`
                      } : {}}
                    >
                      <div className="relative">
                        <Icon className="h-5 w-5" />
                        {item.id === 'streaks' && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <span className="text-xs font-medium leading-tight">
                        {item.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Floating Action Button - More Menu */}
        <div className="fixed bottom-24 right-4 z-40">
          <div className="flex flex-col gap-3">
            {/* Scroll to Top */}
            {isScrolled && (
              <Button
                onClick={scrollToTop}
                size="sm"
                className="w-12 h-12 rounded-full glass-card border-0 shadow-lg animate-fade-in-up"
                style={{ 
                  backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)`,
                  backdropFilter: 'blur(16px)'
                }}
              >
                <ChevronUp className="h-5 w-5" style={{ color: teamTheme?.primary }} />
              </Button>
            )}

            {/* Theme Toggle */}
            <Button 
              onClick={toggleDarkMode}
              size="sm"
              className="w-12 h-12 rounded-full glass-card border-0 shadow-lg"
              style={{ 
                backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)`,
                backdropFilter: 'blur(16px)'
              }}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-500" />
              )}
            </Button>
          </div>
        </div>

        {/* Secondary Navigation Overlay */}
        {['alerts', 'account', 'settings', 'compare'].includes(currentPage) && (
          <div className="fixed top-4 right-4 z-40">
            <Card className="glass-card border-0 shadow-lg">
              <div className="p-2 flex gap-1">
                {navItems.slice(5).map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`
                        p-2 rounded-xl transition-all duration-300
                        min-h-[var(--touch-target)] min-w-[var(--touch-target)]
                        ${isActive 
                          ? 'text-white' 
                          : 'text-muted-foreground hover:text-foreground active:scale-95'
                        }
                      `}
                      style={isActive ? { 
                        backgroundColor: teamTheme?.primary,
                        boxShadow: `0 2px 8px rgba(${teamTheme?.rgb}, 0.3)`
                      } : {}}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar Navigation
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-50">
      <Card className="flex-1 m-4 border-0 shadow-2xl glass-card">
        <div className="p-6 space-y-6">
          {/* Premium Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold gradient-text ensure-contrast">
                  🏁 F1 Fan Companion
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Your premium F1 experience
                </p>
              </div>
              
              {/* Premium Theme Toggle */}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleDarkMode}
                className="rounded-xl p-3 hover:bg-accent/50 transition-all duration-300 glass-card"
                style={{ borderColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-500" />
                )}
              </Button>
            </div>

            {/* Premium Team Accent Line */}
            <div 
              className="h-1 rounded-full"
              style={{ 
                background: teamTheme?.gradient,
                boxShadow: `0 2px 8px rgba(${teamTheme?.rgb}, 0.3)`
              }}
            />
          </div>
          
          {/* Premium Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group relative
                    min-h-[var(--touch-target)]
                    ${isActive 
                      ? 'text-white shadow-xl' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }
                  `}
                  style={isActive ? { 
                    backgroundColor: teamTheme?.primary,
                    boxShadow: `0 8px 32px rgba(${teamTheme?.rgb}, 0.4)`
                  } : {}}
                >
                  <Icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : ''
                  }`} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.id === 'streaks' && (
                    <Badge 
                      className="ml-auto text-xs px-2 py-1 bg-orange-500/20 text-orange-500 border-orange-500/30 rounded-lg font-semibold"
                    >
                      12
                    </Badge>
                  )}
                  {isActive && (
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Premium Team Branding Footer */}
          <div 
            className="mt-auto p-4 rounded-xl border glass-card"
            style={{ 
              background: `linear-gradient(135deg, rgba(${teamTheme?.rgb}, 0.08) 0%, rgba(${teamTheme?.rgb}, 0.03) 100%)`,
              borderColor: `rgba(${teamTheme?.rgb}, 0.2)`
            }}
          >
            <div className="text-center space-y-2">
              <div className="text-xs text-muted-foreground">Supporting</div>
              <div 
                className="text-sm font-semibold"
                style={{ color: teamTheme?.primary }}
              >
                {teamTheme?.name}
              </div>
              <div className="flex justify-center">
                <div 
                  className="w-12 h-1 rounded-full"
                  style={{ background: teamTheme?.gradient }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}