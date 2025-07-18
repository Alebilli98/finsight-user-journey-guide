
import CommerceDashboard from "@/components/dashboards/CommerceDashboard";
import EcommerceDashboard from "@/components/dashboards/EcommerceDashboard";
import ConsultingDashboard from "@/components/dashboards/ConsultingDashboard";

interface DashboardProps {
  user?: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  // Get user's industry to determine which dashboard to show
  const userIndustry = user?.industry;

  // Render the appropriate dashboard based on user's industry
  switch (userIndustry) {
    case 'commerce':
      return <CommerceDashboard user={user} />;
    case 'ecommerce':
      return <EcommerceDashboard user={user} />;
    case 'consulting':
      return <ConsultingDashboard user={user} />;
    default:
      // For users without an industry set or other industries, show the generic dashboard
      return <CommerceDashboard user={user} />; // Default to commerce dashboard
  }
};

export default Dashboard;
