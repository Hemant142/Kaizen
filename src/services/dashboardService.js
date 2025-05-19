import { 
  generatePerformanceData, 
  generateLeadQualityData, 
  generateTopCampaigns,
  generateDashboardStats
} from '../data/mockData';

// Simulated API call to get performance data for the chart
export const getPerformanceData = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, we're just returning mock data
      // In a real app, this would fetch from an API with the provided filters
      const data = generatePerformanceData(30);
      resolve(data);
    }, 1000);
  });
};

// Simulated API call to get lead quality distribution
export const getLeadQualityData = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = generateLeadQualityData();
      resolve(data);
    }, 800);
  });
};

// Simulated API call to get top campaigns
export const getTopCampaigns = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = generateTopCampaigns();
      resolve(data);
    }, 1200);
  });
};

// Simulated API call to get dashboard stats
export const getDashboardStats = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = generateDashboardStats();
      resolve(data);
    }, 600);
  });
};

// Simulated API call to get leads by source
export const getLeadsBySource = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { source: 'Facebook', count: Math.floor(Math.random() * 300) + 200 },
        { source: 'Google', count: Math.floor(Math.random() * 250) + 150 },
        { source: 'Email', count: Math.floor(Math.random() * 200) + 100 },
        { source: 'LinkedIn', count: Math.floor(Math.random() * 150) + 50 },
        { source: 'Instagram', count: Math.floor(Math.random() * 100) + 50 },
        { source: 'Organic', count: Math.floor(Math.random() * 80) + 20 },
      ];
      resolve(data);
    }, 900);
  });
};

// Simulated API call to get campaign suggestions
export const getCampaignSuggestions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggestions = [
        {
          id: 1,
          title: 'Increase budget for Facebook campaign',
          description: 'Facebook campaign is performing 25% better than average. Consider increasing budget by 15-20%.',
          impact: 'high',
          category: 'budget',
        },
        {
          id: 2,
          title: 'Optimize Google ad targeting',
          description: 'CTR is below average. Refine audience targeting and keyword selection.',
          impact: 'medium',
          category: 'targeting',
        },
        {
          id: 3,
          title: 'Improve email subject lines',
          description: 'Open rates have decreased by 12%. Test new subject lines to improve engagement.',
          impact: 'medium',
          category: 'content',
        },
        {
          id: 4,
          title: 'Pause underperforming LinkedIn ads',
          description: 'LinkedIn campaign has high CPA. Consider pausing or restructuring.',
          impact: 'high',
          category: 'optimization',
        },
      ];
      resolve(suggestions);
    }, 1100);
  });
};