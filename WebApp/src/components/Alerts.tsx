import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Bell, 
  Clock, 
  Calendar,
  MapPin,
  Settings,
  Smartphone,
  Mail
} from 'lucide-react';
import { mockRaces } from './data/teams';

interface AlertsProps {
  teamTheme: any;
}

export function Alerts({ teamTheme }: AlertsProps) {
  const [alertSettings, setAlertSettings] = useState({
    pushNotifications: true,
    emailAlerts: false,
    smsAlerts: false
  });

  const [raceAlerts, setRaceAlerts] = useState<Record<string, boolean>>({
    'bahrain-2025': true,
    'saudi-2025': true,
    'australia-2025': false
  });

  const toggleRaceAlert = (raceId: string) => {
    setRaceAlerts(prev => ({
      ...prev,
      [raceId]: !prev[raceId]
    }));
  };

  const toggleAlertType = (type: keyof typeof alertSettings) => {
    setAlertSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            Race Alerts & Reminders
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Timezone Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm">Your Timezone</p>
                <p className="text-xs text-muted-foreground">Eastern Time (EST) - UTC-5</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Change
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-blue-500" />
              <div>
                <Label>Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Get instant alerts on your device</p>
              </div>
            </div>
            <Switch
              checked={alertSettings.pushNotifications}
              onCheckedChange={() => toggleAlertType('pushNotifications')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-green-500" />
              <div>
                <Label>Email Alerts</Label>
                <p className="text-xs text-muted-foreground">Receive alerts via email</p>
              </div>
            </div>
            <Switch
              checked={alertSettings.emailAlerts}
              onCheckedChange={() => toggleAlertType('emailAlerts')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-purple-500" />
              <div>
                <Label>SMS Alerts</Label>
                <p className="text-xs text-muted-foreground">Text message notifications</p>
              </div>
            </div>
            <Switch
              checked={alertSettings.smsAlerts}
              onCheckedChange={() => toggleAlertType('smsAlerts')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Races */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Races
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRaces.map((race) => (
              <div key={race.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{race.flag}</div>
                  <div>
                    <h4 className="text-sm">{race.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(race.date).toLocaleDateString()} at {race.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{race.circuit}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Switch
                    checked={raceAlerts[race.id] || false}
                    onCheckedChange={() => toggleRaceAlert(race.id)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {raceAlerts[race.id] ? 'Alerts On' : 'Alerts Off'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm">24 hours before race</p>
                <p className="text-xs text-muted-foreground">Reminder to make predictions</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm">2 hours before race</p>
                <p className="text-xs text-muted-foreground">Final call for predictions</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm">Race start notification</p>
                <p className="text-xs text-muted-foreground">When the race begins</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm">Race results</p>
                <p className="text-xs text-muted-foreground">Your prediction results</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              const allRaces = mockRaces.reduce((acc, race) => ({
                ...acc,
                [race.id]: true
              }), {});
              setRaceAlerts(allRaces);
            }}
          >
            Enable All Race Alerts
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setRaceAlerts({})}
          >
            Disable All Race Alerts
          </Button>
          <Button variant="outline" className="w-full">
            Test Notification
          </Button>
        </CardContent>
      </Card>

      {/* Alert History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm p-2 bg-blue-50 border border-blue-200 rounded">
              📢 Abu Dhabi GP starts in 2 hours - Final call for predictions!
            </div>
            <div className="text-sm p-2 bg-green-50 border border-green-200 rounded">
              🏆 Your prediction for Las Vegas GP was incorrect - Better luck next time!
            </div>
            <div className="text-sm p-2 bg-yellow-50 border border-yellow-200 rounded">
              ⏰ Don't forget to check in today to maintain your 12-day streak!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}