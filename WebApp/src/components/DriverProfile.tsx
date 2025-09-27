import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { DriverAvatar } from './DriverAvatar';
import { Driver, driverAPI } from './data/drivers';
import { useTheme } from './ThemeProvider';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp,
  Calendar,
  MapPin,
  Flag,
  Award,
  Clock,
  Activity,
  Star,
  Users,
  Car,
  Hash
} from 'lucide-react';

interface DriverProfileProps {
  driver: Driver | null;
  onBack: () => void;
  teamTheme: any;
}

export function DriverProfile({ driver: initialDriver, onBack, teamTheme }: DriverProfileProps) {
  const [driver, setDriver] = useState<Driver | null>(initialDriver);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (initialDriver?.id) {
      fetchDriverData(initialDriver.id);
    }
  }, [initialDriver?.id]);

  const fetchDriverData = async (driverId: string) => {
    setIsLoading(true);
    try {
      const driverData = await driverAPI.getDriverById(driverId);
      if (driverData) {
        setDriver(driverData);
      }
    } catch (error) {
      console.error('Error fetching driver data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!driver) {
    return (
      <div className="space-y-6 pb-24 lg:pb-8">
        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">Driver not found</div>
            <Button onClick={onBack} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Drivers
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const careerYears = new Date().getFullYear() - driver.careerStart + 1;
  const avgPointsPerRace = driver.careerStarts > 0 ? (driver.points / driver.careerStarts).toFixed(1) : '0.0';
  const podiumRate = driver.careerStarts > 0 ? ((driver.podiums / driver.careerStarts) * 100).toFixed(1) : '0.0';
  const winRate = driver.careerStarts > 0 ? ((driver.wins / driver.careerStarts) * 100).toFixed(1) : '0.0';

  const statCards = [
    { 
      icon: Trophy, 
      label: 'Race Wins', 
      value: driver.wins, 
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    { 
      icon: Award, 
      label: 'Podiums', 
      value: driver.podiums, 
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    { 
      icon: Target, 
      label: 'Pole Positions', 
      value: driver.poles, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    { 
      icon: Zap, 
      label: 'Fastest Laps', 
      value: driver.fastestLaps, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    { 
      icon: Star, 
      label: 'Championships', 
      value: driver.championships, 
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    { 
      icon: Activity, 
      label: 'DNFs', 
      value: driver.dnfs, 
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    }
  ];

  return (
    <div className="space-y-8 pb-24 lg:pb-8">
      {/* Header with Back Button */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-card to-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="mb-4 hover:bg-accent/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Drivers
          </Button>
        </CardContent>
      </Card>

      {/* Driver Profile Header */}
      <Card className="border-0 shadow-2xl glass-card">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Driver Avatar */}
            <div className="relative">
              <DriverAvatar driver={driver} size="xl" />
              <Badge 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 font-bold"
                style={{ 
                  backgroundColor: teamTheme?.primary,
                  color: 'white'
                }}
              >
                #{driver.number}
              </Badge>
            </div>

            {/* Driver Info */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold ensure-contrast mb-2">
                  {driver.name}
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-lg text-muted-foreground">
                  <span className="text-2xl">{driver.flag}</span>
                  <span>{driver.nationality}</span>
                  <span>•</span>
                  <span>{driver.age} years old</span>
                </div>
              </div>

              {/* Team & Car Info */}
              <div 
                className="p-4 rounded-xl border-2"
                style={{ 
                  backgroundColor: `rgba(${teamTheme?.rgb}, 0.05)`,
                  borderColor: `rgba(${teamTheme?.rgb}, 0.2)`
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
                    >
                      <Users className="h-5 w-5" style={{ color: teamTheme?.primary }} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Current Team</div>
                      <div className="font-semibold ensure-contrast">{driver.team}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
                    >
                      <Car className="h-5 w-5" style={{ color: teamTheme?.primary }} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Car Model</div>
                      <div className="font-semibold ensure-contrast">{driver.carModel}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Season Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
                >
                  <div className="text-2xl font-bold" style={{ color: teamTheme?.primary }}>
                    {driver.currentSeasonPosition}
                  </div>
                  <div className="text-sm text-muted-foreground">Championship Position</div>
                </div>
                <div 
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
                >
                  <div className="text-2xl font-bold" style={{ color: teamTheme?.primary }}>
                    {driver.currentSeasonPoints}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Season Points</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Statistics */}
      <Card className="border-0 shadow-xl glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 ensure-contrast">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Trophy className="h-6 w-6" style={{ color: teamTheme?.primary }} />
            </div>
            Career Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className={`p-4 text-center hover:shadow-lg transition-all duration-300 ${stat.bgColor} ${stat.borderColor} border`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold ensure-contrast">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* Career Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <div className="text-lg font-semibold ensure-contrast">{careerYears}</div>
              <div className="text-sm text-muted-foreground">Years in F1</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <div className="text-lg font-semibold ensure-contrast">{avgPointsPerRace}</div>
              <div className="text-sm text-muted-foreground">Avg Points/Race</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <div className="text-lg font-semibold ensure-contrast">{podiumRate}%</div>
              <div className="text-sm text-muted-foreground">Podium Rate</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <div className="text-lg font-semibold ensure-contrast">{winRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="border-0 shadow-xl glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 ensure-contrast">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <MapPin className="h-6 w-6" style={{ color: teamTheme?.primary }} />
            </div>
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Birthplace</div>
                  <div className="font-medium ensure-contrast">{driver.birthPlace}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">F1 Career Start</div>
                  <div className="font-medium ensure-contrast">{driver.careerStart}</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Career Starts</div>
                  <div className="font-medium ensure-contrast">{driver.careerStarts} races</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Career Points</div>
                  <div className="font-medium ensure-contrast">{driver.points.toLocaleString()} points</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sponsors & Partners */}
      <Card className="border-0 shadow-xl glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 ensure-contrast">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Star className="h-6 w-6" style={{ color: teamTheme?.primary }} />
            </div>
            Sponsors & Partners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {driver.sponsors.map((sponsor, index) => (
              <Card 
                key={index} 
                className="p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="text-center">
                  <div className="font-medium ensure-contrast">{sponsor}</div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 p-4 bg-muted/20 rounded-xl">
            <p className="text-sm text-muted-foreground text-center">
              💼 Sponsorship information is publicly available and displayed for informational purposes only
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="border-0 shadow-xl glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 ensure-contrast">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Activity className="h-6 w-6" style={{ color: teamTheme?.primary }} />
            </div>
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              className="p-4 rounded-xl border-l-4"
              style={{ 
                backgroundColor: `rgba(${teamTheme?.rgb}, 0.05)`,
                borderLeftColor: teamTheme?.primary
              }}
            >
              <h4 className="font-semibold ensure-contrast mb-2">Race Consistency</h4>
              <p className="text-sm text-muted-foreground">
                Average finishing position of {driver.avgPosition} with a {podiumRate}% podium rate demonstrates 
                {driver.avgPosition < 5 ? ' exceptional' : driver.avgPosition < 10 ? ' strong' : ' developing'} 
                consistency throughout their career.
              </p>
            </div>
            
            <div 
              className="p-4 rounded-xl border-l-4"
              style={{ 
                backgroundColor: `rgba(${teamTheme?.rgb}, 0.05)`,
                borderLeftColor: teamTheme?.primary
              }}
            >
              <h4 className="font-semibold ensure-contrast mb-2">Championship Contention</h4>
              <p className="text-sm text-muted-foreground">
                Currently {driver.currentSeasonPosition === 1 ? 'leading' : `in P${driver.currentSeasonPosition} of`} 
                the 2025 Drivers' Championship with {driver.currentSeasonPoints} points, 
                {driver.championships > 0 ? ` adding to their ${driver.championships} previous championship${driver.championships > 1 ? 's' : ''}` : ' seeking their first championship title'}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}