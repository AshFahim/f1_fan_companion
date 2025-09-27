import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useTheme } from './ThemeProvider';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Globe, 
  Bell, 
  Shield,
  Clock,
  Volume2,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { F1Teams } from './data/teams';

interface SettingsProps {
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  teamTheme: any;
}

export function Settings({ selectedTeam, setSelectedTeam, teamTheme }: SettingsProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const [notifications, setNotifications] = useState({
    raceAlerts: true,
    predictionReminders: true,
    streakReminders: true,
    newsUpdates: false,
    emailDigest: true
  });

  const [timezone, setTimezone] = useState('America/New_York');
  const [language, setLanguage] = useState('en');

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (EST)' },
    { value: 'America/Chicago', label: 'Central Time (CST)' },
    { value: 'America/Denver', label: 'Mountain Time (MST)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PST)' },
    { value: 'Europe/London', label: 'GMT (London)' },
    { value: 'Europe/Paris', label: 'CET (Paris)' },
    { value: 'Asia/Tokyo', label: 'JST (Tokyo)' },
    { value: 'Australia/Sydney', label: 'AEST (Sydney)' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'nl', label: 'Nederlands' }
  ];

  return (
    <div className="space-y-8 pb-24 lg:pb-8">
      {/* Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-card to-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <SettingsIcon className="h-6 w-6" style={{ color: teamTheme?.primary }} />
            </div>
            <div>
              <h1>Settings & Preferences</h1>
              <p className="text-sm text-muted-foreground font-normal">Customize your experience</p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Appearance Settings */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Palette className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            </div>
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Mode Toggle */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Theme Mode</Label>
              <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant={isDarkMode ? "default" : "outline"}
                onClick={toggleDarkMode}
                className="flex items-center gap-2 btn-glow"
                style={isDarkMode ? { backgroundColor: teamTheme?.primary } : {}}
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              
              <Button
                variant={!isDarkMode ? "default" : "outline"}
                onClick={toggleDarkMode}
                className="flex items-center gap-2 btn-glow"
                style={!isDarkMode ? { backgroundColor: teamTheme?.primary } : {}}
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
            </div>
          </div>

          {/* Team Theme Selection */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="team-select" className="text-base font-medium">
                Team Theme
              </Label>
              <p className="text-sm text-muted-foreground">
                Choose your favorite team to customize the app colors and accents
              </p>
            </div>
            
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="btn-glow">
                <SelectValue placeholder="Select your favorite team..." />
              </SelectTrigger>
              <SelectContent>
                {F1Teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: team.primary }}
                      ></div>
                      <span className="font-medium">{team.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {team.drivers[0].split(' ')[1]} · {team.drivers[1].split(' ')[1]}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Theme Preview */}
          <div 
            className="p-6 rounded-xl border-2 transition-all duration-300"
            style={{ 
              borderColor: teamTheme?.primary,
              background: `linear-gradient(135deg, rgba(${teamTheme?.rgb}, 0.1) 0%, rgba(${teamTheme?.rgb}, 0.05) 100%)`
            }}
          >
            <h4 className="font-medium mb-4">Theme Preview</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl shadow-lg"
                  style={{ background: teamTheme?.gradient }}
                ></div>
                <div 
                  className="w-12 h-12 rounded-xl border-2"
                  style={{ borderColor: teamTheme?.primary, backgroundColor: teamTheme?.secondary }}
                ></div>
                <Button 
                  size="sm"
                  className="btn-glow shadow-lg"
                  style={{ 
                    backgroundColor: teamTheme?.primary,
                    boxShadow: `0 4px 20px rgba(${teamTheme?.rgb}, 0.3)`
                  }}
                >
                  Sample Button
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Your selected theme will be applied across all app components including buttons, accents, and highlights.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Localization */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Globe className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            </div>
            Location & Language
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-base font-medium">
                Timezone
              </Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Race times and alerts will be shown in your local timezone
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-base font-medium">
                Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Bell className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            </div>
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              key: 'raceAlerts',
              title: 'Race Alerts',
              description: 'Get notified before races start'
            },
            {
              key: 'predictionReminders',
              title: 'Prediction Reminders',
              description: 'Remind me to make predictions before deadlines'
            },
            {
              key: 'streakReminders',
              title: 'Daily Streak Reminders',
              description: 'Daily check-in reminders to maintain your streak'
            },
            {
              key: 'newsUpdates',
              title: 'Breaking News Updates',
              description: 'Instant notifications for breaking F1 news'
            },
            {
              key: 'emailDigest',
              title: 'Weekly Email Digest',
              description: 'Weekly summary of your predictions and points'
            }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-accent/50 transition-colors">
              <div className="space-y-1">
                <Label htmlFor={item.key} className="text-base font-medium">
                  {item.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Switch
                id={item.key}
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Shield className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            </div>
            Privacy & Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[
              {
                title: 'Public Profile',
                description: 'Show your profile in leaderboards',
                defaultChecked: true
              },
              {
                title: 'Share Anonymous Analytics',
                description: 'Help improve the app with usage data',
                defaultChecked: true
              },
              {
                title: 'Personalized Recommendations',
                description: 'Get content suggestions based on your activity',
                defaultChecked: true
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <Label className="text-base font-medium">{item.title}</Label>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch defaultChecked={item.defaultChecked} />
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border/50 space-y-3">
            <Button variant="outline" className="w-full btn-glow">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full btn-glow">
              Delete Account
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              F1 Fan Companion respects your privacy and follows GDPR guidelines
            </p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>About F1 Fan Companion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Version', value: '2.1.0' },
              { label: 'Last Updated', value: 'Jan 2025' },
              { label: 'Build', value: '#2025.01.08' },
              { label: 'Users', value: '12.4k' }
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-muted/50">
                <div className="text-lg font-semibold" style={{ color: teamTheme?.primary }}>
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="btn-glow">
              Terms of Service
            </Button>
            <Button variant="outline" className="btn-glow">
              Privacy Policy
            </Button>
            <Button variant="outline" className="btn-glow">
              Contact Support
            </Button>
          </div>

          <div 
            className="text-center p-6 rounded-xl border-2 space-y-2"
            style={{ 
              borderColor: `rgba(${teamTheme?.rgb}, 0.3)`,
              background: `linear-gradient(135deg, rgba(${teamTheme?.rgb}, 0.05) 0%, transparent 100%)`
            }}
          >
            <p className="text-sm">Made with ❤️ by F1 fans, for F1 fans</p>
            <p className="text-xs text-muted-foreground">Not affiliated with Formula 1®</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}