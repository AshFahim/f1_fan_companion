import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Trophy,
  Target,
  Zap,
  Award
} from 'lucide-react';
import { mockDrivers } from './data/teams';

interface CompareProps {
  teamTheme: any;
}

export function Compare({ teamTheme }: CompareProps) {
  const [driver1, setDriver1] = useState('');
  const [driver2, setDriver2] = useState('');

  const getDriverData = (driverName: string) => {
    return mockDrivers.find(d => d.name === driverName);
  };

  const driver1Data = getDriverData(driver1);
  const driver2Data = getDriverData(driver2);

  const StatCard = ({ title, driver1Value, driver2Value, unit = '', icon: Icon }: any) => {
    const driver1Better = parseFloat(driver1Value) > parseFloat(driver2Value);
    const driver2Better = parseFloat(driver2Value) > parseFloat(driver1Value);
    
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon className="h-4 w-4" style={{ color: teamTheme?.primary }} />
            <h4 className="text-sm">{title}</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`text-center p-3 rounded-lg ${driver1Better ? 'bg-green-50 border border-green-200' : 'bg-muted'}`}>
              <div className="text-lg">{driver1Value}{unit}</div>
              <div className="text-xs text-muted-foreground">{driver1Data?.name}</div>
            </div>
            <div className={`text-center p-3 rounded-lg ${driver2Better ? 'bg-green-50 border border-green-200' : 'bg-muted'}`}>
              <div className="text-lg">{driver2Value}{unit}</div>
              <div className="text-xs text-muted-foreground">{driver2Data?.name}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const BarComparison = ({ title, driver1Value, driver2Value, maxValue, icon: Icon }: any) => {
    const driver1Percent = (driver1Value / maxValue) * 100;
    const driver2Percent = (driver2Value / maxValue) * 100;
    
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Icon className="h-4 w-4" style={{ color: teamTheme?.primary }} />
            <h4 className="text-sm">{title}</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>{driver1Data?.name}</span>
                <span>{driver1Value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${driver1Percent}%`,
                    backgroundColor: driver1Data?.teamId ? mockDrivers.find(d => d.id === driver1Data.id)?.teamId === 'red-bull' ? '#1E3A8A' : '#DC2626' : teamTheme?.primary
                  }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>{driver2Data?.name}</span>
                <span>{driver2Value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${driver2Percent}%`,
                    backgroundColor: driver2Data?.teamId ? mockDrivers.find(d => d.id === driver2Data.id)?.teamId === 'red-bull' ? '#1E3A8A' : '#DC2626' : teamTheme?.primary
                  }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            StatTest - Driver Comparison
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Driver Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Drivers to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Driver 1</label>
              <Select value={driver1} onValueChange={setDriver1}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first driver..." />
                </SelectTrigger>
                <SelectContent>
                  {mockDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.name}>
                      <div className="flex items-center gap-2">
                        <span>{driver.flag}</span>
                        <span>{driver.name}</span>
                        <span className="text-xs text-muted-foreground">({driver.team})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2">Driver 2</label>
              <Select value={driver2} onValueChange={setDriver2}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second driver..." />
                </SelectTrigger>
                <SelectContent>
                  {mockDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.name}>
                      <div className="flex items-center gap-2">
                        <span>{driver.flag}</span>
                        <span>{driver.name}</span>
                        <span className="text-xs text-muted-foreground">({driver.team})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!driver1 || !driver2 ? (
            <div className="text-center py-8 text-muted-foreground">
              Select two drivers to see their comparison
            </div>
          ) : (
            <div className="mt-6">
              <h3 className="text-lg mb-4">
                {driver1Data?.flag} {driver1} vs {driver2Data?.flag} {driver2}
              </h3>
              
              {/* Driver Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{driver1Data?.flag}</div>
                    <h4 className="mb-1">{driver1Data?.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{driver1Data?.team}</p>
                    <Badge variant="outline">{driver1Data?.points} points</Badge>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{driver2Data?.flag}</div>
                    <h4 className="mb-1">{driver2Data?.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{driver2Data?.team}</p>
                    <Badge variant="outline">{driver2Data?.points} points</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {driver1Data && driver2Data && (
        <>
          {/* Key Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              title="Race Wins"
              driver1Value={driver1Data.wins}
              driver2Value={driver2Data.wins}
              icon={Trophy}
            />
            <StatCard
              title="Podium Finishes"
              driver1Value={driver1Data.podiums}
              driver2Value={driver2Data.podiums}
              icon={Award}
            />
            <StatCard
              title="Pole Positions"
              driver1Value={driver1Data.poles}
              driver2Value={driver2Data.poles}
              icon={Target}
            />
            <StatCard
              title="Championships"
              driver1Value={driver1Data.championships}
              driver2Value={driver2Data.championships}
              icon={Trophy}
            />
            <StatCard
              title="2025 Points"
              driver1Value={driver1Data.points}
              driver2Value={driver2Data.points}
              icon={TrendingUp}
            />
            <StatCard
              title="Average Position"
              driver1Value={driver1Data.avgPosition}
              driver2Value={driver2Data.avgPosition}
              unit=""
              icon={BarChart3}
            />
          </div>

          {/* Visual Comparisons */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarComparison
                  title="Race Wins"
                  driver1Value={driver1Data.wins}
                  driver2Value={driver2Data.wins}
                  maxValue={Math.max(driver1Data.wins, driver2Data.wins)}
                  icon={Trophy}
                />
                <BarComparison
                  title="Podium Finishes"
                  driver1Value={driver1Data.podiums}
                  driver2Value={driver2Data.podiums}
                  maxValue={Math.max(driver1Data.podiums, driver2Data.podiums)}
                  icon={Award}
                />
                <BarComparison
                  title="Pole Positions"
                  driver1Value={driver1Data.poles}
                  driver2Value={driver2Data.poles}
                  maxValue={Math.max(driver1Data.poles, driver2Data.poles)}
                  icon={Target}
                />
                <BarComparison
                  title="2025 Season Points"
                  driver1Value={driver1Data.points}
                  driver2Value={driver2Data.points}
                  maxValue={Math.max(driver1Data.points, driver2Data.points)}
                  icon={TrendingUp}
                />
              </div>
            </CardContent>
          </Card>

          {/* Head-to-Head Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Head-to-Head Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-4">Career Comparison</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>More Wins</span>
                      <span className={driver1Data.wins > driver2Data.wins ? 'text-green-600' : driver1Data.wins === driver2Data.wins ? 'text-yellow-600' : 'text-red-600'}>
                        {driver1Data.wins > driver2Data.wins ? driver1Data.name : driver1Data.wins === driver2Data.wins ? 'Tied' : driver2Data.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>More Podiums</span>
                      <span className={driver1Data.podiums > driver2Data.podiums ? 'text-green-600' : driver1Data.podiums === driver2Data.podiums ? 'text-yellow-600' : 'text-red-600'}>
                        {driver1Data.podiums > driver2Data.podiums ? driver1Data.name : driver1Data.podiums === driver2Data.podiums ? 'Tied' : driver2Data.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>More Championships</span>
                      <span className={driver1Data.championships > driver2Data.championships ? 'text-green-600' : driver1Data.championships === driver2Data.championships ? 'text-yellow-600' : 'text-red-600'}>
                        {driver1Data.championships > driver2Data.championships ? driver1Data.name : driver1Data.championships === driver2Data.championships ? 'Tied' : driver2Data.name}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">2025 Season</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Higher Points</span>
                      <span className={driver1Data.points > driver2Data.points ? 'text-green-600' : 'text-red-600'}>
                        {driver1Data.points > driver2Data.points ? driver1Data.name : driver2Data.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Better Avg Position</span>
                      <span className={driver1Data.avgPosition < driver2Data.avgPosition ? 'text-green-600' : 'text-red-600'}>
                        {driver1Data.avgPosition < driver2Data.avgPosition ? driver1Data.name : driver2Data.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Points Gap</span>
                      <span>
                        {Math.abs(driver1Data.points - driver2Data.points)} pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reset Button */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => {
                setDriver1('');
                setDriver2('');
              }}
            >
              Compare Different Drivers
            </Button>
          </div>
        </>
      )}
    </div>
  );
}