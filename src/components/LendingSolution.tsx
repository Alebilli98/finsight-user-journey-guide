
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, TrendingUp, Shield, DollarSign, CheckCircle, 
  AlertTriangle, Info, ArrowRight, Star, Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LendingSolution = () => {
  const { toast } = useToast();

  const creditScore = {
    score: 750,
    rating: "Excellent",
    change: "+15 points",
    factors: [
      { name: "Payment History", score: 95, status: "excellent" },
      { name: "Credit Utilization", score: 82, status: "good" },
      { name: "Credit History", score: 88, status: "good" },
      { name: "Account Mix", score: 90, status: "excellent" },
      { name: "New Credit", score: 78, status: "fair" },
    ]
  };

  const fundingOptions = [
    {
      type: "Business Line of Credit",
      amount: "$50K - $500K",
      rate: "Prime + 2.5%",
      term: "Revolving",
      approval: "92%",
      bestFor: "Working capital, seasonal cash flow",
      requirements: ["2+ years in business", "Good credit score", "$100K+ annual revenue"],
      recommended: true
    },
    {
      type: "Term Loan",
      amount: "$25K - $2M",
      rate: "6.5% - 12%",
      term: "1-5 years",
      approval: "78%",
      bestFor: "Equipment, expansion, large purchases",
      requirements: ["Established business", "Strong cash flow", "Collateral may be required"],
      recommended: false
    },
    {
      type: "SBA Loan",
      amount: "$50K - $5M",
      rate: "Prime + 2.75%",
      term: "Up to 25 years",
      approval: "65%",
      bestFor: "Real estate, long-term investments",
      requirements: ["SBA eligibility", "Personal guarantee", "Detailed business plan"],
      recommended: false
    },
    {
      type: "Invoice Factoring",
      amount: "$10K - $1M",
      rate: "1-5% per month",
      term: "30-90 days",
      approval: "95%",
      bestFor: "B2B businesses with outstanding invoices",
      requirements: ["Creditworthy customers", "Established invoicing", "B2B sales"],
      recommended: false
    },
  ];

  const growthMetrics = [
    { name: "Revenue Growth", current: "15%", target: "20%", status: "on-track" },
    { name: "Profit Margin", current: "23%", target: "25%", status: "excellent" },
    { name: "Cash Runway", current: "8 months", target: "12 months", status: "attention" },
    { name: "Customer Acquisition", current: "12%", target: "15%", status: "on-track" },
  ];

  const handleApplyForFunding = (type: string) => {
    toast({
      title: "Application Started",
      description: `Your application for ${type} has been initiated. You'll receive an email with next steps.`,
    });
  };

  const handleImproveScore = () => {
    toast({
      title: "Credit Improvement Plan",
      description: "Your personalized credit improvement plan has been generated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lending & Credit Solutions</h1>
          <p className="text-gray-600">Understand your creditworthiness and explore funding opportunities</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>Secure Application</span>
        </Button>
      </div>

      {/* Credit Score Assessment */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span>Business Credit Score</span>
            </CardTitle>
            <CardDescription>Your current creditworthiness assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{creditScore.score}</div>
              <div className="flex items-center justify-center space-x-2">
                <Badge className="bg-green-100 text-green-800">{creditScore.rating}</Badge>
                <span className="text-sm text-gray-500">{creditScore.change} this month</span>
              </div>
            </div>

            <div className="space-y-4">
              {creditScore.factors.map((factor) => (
                <div key={factor.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                    <Badge 
                      variant="outline"
                      className={
                        factor.status === 'excellent' ? 'text-green-600 border-green-300' :
                        factor.status === 'good' ? 'text-blue-600 border-blue-300' :
                        'text-orange-600 border-orange-300'
                      }
                    >
                      {factor.status}
                    </Badge>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                  <div className="text-xs text-gray-500 text-right">{factor.score}%</div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleImproveScore}
              className="w-full mt-4 flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Get Improvement Plan</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-purple-600" />
              <span>Growth Readiness</span>
            </CardTitle>
            <CardDescription>Key metrics for funding qualification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {growthMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{metric.name}</p>
                    <p className="text-sm text-gray-600">Current: {metric.current} | Target: {metric.target}</p>
                  </div>
                  <div className="flex items-center">
                    {metric.status === 'excellent' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : metric.status === 'on-track' ? (
                      <Info className="h-5 w-5 text-blue-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Funding Readiness Score</h4>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">8.5/10</div>
              <p className="text-sm text-blue-800">
                Your business shows strong fundamentals for securing funding. Consider applying for growth capital.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funding Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Funding Options</span>
          </CardTitle>
          <CardDescription>
            Explore financing solutions tailored to your business needs and qualifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fundingOptions.map((option, index) => (
              <Card key={index} className={`${option.recommended ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{option.type}</h3>
                        {option.recommended && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Star className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Amount</p>
                          <p className="font-medium text-gray-900">{option.amount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Rate</p>
                          <p className="font-medium text-gray-900">{option.rate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Term</p>
                          <p className="font-medium text-gray-900">{option.term}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Approval Rate</p>
                          <p className="font-medium text-green-600">{option.approval}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Best for:</p>
                          <p className="text-sm text-gray-600">{option.bestFor}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Requirements:</p>
                          <ul className="text-sm text-gray-600">
                            {option.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-center space-x-1">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleApplyForFunding(option.type)}
                      className="ml-4 flex items-center space-x-2"
                      variant={option.recommended ? "default" : "outline"}
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Credit Monitoring</h3>
            <p className="text-sm text-gray-600 mb-4">Track your credit score and get alerts for changes</p>
            <Button variant="outline" size="sm">
              Enable Monitoring
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Growth Planning</h3>
            <p className="text-sm text-gray-600 mb-4">Develop a strategic plan for business expansion</p>
            <Button variant="outline" size="sm">
              Create Plan
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <Info className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Expert Consultation</h3>
            <p className="text-sm text-gray-600 mb-4">Speak with a funding specialist about your options</p>
            <Button variant="outline" size="sm">
              Book Call
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LendingSolution;
