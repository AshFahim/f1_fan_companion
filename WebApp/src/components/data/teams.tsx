export const F1Teams = [
  {
    id: 'red-bull',
    name: 'Oracle Red Bull Racing',
    primary: '#1e40af', // Deep royal blue
    secondary: '#f8fafc',
    accent: '#3b82f6',
    rgb: '30, 64, 175',
    gradient: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
    drivers: ['Max Verstappen', 'Sergio Pérez']
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari',
    primary: '#b91c1c', // Classic Ferrari red
    secondary: '#fef2f2',
    accent: '#dc2626',
    rgb: '185, 28, 28',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
    drivers: ['Charles Leclerc', 'Carlos Sainz']
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG PETRONAS',
    primary: '#0f172a', // Mercedes silver-black
    secondary: '#f8fafc',
    accent: '#475569',
    rgb: '15, 23, 42',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    drivers: ['Lewis Hamilton', 'George Russell']
  },
  {
    id: 'mclaren',
    name: 'McLaren Formula 1 Team',
    primary: '#ea580c', // McLaren papaya orange
    secondary: '#fff7ed',
    accent: '#f97316',
    rgb: '234, 88, 12',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
    drivers: ['Lando Norris', 'Oscar Piastri']
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin Aramco',
    primary: '#065f46', // British racing green
    secondary: '#ecfdf5',
    accent: '#059669',
    rgb: '6, 95, 70',
    gradient: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
    drivers: ['Fernando Alonso', 'Lance Stroll']
  },
  {
    id: 'alpine',
    name: 'BWT Alpine F1 Team',
    primary: '#1d4ed8', // Alpine blue
    secondary: '#eff6ff',
    accent: '#3b82f6',
    rgb: '29, 78, 216',
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
    drivers: ['Esteban Ocon', 'Pierre Gasly']
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    primary: '#1e3a8a', // Williams blue
    secondary: '#eff6ff',
    accent: '#3b82f6',
    rgb: '30, 58, 138',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
    drivers: ['Alex Albon', 'Franco Colapinto']
  },
  {
    id: 'alpha-tauri',
    name: 'Visa Cash App RB',
    primary: '#312e81', // RB deep blue
    secondary: '#eef2ff',
    accent: '#4f46e5',
    rgb: '49, 46, 129',
    gradient: 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)',
    drivers: ['Yuki Tsunoda', 'Daniel Ricciardo']
  },
  {
    id: 'haas',
    name: 'MoneyGram Haas F1',
    primary: '#991b1b', // Haas red
    secondary: '#fef2f2',
    accent: '#dc2626',
    rgb: '153, 27, 27',
    gradient: 'linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)',
    drivers: ['Kevin Magnussen', 'Nico Hulkenberg']
  },
  {
    id: 'sauber',
    name: 'Stake F1 Team Kick Sauber',
    primary: '#047857', // Sauber green
    secondary: '#f0fdf4',
    accent: '#059669',
    rgb: '4, 120, 87',
    gradient: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
    drivers: ['Valtteri Bottas', 'Zhou Guanyu']
  }
];

// Keep existing mock data with updated structure
export const mockDrivers = [
  {
    id: 'verstappen',
    name: 'Max Verstappen',
    number: 1,
    team: 'Oracle Red Bull Racing',
    teamId: 'red-bull',
    country: 'Netherlands',
    flag: '🇳🇱',
    wins: 54,
    podiums: 98,
    poles: 38,
    points: 575,
    avgPosition: 2.1,
    championships: 3,
    helmet: '🔵⚡',
    sponsors: ['Red Bull', 'Tag Heuer', 'CarNext']
  },
  {
    id: 'leclerc',
    name: 'Charles Leclerc',
    number: 16,
    team: 'Scuderia Ferrari',
    teamId: 'ferrari',
    country: 'Monaco',
    flag: '🇲🇨',
    wins: 5,
    podiums: 29,
    poles: 24,
    points: 206,
    avgPosition: 4.2,
    championships: 0,
    helmet: '🔴⚡',
    sponsors: ['Ferrari', 'Richard Mille', 'Palantir']
  },
  {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    number: 44,
    team: 'Mercedes-AMG PETRONAS',
    teamId: 'mercedes',
    country: 'United Kingdom',
    flag: '🇬🇧',
    wins: 103,
    podiums: 197,
    poles: 104,
    points: 164,
    avgPosition: 5.1,
    championships: 7,
    helmet: '💜⭐',
    sponsors: ['Mercedes', 'Tommy Hilfiger', 'IWC']
  },
  {
    id: 'norris',
    name: 'Lando Norris',
    number: 4,
    team: 'McLaren Formula 1 Team',
    teamId: 'mclaren',
    country: 'United Kingdom',
    flag: '🇬🇧',
    wins: 3,
    podiums: 12,
    poles: 5,
    points: 331,
    avgPosition: 3.8,
    championships: 0,
    helmet: '🧡🟢',
    sponsors: ['McLaren', 'Quadrant', 'Bell Helmets']
  },
  {
    id: 'sainz',
    name: 'Carlos Sainz',
    number: 55,
    team: 'Scuderia Ferrari',
    teamId: 'ferrari',
    country: 'Spain',
    flag: '🇪🇸',
    wins: 3,
    podiums: 23,
    poles: 6,
    points: 184,
    avgPosition: 4.8,
    championships: 0,
    helmet: '🔴🟡',
    sponsors: ['Ferrari', 'Estrella Galicia', 'Palantir']
  }
];

export const mockRaces = [
  {
    id: 'bahrain-2025',
    name: 'Bahrain Grand Prix',
    country: 'Bahrain',
    flag: '🇧🇭',
    date: '2025-03-02',
    time: '15:00',
    timezone: 'GMT+3',
    circuit: 'Bahrain International Circuit',
    laps: 57,
    distance: '308.238 km',
    isUpcoming: true
  },
  {
    id: 'saudi-2025',
    name: 'Saudi Arabian Grand Prix',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    date: '2025-03-09',
    time: '20:00',
    timezone: 'GMT+3',
    circuit: 'Jeddah Corniche Circuit',
    laps: 50,
    distance: '308.450 km',
    isUpcoming: true
  },
  {
    id: 'australia-2025',
    name: 'Australian Grand Prix',
    country: 'Australia',
    flag: '🇦🇺',
    date: '2025-03-16',
    time: '15:00',
    timezone: 'GMT+11',
    circuit: 'Albert Park Circuit',
    laps: 58,
    distance: '307.574 km',
    isUpcoming: true
  }
];