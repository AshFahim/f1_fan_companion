import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Clock, 
  Target, 
  Trophy, 
  Flame, 
  Newspaper, 
  Calendar,
  TrendingUp,
  Users
} from 'lucide-react';
import { mockRaces } from './data/teams';

interface HomeProps {
  onNavigate: (page: string) => void;
  userProfile: any;
  teamTheme: any;
}

export function Home({ onNavigate, userProfile, teamTheme }: HomeProps) {
  const nextRace = mockRaces[0];
  const timeUntilRace = new Date(nextRace.date).getTime() - new Date().getTime();
  const daysUntil = Math.ceil(timeUntilRace / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">Welcome back, {userProfile.name}! 🏁</h1>
              <p className="text-muted-foreground">
                Ready to dominate the leaderboard this season?
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5" style={{ color: teamTheme?.primary }} />
                <span className="text-2xl">{userProfile.points}</span>
                <span className="text-muted-foreground">pts</span>
              </div>
              <Badge style={{ backgroundColor: teamTheme?.primary }}>
                Level {userProfile.level}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Race Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            Next Race
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl">{nextRace.flag} {nextRace.name}</h3>
              <p className="text-muted-foreground">{nextRace.circuit}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(nextRace.date).toLocaleDateString()} at {nextRace.time}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">{daysUntil}</div>
              <div className="text-sm text-muted-foreground">days left</div>
            </div>
          </div>
          <Button 
            onClick={() => onNavigate('predict')} 
            className="w-full"
            style={{ backgroundColor: teamTheme?.primary }}
          >
            <Target className="h-4 w-4 mr-2" />
            Make Your Prediction
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 mx-auto mb-2" style={{ color: teamTheme?.primary }} />
            <div className="text-2xl">{userProfile.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2" style={{ color: teamTheme?.primary }} />
            <div className="text-2xl">#47</div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2" style={{ color: teamTheme?.primary }} />
            <div className="text-2xl">8/10</div>
            <div className="text-sm text-muted-foreground">Predictions</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2" style={{ color: teamTheme?.primary }} />
            <div className="text-2xl">+127</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5" style={{ color: teamTheme?.primary }} />
              Daily Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl">🔥</div>
              <div>
                <div className="text-2xl">{userProfile.streak} days</div>
                <div className="text-sm text-muted-foreground">
                  Keep it up! Next reward at 15 days
                </div>
              </div>
            </div>
            <Progress value={(userProfile.streak / 15) * 100} className="mb-3" />
            <Button 
              onClick={() => onNavigate('streaks')} 
              variant="outline" 
              className="w-full"
            >
              View Streak Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5" style={{ color: teamTheme?.primary }} />
              Latest F1 News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="border-l-4 pl-3" style={{ borderColor: teamTheme?.primary }}>
                <p className="text-sm">Verstappen sets new lap record in pre-season testing</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-l-4 pl-3 border-gray-300">
                <p className="text-sm">New aerodynamic regulations announced for 2025</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate('news')} 
              variant="outline" 
              className="w-full"
            >
              Read More News
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* What's New Banner */}
      <Card style={{ backgroundColor: `${teamTheme?.primary}15` }}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🆕</div>
            <div>
              <h3 className="text-lg" style={{ color: teamTheme?.primary }}>
                What's New in F1 Fan Companion
              </h3>
              <p className="text-muted-foreground">
                New driver comparison tool, enhanced streak rewards, and real-time race alerts!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}