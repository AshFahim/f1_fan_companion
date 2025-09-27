import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Flame, 
  Calendar, 
  Gift, 
  Clock,
  Star,
  Trophy,
  Zap
} from 'lucide-react';

interface StreaksProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
  teamTheme: any;
}

export function Streaks({ userProfile, setUserProfile, teamTheme }: StreaksProps) {
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  
  const handleCheckIn = () => {
    setHasCheckedInToday(true);
    setUserProfile({
      ...userProfile,
      streak: userProfile.streak + 1,
      points: userProfile.points + 5
    });
  };

  const streakRewards = [
    { days: 3, reward: '🎯 +10 Bonus Points', unlocked: userProfile.streak >= 3 },
    { days: 7, reward: '🏆 Bronze Badge', unlocked: userProfile.streak >= 7 },
    { days: 15, reward: '⚡ Prediction Boost', unlocked: userProfile.streak >= 15 },
    { days: 30, reward: '🌟 Gold Badge', unlocked: userProfile.streak >= 30 },
    { days: 50, reward: '🔥 Fire Badge', unlocked: userProfile.streak >= 50 },
    { days: 100, reward: '👑 Legend Status', unlocked: userProfile.streak >= 100 }
  ];

  const getStreakLevel = (days: number) => {
    if (days >= 100) return { name: 'Legend', color: 'text-purple-500', emoji: '👑' };
    if (days >= 50) return { name: 'Fire Master', color: 'text-red-500', emoji: '🔥' };
    if (days >= 30) return { name: 'Gold', color: 'text-yellow-500', emoji: '🌟' };
    if (days >= 15) return { name: 'Silver', color: 'text-gray-400', emoji: '⚡' };
    if (days >= 7) return { name: 'Bronze', color: 'text-orange-500', emoji: '🏆' };
    return { name: 'Beginner', color: 'text-blue-500', emoji: '🎯' };
  };

  const streakLevel = getStreakLevel(userProfile.streak);

  // Mock calendar data for the last 30 days
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayNumber = date.getDate();
      const isToday = i === 0;
      const hasVisited = i <= userProfile.streak || (isToday && hasCheckedInToday);
      
      days.push({
        day: dayNumber,
        isToday,
        hasVisited,
        date: date.toDateString()
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            Daily Streak Tracker
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Main Streak Display */}
      <Card className="relative overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-2">🔥</div>
            <div className="text-4xl mb-2" style={{ color: teamTheme?.primary }}>
              {userProfile.streak}
            </div>
            <div className="text-xl text-muted-foreground mb-2">Day Streak</div>
            <Badge 
              className={`${streakLevel.color} text-lg px-4 py-1`}
              variant="outline"
            >
              {streakLevel.emoji} {streakLevel.name}
            </Badge>
          </div>

          {!hasCheckedInToday ? (
            <Button 
              onClick={handleCheckIn}
              size="lg"
              className="text-lg px-8"
              style={{ backgroundColor: teamTheme?.primary }}
            >
              <Zap className="h-5 w-5 mr-2" />
              Check In Today (+5 pts)
            </Button>
          ) : (
            <div className="text-green-600">
              <div className="text-2xl mb-2">✅</div>
              <div>Checked in today! Come back tomorrow.</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Streak Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {streakRewards.map((reward, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  reward.unlocked ? 'bg-green-50 border-green-200' : 'bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${reward.unlocked ? '' : 'grayscale'}`}>
                    {reward.unlocked ? '✅' : '🔒'}
                  </div>
                  <div>
                    <p className="text-sm">{reward.days} Day Streak</p>
                    <p className="text-xs text-muted-foreground">{reward.reward}</p>
                  </div>
                </div>
                <div>
                  {reward.unlocked ? (
                    <Badge variant="secondary" className="text-green-600">
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      {reward.days - userProfile.streak} days left
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress to Next Reward */}
      <Card>
        <CardHeader>
          <CardTitle>Progress to Next Reward</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {streakRewards
              .filter(reward => !reward.unlocked)
              .slice(0, 1)
              .map((nextReward, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current: {userProfile.streak} days</span>
                    <span>Target: {nextReward.days} days</span>
                  </div>
                  <Progress 
                    value={(userProfile.streak / nextReward.days) * 100} 
                    className="mb-2"
                  />
                  <p className="text-center text-sm text-muted-foreground">
                    {nextReward.days - userProfile.streak} more days until: {nextReward.reward}
                  </p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Last 30 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center text-xs rounded-lg border
                  ${day.isToday ? 'ring-2 ring-blue-500' : ''}
                  ${day.hasVisited ? 'bg-green-100 border-green-300 text-green-700' : 'bg-gray-100 border-gray-300'}
                `}
              >
                {day.hasVisited ? '🔥' : day.day}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span>Checked In</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
              <span>Missed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Tips */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Streak Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• Check in daily to maintain your streak</p>
            <p>• Make predictions to earn bonus points</p>
            <p>• Enable notifications to never miss a day</p>
            <p>• Longer streaks unlock exclusive rewards</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}