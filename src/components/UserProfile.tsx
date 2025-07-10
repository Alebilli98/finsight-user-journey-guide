import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, Building2, Mail, Phone, MapPin, Calendar,
  CreditCard, FileText, Settings, Upload, Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfileProps {
  user: any;
  onUserUpdate: (userData: any) => void;
}

const UserProfile = ({ user, onUserUpdate }: UserProfileProps) => {
  const [profileData, setProfileData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: "",
    company: user.company || "",
    industry: "",
    companySize: "",
    location: "",
    website: "",
    description: ""
  });

  const [financialData, setFinancialData] = useState({
    monthlyRevenue: user.financialData?.monthlyRevenue || user.monthlyIncome || "",
    employees: user.financialData?.employees || "",
    businessType: user.financialData?.businessType || "",
    accountingSystem: user.financialData?.accountingSystem || "",
    fiscalYearEnd: user.financialData?.fiscalYearEnd || "",
    currency: user.financialData?.currency || "EUR"
  });

  const { toast } = useToast();

  const handleProfileSave = () => {
    const updatedUser = {
      ...user,
      ...profileData
    };
    
    localStorage.setItem("finsight_user", JSON.stringify(updatedUser));
    onUserUpdate(updatedUser);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleFinancialSave = () => {
    const monthlyRevenue = parseFloat(financialData.monthlyRevenue) || 0;
    const employees = parseFloat(financialData.employees) || 0;
    
    const updatedUser = {
      ...user,
      // Update both financialData and direct properties for immediate dashboard reflection
      monthlyIncome: monthlyRevenue,
      financialData: {
        ...user.financialData,
        ...financialData,
        monthlyRevenue: monthlyRevenue,
        employees: employees,
        lastDataUpdate: new Date().toISOString()
      }
    };
    
    localStorage.setItem("finsight_user", JSON.stringify(updatedUser));
    
    // Also update users array
    const savedUsers = JSON.parse(localStorage.getItem("finsight_users") || "[]");
    const updatedUsers = savedUsers.map((u: any) => 
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("finsight_users", JSON.stringify(updatedUsers));
    
    onUserUpdate(updatedUser);
    
    toast({
      title: "Business Data Saved",
      description: `Your business information has been updated. Monthly Revenue: €${monthlyRevenue.toLocaleString()}`,
    });
  };

  const handleFileUpload = (type: string) => {
    toast({
      title: "File Upload",
      description: `${type} upload functionality will be available in the full version.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>{user.company}</span>
                <Badge variant="secondary" className="ml-2">
                  {user.plan} Plan
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business Data</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal and company details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="company"
                      className="pl-10"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      className="pl-10"
                      placeholder="Dubai, UAE"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your business..."
                  value={profileData.description}
                  onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                />
              </div>

              <Button onClick={handleProfileSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Enter your business details for better financial insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRevenue">Monthly Revenue (€)</Label>
                  <Input
                    id="monthlyRevenue"
                    type="number"
                    placeholder="50000"
                    value={financialData.monthlyRevenue}
                    onChange={(e) => setFinancialData({ ...financialData, monthlyRevenue: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input
                    id="employees"
                    type="number"
                    placeholder="10"
                    value={financialData.employees}
                    onChange={(e) => setFinancialData({ ...financialData, employees: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select onValueChange={(value) => setFinancialData({ ...financialData, businessType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="sme">SME</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountingSystem">Accounting System</Label>
                  <Select onValueChange={(value) => setFinancialData({ ...financialData, accountingSystem: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quickbooks">QuickBooks</SelectItem>
                      <SelectItem value="xero">Xero</SelectItem>
                      <SelectItem value="sage">Sage</SelectItem>
                      <SelectItem value="excel">Excel/Manual</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscalYearEnd">Fiscal Year End</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fiscalYearEnd"
                      type="date"
                      className="pl-10"
                      value={financialData.fiscalYearEnd}
                      onChange={(e) => setFinancialData({ ...financialData, fiscalYearEnd: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Primary Currency</Label>
                  <Select 
                    value={financialData.currency}
                    onValueChange={(value) => setFinancialData({ ...financialData, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="AED">AED (د.إ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleFinancialSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Business Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                Upload your financial documents for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="text-center space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="font-semibold">Financial Statements</h3>
                      <p className="text-sm text-gray-600">Upload P&L, Balance Sheet, Cash Flow</p>
                    </div>
                    <Button variant="outline" onClick={() => handleFileUpload("Financial Statements")}>
                      Upload Files
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="text-center space-y-4">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="font-semibold">Bank Statements</h3>
                      <p className="text-sm text-gray-600">Upload recent bank statements</p>
                    </div>
                    <Button variant="outline" onClick={() => handleFileUpload("Bank Statements")}>
                      Upload Files
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="text-center space-y-4">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="font-semibold">Tax Returns</h3>
                      <p className="text-sm text-gray-600">Upload tax documents</p>
                    </div>
                    <Button variant="outline" onClick={() => handleFileUpload("Tax Returns")}>
                      Upload Files
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="text-center space-y-4">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="font-semibold">Business Documents</h3>
                      <p className="text-sm text-gray-600">Invoices, contracts, etc.</p>
                    </div>
                    <Button variant="outline" onClick={() => handleFileUpload("Business Documents")}>
                      Upload Files
                    </Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Current Plan</h4>
                    <p className="text-sm text-gray-600">You are on the {user.plan} plan</p>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Export Data</h4>
                    <p className="text-sm text-gray-600">Download your financial data</p>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
