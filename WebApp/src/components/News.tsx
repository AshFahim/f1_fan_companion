import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTheme } from './ThemeProvider';
import { 
  Newspaper, 
  Clock, 
  TrendingUp, 
  MessageCircle,
  ThumbsUp,
  Flame,
  Eye,
  ExternalLink,
  Zap
} from 'lucide-react';

interface NewsProps {
  teamTheme: any;
}

export function News({ teamTheme }: NewsProps) {
  const [activeTab, setActiveTab] = useState('latest');
  const { isDarkMode } = useTheme();

  const mockNews = [
    {
      id: 1,
      title: "Verstappen Sets New Lap Record in Bahrain Pre-Season Testing",
      summary: "Max Verstappen posted the fastest time on day 2 of pre-season testing, showing Red Bull's continued dominance. The lap was 0.3 seconds faster than last year's pole position time.",
      source: "F1 Official",
      time: "2 hours ago",
      category: "Testing",
      reactions: { likes: 234, fires: 89, comments: 45 },
      trending: true,
      priority: "high"
    },
    {
      id: 2,
      title: "Ferrari Unveils Revolutionary New Aerodynamic Package",
      summary: "Scuderia Ferrari has introduced a completely redesigned front wing and floor for the 2025 season, promising significant performance gains in high-speed corners.",
      source: "Motorsport.com",
      time: "4 hours ago",
      category: "Technical",
      reactions: { likes: 187, fires: 112, comments: 67 },
      trending: false,
      priority: "medium"
    },
    {
      id: 3,
      title: "Hamilton Confirms Long-Term Ferrari Contract Extension",
      summary: "Lewis Hamilton has signed a multi-year extension with Ferrari, securing his future with the Prancing Horse through 2027. The deal includes performance bonuses and development input.",
      source: "Sky Sports F1",
      time: "6 hours ago",
      category: "Drivers",
      reactions: { likes: 456, fires: 203, comments: 128 },
      trending: true,
      priority: "high"
    },
    {
      id: 4,
      title: "New Sprint Format Announced for 2025 Season",
      summary: "FIA reveals changes to the Sprint weekend format, with qualifying sessions restructured and additional points awarded. The new format will debut at the Miami Grand Prix.",
      source: "F1 Official",
      time: "8 hours ago",
      category: "Regulations",
      reactions: { likes: 145, fires: 67, comments: 89 },
      trending: false,
      priority: "medium"
    },
    {
      id: 5,
      title: "McLaren's Norris Predicts Closest Championship Battle Ever",
      summary: "Lando Norris believes the 2025 season will see the most competitive field in F1 history, with six teams capable of winning races regularly throughout the season.",
      source: "ESPN F1",
      time: "12 hours ago",
      category: "Predictions",
      reactions: { likes: 198, fires: 84, comments: 52 },
      trending: false,
      priority: "low"
    }
  ];

  const getFilteredNews = () => {
    switch (activeTab) {
      case 'trending':
        return mockNews.filter(article => article.trending);
      case 'teams':
        return mockNews.filter(article => 
          article.category === 'Technical' || 
          article.title.toLowerCase().includes('ferrari') ||
          article.title.toLowerCase().includes('red bull') ||
          article.title.toLowerCase().includes('mclaren')
        );
      default:
        return mockNews;
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-red-500';
      case 'medium': return 'border-l-4 border-l-yellow-500';
      default: return 'border-l-4 border-l-green-500';
    }
  };

  const handleReaction = (articleId: number, type: 'likes' | 'fires' | 'comments') => {
    console.log(`Reacted to article ${articleId} with ${type}`);
  };

  return (
    <div className="space-y-8 pb-24 lg:pb-8">
      {/* Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-card to-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Newspaper className="h-6 w-6" style={{ color: teamTheme?.primary }} />
            </div>
            <div>
              <h1>F1 Pulse</h1>
              <p className="text-sm text-muted-foreground font-normal">Latest news and updates</p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Breaking News Banner */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Zap className="h-6 w-6 text-red-500" />
                <div className="absolute inset-0 animate-ping">
                  <Zap className="h-6 w-6 text-red-500 opacity-75" />
                </div>
              </div>
              <Badge variant="destructive" className="animate-pulse font-semibold">
                BREAKING
              </Badge>
            </div>
            <p className="text-sm font-medium">
              🚨 Verstappen fastest in final pre-season test session - Red Bull looking dominant again
            </p>
          </div>
        </CardContent>
      </Card>

      {/* News Tabs */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 m-6 mb-0 bg-muted/50">
              <TabsTrigger value="latest" className="flex items-center gap-2 data-[state=active]:bg-card">
                <Clock className="h-4 w-4" />
                Latest
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-2 data-[state=active]:bg-card">
                <TrendingUp className="h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-2 data-[state=active]:bg-card">
                <Flame className="h-4 w-4" />
                Teams
              </TabsTrigger>
            </TabsList>

            {['latest', 'trending', 'teams'].map((tab) => (
              <TabsContent key={tab} value={tab} className="p-6 pt-4">
                <div className="grid-spaced">
                  {getFilteredNews().map((article) => (
                    <Card 
                      key={article.id} 
                      className={`group hover:shadow-2xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm team-glow-hover ${getPriorityBorder(article.priority)}`}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge 
                              variant="outline" 
                              className="font-medium"
                              style={{ borderColor: teamTheme?.primary, color: teamTheme?.primary }}
                            >
                              {article.category}
                            </Badge>
                            {article.trending && (
                              <Badge className="bg-red-500/20 text-red-500 border-red-500/30 font-semibold">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Read
                          </Button>
                        </div>

                        <h3 className="text-lg leading-tight group-hover:text-blue-600 cursor-pointer transition-colors">
                          {article.title}
                        </h3>

                        <div 
                          className="p-4 rounded-xl border-l-4"
                          style={{ 
                            backgroundColor: `rgba(${teamTheme?.rgb}, 0.05)`,
                            borderLeftColor: teamTheme?.primary
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div 
                              className="p-1 rounded"
                              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.2)` }}
                            >
                              <Zap className="h-3 w-3" style={{ color: teamTheme?.primary }} />
                            </div>
                            <span className="text-xs font-medium" style={{ color: teamTheme?.primary }}>
                              AI Summary
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{article.summary}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                <Newspaper className="h-3 w-3" />
                              </div>
                              <span className="font-medium">{article.source}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{article.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Reaction Buttons */}
                        <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReaction(article.id, 'likes')}
                            className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span className="font-medium">{article.reactions.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReaction(article.id, 'fires')}
                            className="flex items-center gap-2 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            <Flame className="h-4 w-4" />
                            <span className="font-medium">{article.reactions.fires}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReaction(article.id, 'comments')}
                            className="flex items-center gap-2 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span className="font-medium">{article.reactions.comments}</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button 
                    variant="outline" 
                    className="btn-glow"
                    style={{ borderColor: teamTheme?.primary }}
                  >
                    Load More Articles
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Today's Hot Topics */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ backgroundColor: `rgba(${teamTheme?.rgb}, 0.1)` }}
            >
              <Flame className="h-5 w-5 text-red-500" />
            </div>
            Today's Hot Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="h-5 w-5 text-red-500" />
                <Badge variant="secondary" className="bg-red-500/20 text-red-600">Hot</Badge>
              </div>
              <p className="font-medium mb-1">Pre-season testing results</p>
              <p className="text-xs text-muted-foreground">1.2k discussions</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-600">Rising</Badge>
              </div>
              <p className="font-medium mb-1">Driver contract extensions</p>
              <p className="text-xs text-muted-foreground">789 discussions</p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="h-5 w-5 text-green-500" />
                <Badge variant="secondary" className="bg-green-500/20 text-green-600">Watched</Badge>
              </div>
              <p className="font-medium mb-1">2025 regulation changes</p>
              <p className="text-xs text-muted-foreground">456 discussions</p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}