import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Users, Award, Globe, Shield, Lightbulb,
  Target, Heart, CheckCircle
} from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously leverage cutting-edge AI and technology to develop the most advanced and intuitive financial solutions."
    },
    {
      icon: Users,
      title: "Client Empowerment", 
      description: "We democratize financial expertise, enabling every startup and SME to make informed strategic decisions."
    },
    {
      icon: Shield,
      title: "Integrity & Trust",
      description: "We operate with the highest standards of transparency, security, and ethical conduct."
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Sophisticated financial tools should be affordable and available to all businesses, regardless of size."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We deliver high-quality products and exceptional user experiences through continuous improvement."
    }
  ];

  const founders = [
    {
      name: "Martín Sannuto",
      role: "Co-Founder & Financial Expert",
      description: "Finance professional with extensive experience in financial analysis, risk management and auditing. M.A. in Economics and Development from University of Florence. Former Ernst & Young with international experience in Luxembourg and Australia.",
      expertise: ["Financial Analysis", "Risk Management", "International Finance", "Startup Strategy"]
    },
    {
      name: "Alessio Bulletti",
      role: "Co-Founder & Investment Advisor",
      description: "Established financial advisor with extensive experience in financial and investment analysis. M.A. in Economics and Banking from University of Siena. Former trader and financial advisor at Fideuram, leading Italian banking group.",
      expertise: ["Investment Strategy", "Financial Advisory", "Market Analysis", "Client Relations"]
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Mission & Vision */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800">
            <Globe className="h-3 w-3 mr-1" />
            Dubai, UAE Based
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Finsk.Ai</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
            We unleash the full potential of startups and SMEs, fostering and driving their growth through 
            an integrated AI-powered technological solution and solid financial advice, enabling them to compete 
            effectively with larger and more established companies.
          </p>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-8 mb-16">
          <div className="text-center">
            <Target className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg opacity-90 max-w-4xl mx-auto">
              To be the leading, indispensable AI-powered financial intelligence platform that empowers 
              every startup and SME to achieve financial mastery and sustainable growth, fundamentally 
              transforming the landscape of small business finance and democratizing access to expert financial guidance.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Founders */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Founders</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{founder.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{founder.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{founder.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Dubai?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">100% Foreign Ownership</h4>
                  <p className="text-sm text-gray-600">Full control without local partners</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Zero Corporate Tax</h4>
                  <p className="text-sm text-gray-600">Significant financial advantages</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Strategic Location</h4>
                  <p className="text-sm text-gray-600">Access to global markets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
