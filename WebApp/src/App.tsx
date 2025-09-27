import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Predict } from './components/Predict';
import { Leaderboard } from './components/Leaderboard';
import { Streaks } from './components/Streaks';
import { News } from './components/News';
import { Drivers } from './components/Drivers';
import { DriverProfile } from './components/DriverProfile';
import { Compare } from './components/Compare';
import { Settings } from './components/Settings';
import { Account } from './components/Account';
import { Alerts } from './components/Alerts';
import { Login } from './components/Login';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './components/ThemeProvider';
import { F1Teams } from './components/data/teams';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('red-bull');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'F1 Fan',
    points: 1247,
    streak: 12,
    level: 3,
    predictions: [],
    country: 'US',
    isAuthenticated: false
  });

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll on mobile when navigation is open
  useEffect(() => {
    if (isMobile) {
      document.body.style.touchAction = 'manipulation';
    }
  }, [isMobile]);

  // Get team theme for theming
  const teamTheme = F1Teams.find(team => team.id === selectedTeam);

  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
  };

  const handleLogin = (user: any) => {
    setUserProfile(user);
    setIsAuthenticated(true);
  };

  const handleGuest = () => {
    setUserProfile(prev => ({ ...prev, isAuthenticated: false }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    setUserProfile({
      name: 'F1 Fan',
      points: 1247,
      streak: 12,
      level: 3,
      predictions: [],
      country: 'US',
      isAuthenticated: false
    });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    
    // Smooth scroll to top on page change for mobile
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    const commonProps = {
      teamTheme,
      userProfile,
      onNavigate: handleNavigate,
      isMobile
    };

    switch (currentPage) {
      case 'home':
        return (
          <div className="animate-fade-in-up">
            <Home 
              {...commonProps}
              onNavigate={setCurrentPage} 
            />
          </div>
        );
      case 'predict':
        return (
          <div className="animate-fade-in-up">
            <Predict 
              {...commonProps}
              setUserProfile={setUserProfile} 
            />
          </div>
        );
      case 'leaderboard':
        return (
          <div className="animate-fade-in-up">
            <Leaderboard {...commonProps} />
          </div>
        );
      case 'streaks':
        return (
          <div className="animate-fade-in-up">
            <Streaks 
              {...commonProps}
              setUserProfile={setUserProfile} 
            />
          </div>
        );
      case 'news':
        return (
          <div className="animate-fade-in-up">
            <News {...commonProps} />
          </div>
        );
      case 'drivers':
        return (
          <div className="animate-fade-in-up">
            <Drivers 
              {...commonProps}
              onDriverSelect={(driver) => {
                setSelectedDriver(driver);
                setCurrentPage('driver-profile');
              }} 
            />
          </div>
        );
      case 'driver-profile':
        return (
          <div className="animate-slide-in-right">
            <DriverProfile 
              {...commonProps}
              driver={selectedDriver} 
              onBack={() => setCurrentPage('drivers')} 
            />
          </div>
        );
      case 'compare':
        return (
          <div className="animate-fade-in-up">
            <Compare {...commonProps} />
          </div>
        );
      case 'settings':
        return (
          <div className="animate-fade-in-up">
            <Settings 
              {...commonProps}
              selectedTeam={selectedTeam} 
              setSelectedTeam={handleTeamChange} 
            />
          </div>
        );
      case 'account':
        return (
          <div className="animate-fade-in-up">
            <Account 
              {...commonProps}
              setUserProfile={setUserProfile} 
              onLogout={handleLogout} 
            />
          </div>
        );
      case 'alerts':
        return (
          <div className="animate-fade-in-up">
            <Alerts {...commonProps} />
          </div>
        );
      default:
        return (
          <div className="animate-fade-in-up">
            <Home 
              {...commonProps}
              onNavigate={setCurrentPage} 
            />
          </div>
        );
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider teamTheme={teamTheme} setTeamTheme={handleTeamChange}>
        <div className="safe-area-top safe-area-bottom">
          <Login 
            onLogin={handleLogin} 
            onGuest={handleGuest}
            teamTheme={teamTheme}
            isMobile={isMobile}
          />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider teamTheme={teamTheme} setTeamTheme={handleTeamChange}>
      <div className="min-h-screen bg-background transition-colors duration-300 safe-area-top">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar Navigation */}
          <Navigation 
            currentPage={currentPage} 
            onNavigate={handleNavigate}
            teamTheme={teamTheme}
            isMobile={isMobile}
          />
          
          {/* Main Content Area */}
          <main className={`
            flex-1 transition-all duration-300 relative
            ${isMobile ? 'w-full' : 'lg:ml-64'}
          `}>
            <div className={`
              min-h-screen
              ${isMobile ? 'pb-20 safe-area-bottom' : 'pb-8'}
            `}>
              <div className={`
                ${isMobile ? 'container-mobile py-4' : 'container-spaced py-6 lg:py-8'}
              `}>
                {renderPage()}
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Bottom Navigation Spacer */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 h-20 safe-area-bottom pointer-events-none" />
        )}
      </div>
    </ThemeProvider>
  );
}