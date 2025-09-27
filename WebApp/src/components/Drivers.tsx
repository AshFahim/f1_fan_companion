import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DriverAvatar, DriverFlagAvatar, DriverCard } from './DriverAvatar';
import { Driver, driverAPI, enhancedDrivers } from './data/drivers';
import { F1Teams } from './data/teams';
import { useTheme } from './ThemeProvider';
import { 
  Users, 
  Search, 
  Filter,
  Trophy,
  Target,
  Award,
  TrendingUp,
  Calendar,
  Car,
  Grid3X3,
  List,
  ChevronRight
} from 'lucide-react';

interface DriversProps {
  onDriverSelect: (driver: Driver) => void;
  teamTheme: any;
  isMobile: boolean;
}

export function Drivers({ onDriverSelect, teamTheme, isMobile }: DriversProps) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [sortBy, setSortBy] = useState('currentSeasonPosition');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(isMobile ? 'list' : 'grid');
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    filterAndSortDrivers();
  }, [drivers, searchTerm, selectedTeam, sortBy]);

  useEffect(() => {
    setViewMode(isMobile ? 'list' : 'grid');
  }, [isMobile]);

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      // In production, this would fetch from Supabase
      const driversData = enhancedDrivers;
      setDrivers(driversData);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortDrivers = () => {
    let filtered = drivers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.nationality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by team
    if (selectedTeam !== 'all') {
      filtered = filtered.filter(driver => driver.teamId === selectedTeam);
    }

    // Sort drivers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'currentSeasonPosition':
          return a.currentSeasonPosition - b.currentSeasonPosition;
        case 'currentSeasonPoints':
          return b.currentSeasonPoints - a.currentSeasonPoints;
        case 'wins':
          return b.wins - a.wins;
        case 'championships':
          return b.championships - a.championships;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        default:
          return a.currentSeasonPosition - b.currentSeasonPosition;
      }
    });

    setFilteredDrivers(filtered);
  };

  const getPositionBadgeColor = (position: number) => {
    if (position === 1) return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
    if (position <= 3) return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    if (position <= 10) return 'bg-green-500/20 text-green-600 border-green-500/30';
    return 'bg-red-500/20 text-red-600 border-red-500/30';
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${isMobile ? 'pb-6' : 'pb-8'}`}>
        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="card-mobile text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading drivers...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isMobile ? 'pb-6' : 'pb-8'}`}>
      {/* Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-card to-card/50 backdrop-blur-sm animate-fade-in-up">
        <CardHeader className="card-mobile">
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Users className="h-6 w-6" style={{ color: teamTheme?.primary }} />
            </div>
            <div>
              <h1 className={isMobile ? 'text-xl' : 'text-2xl'}>F1 Drivers 2025</h1>
              <p className="text-sm text-muted-foreground font-normal">
                Complete driver profiles and statistics
              </p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card className="border-0 shadow-xl glass-card animate-fade-in-up-delay">
        <CardContent className="card-mobile">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4'}`}>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  pl-10 bg-input-background border-border/50 focus:border-team-accent
                  ${isMobile ? 'h-12 text-base' : ''}
                `}
              />
            </div>

            {/* Team Filter */}
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className={`bg-input-background border-border/50 ${isMobile ? 'h-12' : ''}`}>
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {F1Teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: team.primary }}
                      />
                      <span className={isMobile ? 'text-sm' : ''}>{team.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className={`bg-input-background border-border/50 ${isMobile ? 'h-12' : ''}`}>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="currentSeasonPosition">Championship Position</SelectItem>
                <SelectItem value="currentSeasonPoints">Current Points</SelectItem>
                <SelectItem value="wins">Career Wins</SelectItem>
                <SelectItem value="championships">Championships</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="age">Age</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode & Stats */}
            <div className="flex items-center justify-between gap-2">
              {!isMobile && (
                <div className="flex rounded-lg border border-border/50 overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none px-3 h-10"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none px-3 h-10"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>{filteredDrivers.length} drivers</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Championship Standings - Mobile Optimized */}
      <Card className="border-0 shadow-xl glass-card animate-fade-in-up-delay">
        <CardHeader className="card-mobile pb-4">
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Trophy className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            </div>
            <span className={isMobile ? 'text-lg' : 'text-xl'}>
              2025 Championship Standings
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="card-mobile pt-0">
          <div className="space-y-3">
            {filteredDrivers.slice(0, isMobile ? 5 : 10).map((driver, index) => (
              <Card 
                key={driver.id}
                className={`
                  card-interactive hover:shadow-lg transition-all duration-300 cursor-pointer group 
                  bg-card/50 backdrop-blur-sm border-0
                  ${isMobile ? 'p-3' : 'p-4'}
                `}
                onClick={() => onDriverSelect(driver)}
              >
                <div className="flex items-center gap-3">
                  <Badge className={`px-3 py-1 font-bold ${getPositionBadgeColor(driver.currentSeasonPosition)}`}>
                    P{driver.currentSeasonPosition}
                  </Badge>
                  
                  <DriverFlagAvatar 
                    driver={driver} 
                    size={isMobile ? 'sm' : 'md'} 
                    interactive 
                    onClick={() => onDriverSelect(driver)}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`
                        font-semibold ensure-contrast group-hover:text-blue-600 transition-colors truncate
                        ${isMobile ? 'text-base' : 'text-lg'}
                      `}>
                        {driver.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        #{driver.number}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate">{driver.team}</span>
                      {!isMobile && (
                        <>
                          <span>•</span>
                          <span>{driver.carModel}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right flex items-center gap-2">
                    <div>
                      <div className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`} style={{ color: teamTheme?.primary }}>
                        {driver.currentSeasonPoints}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                    {isMobile && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredDrivers.length > (isMobile ? 5 : 10) && (
              <Button 
                variant="ghost" 
                className="w-full mt-4 btn-touch"
                onClick={() => {/* Show more */}}
              >
                Show All {filteredDrivers.length} Drivers
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Driver Grid/List */}
      <div className="animate-fade-in-up-delay">
        {viewMode === 'list' || isMobile ? (
          <div className="space-y-4">
            {filteredDrivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                onClick={() => onDriverSelect(driver)}
                showStats={!isMobile}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.map((driver) => {
              const driverTeam = F1Teams.find(team => team.id === driver.teamId);
              
              return (
                <Card 
                  key={driver.id}
                  className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 glass-card team-glow-hover card-interactive"
                  onClick={() => onDriverSelect(driver)}
                >
                  <CardContent className="p-6">
                    {/* Driver Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <DriverAvatar 
                        driver={driver} 
                        size="xl" 
                        interactive 
                        onClick={() => onDriverSelect(driver)}
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold ensure-contrast group-hover:text-blue-600 transition-colors mb-1">
                          {driver.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{driver.nationality}</span>
                          <span>•</span>
                          <span>{driver.age} years</span>
                        </div>
                      </div>
                    </div>

                    {/* Team Info */}
                    <div 
                      className="p-3 rounded-lg mb-4 border"
                      style={{ 
                        backgroundColor: `rgba(${driverTeam?.rgb}, 0.05)`,
                        borderColor: `rgba(${driverTeam?.rgb}, 0.2)`
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">Team</div>
                          <div className="font-medium ensure-contrast">{driver.team}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Car</div>
                          <div className="font-medium ensure-contrast">{driver.carModel}</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">{driver.wins}</div>
                        <div className="text-xs text-muted-foreground">Wins</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{driver.podiums}</div>
                        <div className="text-xs text-muted-foreground">Podiums</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{driver.poles}</div>
                        <div className="text-xs text-muted-foreground">Poles</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-orange-600">{driver.championships}</div>
                        <div className="text-xs text-muted-foreground">Titles</div>
                      </div>
                    </div>

                    {/* Current Season */}
                    <div 
                      className="p-3 rounded-lg border-l-4"
                      style={{ 
                        backgroundColor: `rgba(${teamTheme?.rgb}, 0.05)`,
                        borderLeftColor: teamTheme?.primary
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">2025 Championship</div>
                          <div className="font-semibold" style={{ color: teamTheme?.primary }}>
                            P{driver.currentSeasonPosition} • {driver.currentSeasonPoints} pts
                          </div>
                        </div>
                        <Trophy className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <Button 
                      className="w-full mt-4 btn-glow btn-touch"
                      variant="outline"
                      style={{ borderColor: `rgba(${driverTeam?.rgb}, 0.3)` }}
                    >
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {filteredDrivers.length === 0 && (
        <Card className="border-0 shadow-xl glass-card">
          <CardContent className="card-mobile text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold ensure-contrast mb-2">No drivers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}