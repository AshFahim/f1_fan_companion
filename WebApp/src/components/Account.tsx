import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  User, 
  Trophy, 
  Flame, 
  Edit,
  Award,
  LogOut,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AccountProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
  teamTheme: any;
  onLogout?: () => void;
}

export function Account({ userProfile, setUserProfile, teamTheme, onLogout }: AccountProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    email: 'fan@f1companion.com'
  });

  const handleSave = () => {
    setUserProfile({
      ...userProfile,
      name: editForm.name
    });
    setIsEditing(false);
  };

  const recentPredictions = [
    { race: 'Abu Dhabi GP', prediction: 'Max Verstappen', correct: true, points: 25 },
    { race: 'Las Vegas GP', prediction: 'Charles Leclerc', correct: false, points: 0 },
    { race: 'Brazil GP', prediction: 'Max Verstappen', correct: true, points: 25 },
    { race: 'Mexico GP', prediction: 'Max Verstappen', correct: true, points: 25 }
  ];

  const achievements = [
    { name: 'First Win', icon: '🎯', unlocked: true },
    { name: 'Week Streak', icon: '🔥', unlocked: true },
    { name: 'Points Master', icon: '💎', unlocked: true },
    { name: 'Top 100', icon: '📈', unlocked: false }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            Your Profile
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: teamTheme?.primary }}
              >
                {userProfile.name.charAt(0)}
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Input 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                    <Input 
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl">{userProfile.name}</h2>
                    <p className="text-muted-foreground">{editForm.email}</p>
                  </>
                )}
              </div>
            </div>
            <div className="text-right">
              {isEditing ? (
                <div className="space-x-2">
                  <Button onClick={handleSave} size="sm">Save</Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Trophy className="h-6 w-6 mx-auto mb-2" style={{ color: teamTheme?.primary }} />
              <div className="text-2xl">{userProfile.points}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl">{userProfile.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Award className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl">{userProfile.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl">#47</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPredictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm">{prediction.race}</p>
                  <p className="text-xs text-muted-foreground">
                    Predicted: {prediction.prediction}
                  </p>
                </div>
                <div className="text-right flex items-center gap-2">
                  {prediction.correct ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">+{prediction.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`text-center p-4 rounded-lg border ${
                achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`text-2xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <p className="text-xs">{achievement.name}</p>
                <Badge variant={achievement.unlocked ? "secondary" : "outline"} className="mt-1">
                  {achievement.unlocked ? 'Unlocked' : 'Locked'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Export Data
          </Button>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}