import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Flame, 
  TrendingUp,
  Globe,
  Users,
  MapPin
} from 'lucide-react';

interface LeaderboardProps {
  userProfile: any;
  teamTheme: any;
}

export function Leaderboard({ userProfile, teamTheme }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState('global');

  const mockGlobalLeaderboard = [
    { rank: 1, name: 'RacingKing', country: '🇳🇱', points: 2847, streak: 45, level: 8, isUser: false },
    { rank: 2, name: 'F1Fanatic', country: '🇬🇧', points: 2651, streak: 32, level: 7, isUser: false },
    { rank: 3, name: 'SpeedDemon', country: '🇮🇹', points: 2543, streak: 28, level: 7, isUser: false },
    { rank: 4, name: 'TurboMax', country: '🇩🇪', points: 2398, streak: 41, level: 6, isUser: false },
    { rank: 5, name: 'RedBullFan', country: '🇦🇹', points: 2287, streak: 23, level: 6, isUser: false },
    // ... more users
    { rank: 47, name: userProfile.name, country: '🇺🇸', points: userProfile.points, streak: userProfile.streak, level: userProfile.level, isUser: true },
  ];

  const mockCountryLeaderboard = [
    { rank: 1, name: 'USAChamp', country: '🇺🇸', points: 1987, streak: 34, level: 5, isUser: false },
    { rank: 2, name: 'StarSpangled', country: '🇺🇸', points: 1876, streak: 29, level: 5, isUser: false },
    { rank: 3, name: 'LibertyBell', country: '🇺🇸', points: 1654, streak: 22, level: 4, isUser: false },
    { rank: 4, name: userProfile.name, country: '🇺🇸', points: userProfile.points, streak: userProfile.streak, level: userProfile.level, isUser: true },
  ];

  const mockFriendsLeaderboard = [
    { rank: 1, name: 'Alex_F1', country: '🇺🇸', points: 1456, streak: 18, level: 4, isUser: false },
    { rank: 2, name: userProfile.name, country: '🇺🇸', points: userProfile.points, streak: userProfile.streak, level: userProfile.level, isUser: true },
    { rank: 3, name: 'Sarah_Racing', country: '🇺🇸', points: 1134, streak: 15, level: 3, isUser: false },
    { rank: 4, name: 'Mike_GP', country: '🇺🇸', points: 987, streak: 12, level: 3, isUser: false },
  ];

  const getLeaderboardData = () => {
    switch (activeTab) {
      case 'country': return mockCountryLeaderboard;
      case 'friends': return mockFriendsLeaderboard;
      default: return mockGlobalLeaderboard;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-orange-600" />;
      default: return <span className="text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number, isUser: boolean) => {
    if (isUser) return 'bg-blue-50 border-blue-200';
    if (rank <= 3) return 'bg-yellow-50 border-yellow-200';
    return '';
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            Fan Leaderboard
          </CardTitle>
        </CardHeader>
      </Card>

      {/* User's Current Rank Highlight */}
      <Card style={{ backgroundColor: `${teamTheme?.primary}15` }}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🏆</div>
              <div>
                <h3 className="text-lg">Your Global Rank</h3>
                <p className="text-muted-foreground">Keep climbing the leaderboard!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl" style={{ color: teamTheme?.primary }}>#47</div>
              <Badge style={{ backgroundColor: teamTheme?.primary }}>
                Level {userProfile.level}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-xl">{userProfile.points}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-xl">{userProfile.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-xl">+127</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="global" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Global
              </TabsTrigger>
              <TabsTrigger value="country" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Country
              </TabsTrigger>
              <TabsTrigger value="friends" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Friends
              </TabsTrigger>
            </TabsList>

            {['global', 'country', 'friends'].map((tab) => (
              <TabsContent key={tab} value={tab} className="p-6">
                <div className="space-y-2">
                  {getLeaderboardData().map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        getRankStyle(user.rank, user.isUser)
                      } ${user.isUser ? 'ring-2 ring-blue-300' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 flex justify-center">
                          {getRankIcon(user.rank)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{user.country}</span>
                          <div>
                            <p className={`${user.isUser ? 'text-blue-600' : ''}`}>
                              {user.name}
                              {user.isUser && <span className="ml-2 text-blue-600">(You)</span>}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Level {user.level}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm text-muted-foreground">Points</p>
                          <p className="text-lg">{user.points.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Streak</p>
                          <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span>{user.streak}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-6">
                  <Button variant="outline">
                    Load More Rankings
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Weekly Rankings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            This Week's Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Crown className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm text-muted-foreground">Most Points</p>
              <p>RacingKing</p>
              <p className="text-lg">+387 pts</p>
            </div>
            <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <Flame className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm text-muted-foreground">Longest Streak</p>
              <p>StreakMaster</p>
              <p className="text-lg">67 days</p>
            </div>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm text-muted-foreground">Best Climber</p>
              <p>RisingFan</p>
              <p className="text-lg">+23 ranks</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Season Stats */}
      <Card>
        <CardHeader>
          <CardTitle>2025 Season Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">2,847</div>
              <div className="text-sm text-muted-foreground">Highest Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">89%</div>
              <div className="text-sm text-muted-foreground">Top Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">156</div>
              <div className="text-sm text-muted-foreground">Active Streaks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">12.4k</div>
              <div className="text-sm text-muted-foreground">Total Fans</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}