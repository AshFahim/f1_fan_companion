import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useTheme } from './ThemeProvider';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Zap, 
  User,
  Flag,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
  onGuest: () => void;
  teamTheme: any;
}

export function Login({ onLogin, onGuest, teamTheme }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    country: 'US'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        name: isSignUp ? formData.name : 'F1 Fan',
        email: formData.email,
        points: isSignUp ? 0 : 1247,
        streak: isSignUp ? 0 : 12,
        level: isSignUp ? 1 : 3,
        predictions: [],
        country: formData.country,
        isAuthenticated: true
      };
      
      onLogin(user);
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Premium Racing Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sophisticated speed lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-muted-foreground to-transparent"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `-10%`,
                width: '120%',
                transform: `rotate(${-8 + Math.random() * 3}deg)`,
                opacity: Math.random() * 0.4 + 0.1,
                animation: `slideRight ${4 + Math.random() * 3}s infinite linear`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Premium checkered pattern */}
        <div className="absolute top-16 right-16 opacity-10 rotate-12">
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${
                  (Math.floor(i / 8) + i) % 2 === 0 
                    ? 'bg-foreground' 
                    : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Refined team accent overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${teamTheme?.rgb}, 0.4) 0%, transparent 60%)`
          }}
        />

        {/* Premium animated curves */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="30%" stopColor={teamTheme?.primary} stopOpacity="0.6" />
                <stop offset="70%" stopColor={teamTheme?.primary} stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M-100,350 Q400,150 800,350 T1300,350"
              stroke="url(#premiumGradient)"
              strokeWidth="1.5"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M-100,420 Q450,220 850,420 T1350,420"
              stroke="url(#premiumGradient)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '1.5s', animationDuration: '4s' }}
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Premium Logo/Header */}
          <div className="text-center space-y-6">
            <div 
              className="inline-flex items-center justify-center w-24 h-24 rounded-2xl shadow-2xl glass-card"
              style={{ 
                background: teamTheme?.gradient,
                boxShadow: `0 20px 40px rgba(${teamTheme?.rgb}, 0.3), 0 10px 20px rgba(0, 0, 0, 0.1)`
              }}
            >
              <div className="text-4xl">🏁</div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-bold gradient-text ensure-contrast">
                F1 Fan Companion
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Your premium Formula 1 experience awaits
              </p>
            </div>

            {/* Premium Mode Toggle */}
            <div className="flex items-center justify-center gap-1 p-1 bg-muted/30 rounded-2xl backdrop-blur-sm border border-border/50">
              <button
                onClick={() => setIsSignUp(false)}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                  !isSignUp 
                    ? 'text-white shadow-xl' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={!isSignUp ? { 
                  backgroundColor: teamTheme?.primary,
                  boxShadow: `0 8px 32px rgba(${teamTheme?.rgb}, 0.4)`
                } : {}}
              >
                Start Engine
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isSignUp 
                    ? 'text-white shadow-xl' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={isSignUp ? { 
                  backgroundColor: teamTheme?.primary,
                  boxShadow: `0 8px 32px rgba(${teamTheme?.rgb}, 0.4)`
                } : {}}
              >
                Join the Grid
              </button>
            </div>
          </div>

          {/* Premium Auth Form */}
          <Card className="border-0 shadow-2xl glass-card">
            <CardHeader className="space-y-3 pb-6">
              <CardTitle className="text-center flex items-center justify-center gap-3 ensure-contrast">
                {isSignUp ? (
                  <>
                    <Flag className="h-6 w-6" style={{ color: teamTheme?.primary }} />
                    <span className="text-xl">Join the F1 Community</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-6 w-6" style={{ color: teamTheme?.primary }} />
                    <span className="text-xl">Ready to Race</span>
                  </>
                )}
              </CardTitle>
              <p className="text-center text-sm text-muted-foreground leading-relaxed">
                {isSignUp 
                  ? 'Create your account and start your F1 journey with premium features' 
                  : 'Welcome back, champion! Let\'s get you back on track'
                }
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 ensure-contrast">
                      <User className="h-4 w-4" />
                      Display Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your racing alias"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required={isSignUp}
                      className="h-12 bg-input-background border-border/50 focus:border-team-accent transition-colors ensure-contrast"
                      style={{ '--tw-ring-color': teamTheme?.primary } as any}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 ensure-contrast">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@racing.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="h-12 bg-input-background border-border/50 focus:border-team-accent transition-colors ensure-contrast"
                    style={{ '--tw-ring-color': teamTheme?.primary } as any}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2 ensure-contrast">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                      className="h-12 bg-input-background border-border/50 focus:border-team-accent transition-colors pr-12 ensure-contrast"
                      style={{ '--tw-ring-color': teamTheme?.primary } as any}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="country" className="ensure-contrast">Country</Label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full h-12 px-4 bg-input-background border border-border/50 rounded-lg focus:border-team-accent transition-colors ensure-contrast"
                      style={{ '--tw-ring-color': teamTheme?.primary } as any}
                    >
                      <option value="US">🇺🇸 United States</option>
                      <option value="UK">🇬🇧 United Kingdom</option>
                      <option value="DE">🇩🇪 Germany</option>
                      <option value="FR">🇫🇷 France</option>
                      <option value="IT">🇮🇹 Italy</option>
                      <option value="ES">🇪🇸 Spain</option>
                      <option value="NL">🇳🇱 Netherlands</option>
                      <option value="AU">🇦🇺 Australia</option>
                      <option value="CA">🇨🇦 Canada</option>
                      <option value="BR">🇧🇷 Brazil</option>
                    </select>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 btn-glow text-white font-semibold text-base"
                  style={{ 
                    backgroundColor: teamTheme?.primary,
                    boxShadow: `0 8px 32px rgba(${teamTheme?.rgb}, 0.4)`
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isSignUp ? 'Joining the Grid...' : 'Starting Engine...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      {isSignUp ? (
                        <>
                          <Sparkles className="h-5 w-5" />
                          <span>Join the Grid</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5" />
                          <span>Start Engine</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </div>
                  )}
                </Button>

                {!isSignUp && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </form>

              <div className="space-y-5">
                <Separator className="opacity-30" />
                
                <Button
                  onClick={onGuest}
                  variant="outline"
                  className="w-full h-12 btn-glow border-2 bg-card/50 backdrop-blur-sm hover:bg-accent/50 ensure-contrast"
                  style={{ borderColor: `rgba(${teamTheme?.rgb}, 0.2)` }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-xl">👤</div>
                    <span className="font-medium">Continue as Guest</span>
                  </div>
                </Button>

                <div className="text-center space-y-3">
                  <p className="text-xs text-muted-foreground">
                    {isSignUp ? 'Already have an account?' : 'New to F1 Fan Companion?'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: teamTheme?.primary }}
                  >
                    {isSignUp ? 'Sign in instead' : 'Create an account'}
                  </button>
                </div>
              </div>

              {/* Premium Features Preview */}
              <div 
                className="p-5 rounded-xl border glass-card"
                style={{ 
                  backgroundColor: `rgba(${teamTheme?.rgb}, 0.03)`,
                  borderColor: `rgba(${teamTheme?.rgb}, 0.15)`
                }}
              >
                <div className="text-center space-y-3">
                  <div className="text-sm font-semibold ensure-contrast" style={{ color: teamTheme?.primary }}>
                    Premium F1 Experience
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span>Race Predictions</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500/80" />
                      <span>Daily Streaks</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500/80" />
                      <span>Live Updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Footer */}
          <div className="text-center space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              By continuing, you agree to our Terms of Service & Privacy Policy
            </p>
            <p className="text-xs text-muted-foreground">
              Not affiliated with Formula 1® | Made with ❤️ by fans, for fans
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for premium animations */}
      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-120px) rotate(-8deg); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 120px)) rotate(-8deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}