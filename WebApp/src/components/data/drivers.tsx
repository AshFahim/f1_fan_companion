export interface Driver {
  id: string;
  name: string;
  number: number;
  team: string;
  teamId: string;
  country: string;
  flag: string;
  carModel: string;
  
  // Racing Statistics
  wins: number;
  podiums: number;
  poles: number;
  dnfs: number;
  points: number;
  avgPosition: number;
  championships: number;
  careerStarts: number;
  fastestLaps: number;
  
  // Personal Info
  age: number;
  nationality: string;
  birthPlace: string;
  careerStart: number;
  
  // Current Season
  currentSeasonPoints: number;
  currentSeasonPosition: number;
  
  // Sponsors and Partners
  sponsors: string[];
  
  // Avatar/Helmet Style
  helmet: string;
  avatarStyle: 'helmet' | 'stylized' | 'minimal';
  primaryColor: string;
  secondaryColor: string;
}

export const enhancedDrivers: Driver[] = [
  {
    id: 'verstappen',
    name: 'Max Verstappen',
    number: 1,
    team: 'Oracle Red Bull Racing',
    teamId: 'red-bull',
    country: 'Netherlands',
    nationality: 'Dutch',
    flag: '🇳🇱',
    carModel: 'RB20',
    age: 27,
    birthPlace: 'Hasselt, Belgium',
    careerStart: 2015,
    
    // Racing Statistics
    wins: 54,
    podiums: 98,
    poles: 38,
    dnfs: 12,
    points: 2586,
    avgPosition: 2.1,
    championships: 3,
    careerStarts: 184,
    fastestLaps: 28,
    
    // Current Season
    currentSeasonPoints: 575,
    currentSeasonPosition: 1,
    
    // Sponsors
    sponsors: [
      'Red Bull Energy Drink',
      'Tag Heuer',
      'CarNext',
      'Jumbo Supermarkets',
      'Viaplay',
      'G-Star RAW'
    ],
    
    helmet: '🔵⚡',
    avatarStyle: 'helmet',
    primaryColor: '#1e40af',
    secondaryColor: '#fbbf24'
  },
  {
    id: 'leclerc',
    name: 'Charles Leclerc',
    number: 16,
    team: 'Scuderia Ferrari',
    teamId: 'ferrari',
    country: 'Monaco',
    nationality: 'Monégasque',
    flag: '🇲🇨',
    carModel: 'SF-24',
    age: 27,
    birthPlace: 'Monte Carlo, Monaco',
    careerStart: 2018,
    
    // Racing Statistics
    wins: 5,
    podiums: 29,
    poles: 24,
    dnfs: 8,
    points: 1247,
    avgPosition: 4.2,
    championships: 0,
    careerStarts: 142,
    fastestLaps: 9,
    
    // Current Season
    currentSeasonPoints: 206,
    currentSeasonPosition: 3,
    
    // Sponsors
    sponsors: [
      'Ferrari',
      'Richard Mille',
      'Palantir Technologies',
      'Ray-Ban',
      'Giorgio Armani',
      'Puma'
    ],
    
    helmet: '🔴⚡',
    avatarStyle: 'stylized',
    primaryColor: '#b91c1c',
    secondaryColor: '#fbbf24'
  },
  {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    number: 44,
    team: 'Mercedes-AMG PETRONAS',
    teamId: 'mercedes',
    country: 'United Kingdom',
    nationality: 'British',
    flag: '🇬🇧',
    carModel: 'W15',
    age: 40,
    birthPlace: 'Stevenage, England',
    careerStart: 2007,
    
    // Racing Statistics
    wins: 103,
    podiums: 197,
    poles: 104,
    dnfs: 23,
    points: 4405,
    avgPosition: 3.1,
    championships: 7,
    careerStarts: 334,
    fastestLaps: 67,
    
    // Current Season
    currentSeasonPoints: 164,
    currentSeasonPosition: 7,
    
    // Sponsors
    sponsors: [
      'Mercedes-Benz',
      'Tommy Hilfiger',
      'IWC Schaffhausen',
      'Monster Energy',
      'Bose',
      'MV Agusta'
    ],
    
    helmet: '💜⭐',
    avatarStyle: 'minimal',
    primaryColor: '#0f172a',
    secondaryColor: '#10b981'
  },
  {
    id: 'norris',
    name: 'Lando Norris',
    number: 4,
    team: 'McLaren Formula 1 Team',
    teamId: 'mclaren',
    country: 'United Kingdom',
    nationality: 'British',
    flag: '🇬🇧',
    carModel: 'MCL38',
    age: 25,
    birthPlace: 'Bristol, England',
    careerStart: 2019,
    
    // Racing Statistics
    wins: 3,
    podiums: 12,
    poles: 5,
    dnfs: 6,
    points: 892,
    avgPosition: 5.8,
    championships: 0,
    careerStarts: 118,
    fastestLaps: 6,
    
    // Current Season
    currentSeasonPoints: 331,
    currentSeasonPosition: 2,
    
    // Sponsors
    sponsors: [
      'McLaren',
      'Quadrant',
      'Bell Helmets',
      'Coca-Cola',
      'Hilton',
      'OKX'
    ],
    
    helmet: '🧡🟢',
    avatarStyle: 'helmet',
    primaryColor: '#ea580c',
    secondaryColor: '#10b981'
  },
  {
    id: 'sainz',
    name: 'Carlos Sainz Jr.',
    number: 55,
    team: 'Scuderia Ferrari',
    teamId: 'ferrari',
    country: 'Spain',
    nationality: 'Spanish',
    flag: '🇪🇸',
    carModel: 'SF-24',
    age: 30,
    birthPlace: 'Madrid, Spain',
    careerStart: 2015,
    
    // Racing Statistics
    wins: 3,
    podiums: 23,
    poles: 6,
    dnfs: 11,
    points: 1162,
    avgPosition: 6.2,
    championships: 0,
    careerStarts: 202,
    fastestLaps: 3,
    
    // Current Season
    currentSeasonPoints: 184,
    currentSeasonPosition: 5,
    
    // Sponsors
    sponsors: [
      'Ferrari',
      'Estrella Galicia',
      'Palantir Technologies',
      'Santander',
      'Puma',
      'Richard Mille'
    ],
    
    helmet: '🔴🟡',
    avatarStyle: 'stylized',
    primaryColor: '#b91c1c',
    secondaryColor: '#fbbf24'
  },
  {
    id: 'russell',
    name: 'George Russell',
    number: 63,
    team: 'Mercedes-AMG PETRONAS',
    teamId: 'mercedes',
    country: 'United Kingdom',
    nationality: 'British',
    flag: '🇬🇧',
    carModel: 'W15',
    age: 26,
    birthPlace: 'King\'s Lynn, England',
    careerStart: 2019,
    
    // Racing Statistics
    wins: 1,
    podiums: 11,
    poles: 2,
    dnfs: 4,
    points: 376,
    avgPosition: 7.4,
    championships: 0,
    careerStarts: 118,
    fastestLaps: 2,
    
    // Current Season
    currentSeasonPoints: 111,
    currentSeasonPosition: 8,
    
    // Sponsors
    sponsors: [
      'Mercedes-Benz',
      'Tommy Hilfiger',
      'IWC Schaffhausen',
      'Monster Energy',
      'Bose',
      'Alpinestars'
    ],
    
    helmet: '🔵⚪',
    avatarStyle: 'minimal',
    primaryColor: '#0f172a',
    secondaryColor: '#3b82f6'
  }
];

// Mock API functions that would connect to Supabase
export const driverAPI = {
  async getDriverById(id: string): Promise<Driver | null> {
    // This would be a Supabase query in production
    // const { data, error } = await supabase
    //   .from('drivers')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    return enhancedDrivers.find(driver => driver.id === id) || null;
  },
  
  async getAllDrivers(): Promise<Driver[]> {
    // This would be a Supabase query in production
    // const { data, error } = await supabase
    //   .from('drivers')
    //   .select('*')
    //   .order('currentSeasonPosition');
    
    return enhancedDrivers;
  },
  
  async getDriversByTeam(teamId: string): Promise<Driver[]> {
    // This would be a Supabase query in production
    // const { data, error } = await supabase
    //   .from('drivers')
    //   .select('*')
    //   .eq('teamId', teamId);
    
    return enhancedDrivers.filter(driver => driver.teamId === teamId);
  },
  
  async updateDriverStats(id: string, stats: Partial<Driver>): Promise<boolean> {
    // This would be a Supabase update in production
    // const { error } = await supabase
    //   .from('drivers')
    //   .update(stats)
    //   .eq('id', id);
    
    console.log('Updating driver stats for:', id, stats);
    return true;
  }
};