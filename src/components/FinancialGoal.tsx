import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Target, TrendingUp, TrendingDown, DollarSign, 
  Percent, Calendar, Trophy, Rocket, PiggyBank, 
  LineChart, CheckCircle2, Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  category: string;
  icon: any;
  color: string;
  deadline?: string;
}

const FinancialGoal = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Aumentare Revenue",
      description: "Obiettivo di crescita fatturato del 25%",
      target: 125000,
      current: 87000,
      category: "Crescita",
      icon: TrendingUp,
      color: "text-green-500",
      deadline: "2025-12-31"
    },
    {
      id: "2",
      title: "Ridurre Costi Operativi",
      description: "Diminuire i costi del 15%",
      target: 15,
      current: 8,
      category: "Efficienza",
      icon: TrendingDown,
      color: "text-blue-500",
      deadline: "2025-06-30"
    },
    {
      id: "3",
      title: "Migliorare Margine Lordo",
      description: "Raggiungere 40% di margine",
      target: 40,
      current: 32,
      category: "Redditività",
      icon: Percent,
      color: "text-purple-500",
      deadline: "2025-09-30"
    }
  ]);

  const [budgets, setBudgets] = useState([
    { id: "1", category: "Marketing", allocated: 15000, spent: 8200, icon: Rocket },
    { id: "2", category: "Personale", allocated: 45000, spent: 42000, icon: Target },
    { id: "3", category: "Operazioni", allocated: 25000, spent: 18500, icon: DollarSign },
    { id: "4", category: "Investimenti", allocated: 30000, spent: 12000, icon: PiggyBank },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    deadline: ""
  });

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const achievements = [
    { title: "Primo Obiettivo", description: "Completa il tuo primo obiettivo", unlocked: true, icon: Trophy },
    { title: "Budget Master", description: "Rispetta il budget per 3 mesi", unlocked: true, icon: PiggyBank },
    { title: "Crescita Rapida", description: "Crescita >20% in un trimestre", unlocked: false, icon: Rocket },
    { title: "Efficienza Pro", description: "Riduci i costi del 15%", unlocked: false, icon: Target },
  ];

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: `Obiettivo: ${newGoal.target}`,
      target: parseFloat(newGoal.target),
      current: 0,
      category: "Personalizzato",
      icon: Target,
      color: "text-primary",
      deadline: newGoal.deadline
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: "", target: "", deadline: "" });
    
    toast({
      title: "Obiettivo Creato! 🎯",
      description: "Il tuo nuovo obiettivo è stato aggiunto"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Obiettivi Finanziari
          </h1>
          <p className="text-muted-foreground mt-2">
            Definisci e monitora i tuoi traguardi aziendali
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuovo Obiettivo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crea Nuovo Obiettivo</DialogTitle>
              <DialogDescription>
                Definisci un nuovo obiettivo finanziario per la tua azienda
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo Obiettivo</Label>
                <Input
                  id="title"
                  placeholder="es: Aumentare fatturato"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Numerico</Label>
                <Input
                  id="target"
                  type="number"
                  placeholder="es: 100000"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Scadenza (Opzionale)</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
              <Button onClick={handleAddGoal} className="w-full">
                Crea Obiettivo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="goals">Obiettivi</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="achievements">Traguardi</TabsTrigger>
        </TabsList>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const progress = calculateProgress(goal.current, goal.target);
              
              return (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted ${goal.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {goal.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">
                      {goal.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-bold">{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className={getProgressColor(progress)} />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Attuale: {goal.current.toLocaleString()}</span>
                        <span>Target: {goal.target.toLocaleString()}</span>
                      </div>
                    </div>
                    {goal.deadline && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Scadenza: {new Date(goal.deadline).toLocaleDateString('it-IT')}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>
                Monitora le tue spese rispetto al budget allocato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {budgets.map((budget) => {
                const Icon = budget.icon;
                const spent = (budget.spent / budget.allocated) * 100;
                const remaining = budget.allocated - budget.spent;
                
                return (
                  <div key={budget.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{budget.category}</p>
                          <p className="text-sm text-muted-foreground">
                            €{budget.spent.toLocaleString()} / €{budget.allocated.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          €{remaining.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">rimanenti</p>
                      </div>
                    </div>
                    <Progress value={spent} className={spent > 90 ? "bg-red-500" : spent > 75 ? "bg-yellow-500" : "bg-green-500"} />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Utilizzato {spent.toFixed(0)}%</span>
                      {spent > 90 && (
                        <Badge variant="destructive" className="text-xs">
                          Attenzione!
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              
              return (
                <Card 
                  key={index} 
                  className={`${achievement.unlocked ? 'border-primary shadow-md' : 'opacity-60'}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{achievement.title}</h3>
                          {achievement.unlocked && (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <Badge className="mt-3">Sbloccato! 🎉</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialGoal;
