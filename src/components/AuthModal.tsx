import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, EyeOff, Building2, Mail, Lock, User, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userData: any) => void;
  defaultTab?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess, defaultTab = "login" }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    industry: "",
    password: "",
    confirmPassword: ""
  });

  const industries = [
    { value: "commerce", label: "Commercio" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "consulting", label: "Consulenza" },
    { value: "real-estate", label: "Real Estate" },
    { value: "services", label: "Servizi" },
    { value: "manufacturing", label: "Produzione/Manifatturiero" },
    { value: "technology", label: "Tecnologia/IT" },
    { value: "healthcare", label: "Sanità" },
    { value: "education", label: "Educazione/Formazione" },
    { value: "finance", label: "Servizi Finanziari" },
    { value: "hospitality", label: "Ospitalità/Turismo" },
    { value: "retail", label: "Retail/Vendita al dettaglio" },
    { value: "logistics", label: "Logistica/Trasporti" },
    { value: "food-beverage", label: "Food & Beverage" },
    { value: "construction", label: "Costruzioni/Edilizia" },
    { value: "automotive", label: "Automotive" },
    { value: "legal", label: "Servizi Legali" },
    { value: "marketing", label: "Marketing/Pubblicità" },
    { value: "non-profit", label: "No-Profit/ONG" },
    { value: "other", label: "Altro" }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if user exists in localStorage
    const savedUsers = JSON.parse(localStorage.getItem("finsight_users") || "[]");
    const user = savedUsers.find((u: any) => u.email === loginData.email);

    setTimeout(() => {
      if (user && user.password === loginData.password) {
        // Check if user has completed onboarding
        const isFirstLogin = !user.hasCompletedOnboarding;
        
        const userData = {
          ...user,
          lastLogin: new Date().toISOString()
        };
        
        // Update user's last login
        const updatedUsers = savedUsers.map((u: any) => 
          u.email === loginData.email ? userData : u
        );
        localStorage.setItem("finsight_users", JSON.stringify(updatedUsers));
        localStorage.setItem("finsight_user", JSON.stringify(userData));
        
        onAuthSuccess({ ...userData, isFirstLogin });
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${userData.firstName}!`,
        });
        onClose();
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!signupData.industry) {
      toast({
        title: "Industry Required",
        description: "Please select your industry.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Check if user already exists
    const savedUsers = JSON.parse(localStorage.getItem("finsight_users") || "[]");
    const existingUser = savedUsers.find((u: any) => u.email === signupData.email);

    setTimeout(() => {
      if (existingUser) {
        toast({
          title: "Account Already Exists",
          description: "An account with this email already exists. Please login instead.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (signupData.email && signupData.password && signupData.firstName) {
        const userData = {
          id: Date.now(),
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          email: signupData.email,
          company: signupData.company,
          industry: signupData.industry,
          password: signupData.password,
          plan: "Free",
          registrationDate: new Date().toISOString(),
          hasCompletedOnboarding: false,
          financialData: {
            monthlyIncome: 0,
            monthlyExpenses: 0,
            currentSavings: 0,
            investments: 0,
            goals: []
          }
        };
        
        // Save to users array
        const updatedUsers = [...savedUsers, userData];
        localStorage.setItem("finsight_users", JSON.stringify(updatedUsers));
        localStorage.setItem("finsight_user", JSON.stringify(userData));
        
        onAuthSuccess({ ...userData, isFirstLogin: true });
        toast({
          title: "Account Created Successfully!",
          description: "Welcome to FinSight! Let's get you started.",
        });
        onClose();
      } else {
        toast({
          title: "Signup Failed",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg shadow-md">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">FinSight</DialogTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                <Building2 className="h-3 w-3 mr-1" />
                Dubai, UAE
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your FinSight dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        className="pl-10 pr-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join FinSight and start your financial transformation journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-firstname"
                          placeholder="Mario"
                          className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname">Last Name</Label>
                      <Input
                        id="signup-lastname"
                        placeholder="Rossi"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="mario@yourcompany.com"
                        className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-company">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-company"
                        placeholder="Your Company Ltd"
                        className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={signupData.company}
                        onChange={(e) => setSignupData({ ...signupData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-industry">Industry *</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                      <Select
                        value={signupData.industry}
                        onValueChange={(value) => setSignupData({ ...signupData, industry: value })}
                        required
                      >
                        <SelectTrigger className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Seleziona la tua industria" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {industries.map((industry) => (
                            <SelectItem key={industry.value} value={industry.value}>
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password * (min 6 characters)</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        className="pl-10 pr-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password *</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm password"
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
