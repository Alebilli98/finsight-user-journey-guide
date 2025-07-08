
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, Phone, MapPin, Clock, Send, Building2,
  MessageSquare, Users, Calendar
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Building2,
      title: "Headquarters",
      details: ["Dubai International Free Zone", "IFZA Business Park", "Dubai, UAE"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@finsight.ae", "support@finsight.ae"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+971 4 XXX XXXX", "Available 9 AM - 6 PM GST"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9 AM - 6 PM", "Saturday: 10 AM - 2 PM", "Sunday: Closed"]
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "Questions about our platform, pricing, or features",
      action: "Send Message"
    },
    {
      icon: Users,
      title: "Sales & Partnerships",
      description: "Interested in enterprise solutions or partnerships",
      action: "Contact Sales"
    },
    {
      icon: Calendar,
      title: "Schedule a Demo",
      description: "Book a personalized demo of FinSight platform",
      action: "Book Demo"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800">
            <Building2 className="h-3 w-3 mr-1" />
            Get In Touch
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact FinSight</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your financial management? We're here to help you get started 
            or answer any questions about our platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your needs..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Support Options */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Support Options */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How Can We Help?</h3>
              <div className="space-y-4">
                {supportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Icon className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{option.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                            <Button variant="outline" size="sm">
                              {option.action}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
