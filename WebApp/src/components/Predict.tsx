import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Clock, 
  Target, 
  Trophy, 
  Calendar,
  CheckCircle,
  XCircle,
  Award
} from 'lucide-react';
import { mockRaces, mockDrivers } from './data/teams';

interface PredictProps {
  userProfile: any;
  setUserProfile: (profile: any) => void;
  teamTheme: any;
}

export function Predict({ userProfile, setUserProfile, teamTheme }: PredictProps) {
  const [selectedWinner, setSelectedWinner] = useState('');
  const [selectedPodium, setSelectedPodium] = useState(['', '', '']);
  const [submitted, setSubmitted] = useState(false);

  const nextRace = mockRaces[0];
  const timeUntilRace = new Date(nextRace.date).getTime() - new Date().getTime();
  const hoursUntil = Math.ceil(timeUntilRace / (1000 * 60 * 60));

  const handleSubmitPrediction = () => {
    if (!selectedWinner) return;

    const newPrediction = {
      raceId: nextRace.id,
      raceName: nextRace.name,
      winner: selectedWinner,
      podium: selectedPodium,
      submittedAt: new Date().toISOString(),
      points: null // Will be calculated after race
    };

    setUserProfile({
      ...userProfile,
      predictions: [...userProfile.predictions, newPrediction]
    });

    setSubmitted(true);
  };

  const mockPreviousPredictions = [
    {
      raceId: 'abu-dhabi-2024',
      raceName: 'Abu Dhabi Grand Prix',
      winner: 'Max Verstappen',
      actual: 'Max Verstappen',
      points: 25,
      correct: true
    },
    {
      raceId: 'las-vegas-2024',
      raceName: 'Las Vegas Grand Prix',
      winner: 'Charles Leclerc',
      actual: 'George Russell',
      points: 0,
      correct: false
    },
    {
      raceId: 'brazil-2024',
      raceName: 'São Paulo Grand Prix',
      winner: 'Max Verstappen',
      actual: 'Max Verstappen',
      points: 25,
      correct: true
    }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" style={{ color: teamTheme?.primary }} />
            Race Predictions
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Next Race Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {nextRace.flag} {nextRace.name}
            </div>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {hoursUntil}h remaining
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              {nextRace.circuit} • {new Date(nextRace.date).toLocaleDateString()}
            </p>
            <div className="text-sm text-muted-foreground">
              Prediction deadline: {hoursUntil > 48 ? 
                `${Math.ceil(hoursUntil / 24)} days` : 
                `${hoursUntil} hours`} remaining
            </div>
          </div>

          {!submitted ? (
            <div className="space-y-6">
              {/* Winner Prediction */}
              <div>
                <label className="block text-sm mb-2">
                  Predict the Race Winner <span className="text-red-500">*</span>
                </label>
                <Select value={selectedWinner} onValueChange={setSelectedWinner}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select race winner..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDrivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.name}>
                        <div className="flex items-center gap-2">
                          <span>{driver.flag}</span>
                          <span>{driver.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({driver.team})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Correct winner prediction: +25 points
                </p>
              </div>

              {/* Podium Prediction (Optional) */}
              <div>
                <label className="block text-sm mb-2">
                  Predict Top 3 (Optional)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((position) => (
                    <div key={position}>
                      <label className="text-xs text-muted-foreground">
                        {position === 0 ? '1st' : position === 1 ? '2nd' : '3rd'}
                      </label>
                      <Select 
                        value={selectedPodium[position]} 
                        onValueChange={(value) => {
                          const newPodium = [...selectedPodium];
                          newPodium[position] = value;
                          setSelectedPodium(newPodium);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {mockDrivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.name}>
                              {driver.flag} {driver.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Correct podium position: +10 points each
                </p>
              </div>

              <Button 
                onClick={handleSubmitPrediction}
                disabled={!selectedWinner}
                className="w-full"
                style={{ backgroundColor: teamTheme?.primary }}
              >
                <Target className="h-4 w-4 mr-2" />
                Submit Prediction
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg mb-2">Prediction Submitted!</h3>
              <p className="text-muted-foreground mb-4">
                Your prediction for {nextRace.name} has been saved.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Winner:</strong> {selectedWinner}</p>
                {selectedPodium.filter(p => p).length > 0 && (
                  <p><strong>Podium:</strong> {selectedPodium.filter(p => p).join(', ')}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Races */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Races</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRaces.slice(1, 3).map((race) => (
              <div key={race.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm">{race.flag} {race.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(race.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Previous Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Previous Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPreviousPredictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm">{prediction.raceName}</p>
                  <p className="text-xs text-muted-foreground">
                    Predicted: {prediction.winner}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Actual: {prediction.actual}
                  </p>
                </div>
                <div className="text-right">
                  {prediction.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mb-1" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mb-1" />
                  )}
                  <p className="text-sm">+{prediction.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}