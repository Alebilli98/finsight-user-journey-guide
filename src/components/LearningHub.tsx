import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Video, TrendingUp, Users, Lightbulb, 
  Clock, Search, Star, Play, FileText, Award,
  Target, PieChart, Briefcase, DollarSign
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: "Base" | "Intermedio" | "Avanzato";
  icon: any;
  image?: string;
}

interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail?: string;
}

const LearningHub = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const articles: Article[] = [
    {
      id: "1",
      title: "Cos'è l'EBITDA e perché è importante",
      description: "Scopri il principale indicatore di redditività operativa e come interpretarlo per valutare la salute della tua azienda.",
      category: "Finanza",
      readTime: "5 min",
      difficulty: "Base",
      icon: PieChart
    },
    {
      id: "2",
      title: "Cash Flow: Il Cuore dell'Azienda",
      description: "Impara a gestire il flusso di cassa per garantire la liquidità necessaria e far crescere il tuo business.",
      category: "Finanza",
      readTime: "7 min",
      difficulty: "Base",
      icon: DollarSign
    },
    {
      id: "3",
      title: "KPI Essenziali per il Tuo Business",
      description: "I 10 indicatori chiave che ogni imprenditore deve monitorare per prendere decisioni informate.",
      category: "Management",
      readTime: "6 min",
      difficulty: "Intermedio",
      icon: Target
    },
    {
      id: "4",
      title: "Margine Lordo vs Margine Netto",
      description: "Differenze fondamentali tra i tipi di margine e come utilizzarli per ottimizzare la redditività.",
      category: "Finanza",
      readTime: "4 min",
      difficulty: "Base",
      icon: TrendingUp
    },
    {
      id: "5",
      title: "Budgeting: Pianificare il Successo",
      description: "Tecniche pratiche per creare budget realistici e monitorare le performance aziendali.",
      category: "Pianificazione",
      readTime: "8 min",
      difficulty: "Intermedio",
      icon: Briefcase
    },
    {
      id: "6",
      title: "Analisi della Concorrenza",
      description: "Come analizzare i competitor per identificare opportunità e migliorare il posizionamento di mercato.",
      category: "Strategia",
      readTime: "10 min",
      difficulty: "Avanzato",
      icon: Users
    }
  ];

  const videos: VideoContent[] = [
    {
      id: "1",
      title: "Introduzione ai Bilanci Aziendali",
      description: "Un tour guidato per capire come leggere e interpretare i principali documenti finanziari.",
      duration: "12:30",
      category: "Finanza"
    },
    {
      id: "2",
      title: "Come Ridurre i Costi Operativi",
      description: "Strategie concrete per ottimizzare le spese e migliorare l'efficienza operativa.",
      duration: "8:45",
      category: "Efficienza"
    },
    {
      id: "3",
      title: "Pricing Strategy per Massimizzare i Profitti",
      description: "Tecniche di pricing avanzate per trovare il punto ottimale tra volume e margine.",
      duration: "15:20",
      category: "Strategia"
    },
    {
      id: "4",
      title: "Dashboard: Interpretare i Dati",
      description: "Come utilizzare le dashboard per prendere decisioni rapide e informate.",
      duration: "10:15",
      category: "Analytics"
    },
    {
      id: "5",
      title: "Break-Even Analysis Spiegato Semplice",
      description: "Calcola il punto di pareggio e pianifica la crescita della tua azienda.",
      duration: "7:30",
      category: "Finanza"
    },
    {
      id: "6",
      title: "Gestione del Working Capital",
      description: "Ottimizza il capitale circolante per migliorare la liquidità aziendale.",
      duration: "11:00",
      category: "Finanza"
    }
  ];

  const quickTips = [
    {
      icon: Lightbulb,
      title: "Tip del Giorno",
      content: "Monitora il tuo margine lordo settimanalmente per identificare trend e problemi in anticipo."
    },
    {
      icon: Award,
      title: "Best Practice",
      content: "Dedica 15 minuti al giorno per rivedere i tuoi KPI principali - la costanza è la chiave del successo."
    },
    {
      icon: Star,
      title: "Consiglio Pro",
      content: "Automatizza la raccolta dati per risparmiare tempo e ridurre gli errori nelle analisi finanziarie."
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Base": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermedio": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Avanzato": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Learning Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            Impara, cresci e trasforma la tua azienda
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca articoli, video, argomenti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <Card key={index} className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="articles" className="gap-2">
            <FileText className="w-4 h-4" />
            Articoli
          </TabsTrigger>
          <TabsTrigger value="videos" className="gap-2">
            <Video className="w-4 h-4" />
            Video
          </TabsTrigger>
        </TabsList>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => {
              const Icon = article.icon;
              
              return (
                <Card key={article.id} className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge className={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{article.category}</Badge>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Leggi Articolo
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <Play className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform relative z-10" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{video.category}</Badge>
                  <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Play className="w-4 h-4 mr-2" />
                    Guarda Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningHub;
