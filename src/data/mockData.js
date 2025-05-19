// Mock users for authentication
export const mockUsers = [
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
    createdAt: '2023-05-15T10:30:00Z',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
    createdAt: '2023-06-20T14:45:00Z',
  },
];

// Generate performance data for the dashboard chart
export const generatePerformanceData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate random but somewhat realistic data
    const facebook = Math.floor(Math.random() * 30) + 15;
    const google = Math.floor(Math.random() * 25) + 10;
    const email = Math.floor(Math.random() * 20) + 5;
    
    // Conversion rates
    const facebookConversion = Math.floor(Math.random() * 30) + 40;
    const googleConversion = Math.floor(Math.random() * 30) + 35;
    const emailConversion = Math.floor(Math.random() * 30) + 30;
    
    // Cost per lead
    const facebookCpl = Math.floor(Math.random() * 20) + 10;
    const googleCpl = Math.floor(Math.random() * 25) + 15;
    const emailCpl = Math.floor(Math.random() * 10) + 5;
    
    data.push({
      date: date.toISOString(),
      facebook,
      google,
      email,
      total: facebook + google + email,
      facebookConversion,
      googleConversion,
      emailConversion,
      facebookCpl,
      googleCpl,
      emailCpl,
    });
  }
  
  return data;
};

// Generate lead quality distribution data
export const generateLeadQualityData = () => {
  return [
    { name: 'High', value: Math.floor(Math.random() * 400) + 300 },
    { name: 'Medium', value: Math.floor(Math.random() * 500) + 500 },
    { name: 'Low', value: Math.floor(Math.random() * 300) + 100 },
  ];
};

// Generate top campaigns data
export const generateTopCampaigns = () => {
  const campaigns = [
    {
      id: 1,
      name: 'Facebook Ads Q2',
      source: 'facebook',
      status: 'Active',
      leads: Math.floor(Math.random() * 300) + 200,
      conversionRate: Math.floor(Math.random() * 20) + 35,
      costPerLead: Math.floor(Math.random() * 20) + 15,
      performance: Math.floor(Math.random() * 30) + 10,
    },
    {
      id: 2,
      name: 'Google Search',
      source: 'google',
      status: 'Active',
      leads: Math.floor(Math.random() * 200) + 150,
      conversionRate: Math.floor(Math.random() * 20) + 30,
      costPerLead: Math.floor(Math.random() * 25) + 20,
      performance: Math.floor(Math.random() * 20) + 5,
    },
    {
      id: 3,
      name: 'Email Nurture',
      source: 'email',
      status: 'Active',
      leads: Math.floor(Math.random() * 150) + 100,
      conversionRate: Math.floor(Math.random() * 30) + 40,
      costPerLead: Math.floor(Math.random() * 10) + 5,
      performance: Math.floor(Math.random() * 40) + 15,
    },
    {
      id: 4,
      name: 'LinkedIn B2B',
      source: 'linkedin',
      status: 'Paused',
      leads: Math.floor(Math.random() * 100) + 50,
      conversionRate: Math.floor(Math.random() * 15) + 25,
      costPerLead: Math.floor(Math.random() * 30) + 25,
      performance: Math.floor(Math.random() * 20) - 10,
    },
    {
      id: 5,
      name: 'Instagram Brand',
      source: 'instagram',
      status: 'Active',
      leads: Math.floor(Math.random() * 120) + 80,
      conversionRate: Math.floor(Math.random() * 15) + 20,
      costPerLead: Math.floor(Math.random() * 15) + 20,
      performance: Math.floor(Math.random() * 30) - 15,
    },
  ];
  
  return campaigns;
};

// Generate dashboard stats
export const generateDashboardStats = () => {
  return {
    totalLeads: Math.floor(Math.random() * 1000) + 500,
    leadsChange: Math.floor(Math.random() * 30) + 5,
    conversionRate: Math.floor(Math.random() * 20) + 30,
    conversionChange: Math.floor(Math.random() * 20) + 2,
    costPerLead: Math.floor(Math.random() * 20) + 15,
    costChange: Math.floor(Math.random() * 15) + 1,
    revenue: Math.floor(Math.random() * 50000) + 30000,
    revenueChange: Math.floor(Math.random() * 25) + 5,
  };
};