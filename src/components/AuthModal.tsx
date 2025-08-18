
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, User, Building2, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userData: any) => void;
  defaultTab?: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess, defaultTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAuthSuccess({
        firstName: "Alessio",
        lastName: "Bulletti",
        email: loginData.email,
        company: "Demo Company",
        plan: "Free Plan"
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAuthSuccess({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        company: signupData.company,
        plan: "Free Plan"
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/3649b85f-a01b-4935-b35c-c20278d06f18.png" 
              alt="Tralis AI Logo" 
              className="h-8 w-auto"
            />
            <div>
              <DialogTitle className="text-xl font-bold bg-tech-gradient bg-clip-text text-transparent font-inter">
                Tralis AI
              </DialogTitle>
              <Badge variant="secondary" className="bg-tech-gradient text-white border-0 text-xs px-2 py-0.5">
                <TrendingUp className="h-3 w-3 mr-1" />
                Financial Intelligence
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
            <TabsTrigger value="signup">{t('auth.signup')}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-dark-blue font-inter">{t('auth.welcome')}</CardTitle>
                <CardDescription className="text-tech-gray font-poppins">
                  {t('auth.credentials')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-dark-blue font-inter">{t('auth.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-tech-gray" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 border-primary/20 focus:border-primary font-poppins"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-dark-blue font-inter">{t('auth.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-tech-gray" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 border-primary/20 focus:border-primary font-poppins"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-tech-gray hover:text-primary"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full tech-button text-white border-0 font-inter"
                    disabled={isLoading}
                  >
                    {isLoading ? t('auth.logging') : t('auth.login')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-dark-blue font-inter">{t('auth.create')}</CardTitle>
                <CardDescription className="text-tech-gray font-poppins">
                  {t('auth.join')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-dark-blue font-inter">{t('auth.firstName')}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-tech-gray" />
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                          className="pl-10 border-primary/20 focus:border-primary font-poppins"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-dark-blue font-inter">{t('auth.lastName')}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-tech-gray" />
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={signupData.lastName}
                          onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                          className="pl-10 border-primary/20 focus:border-primary font-poppins"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="text-dark-blue font-inter">{t('auth.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-tech-gray" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="pl-10 border-primary/20 focus:border-primary font-poppins"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-dark-blue font-inter">{t('auth.company')}</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-tech-gray" />
                      <Input
                        id="company"
                        placeholder="Your Company"
                        value={signupData.company}
                        onChange={(e) => setSignupData({ ...signupData, company: e.target.value })}
                        className="pl-10 border-primary/20 focus:border-primary font-poppins"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="text-dark-blue font-inter">{t('auth.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-tech-gray" />
                      <Input
                        id="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="pl-10 pr-10 border-primary/20 focus:border-primary font-poppins"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-tech-gray hover:text-primary"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full tech-button text-white border-0 font-inter"
                    disabled={isLoading}
                  >
                    {isLoading ? t('auth.creating') : t('auth.signup')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-tech-gray mt-4 font-poppins">
          {t('auth.terms')}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
