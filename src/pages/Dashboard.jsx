import { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  PersonAdd as PersonAddIcon,
  Payments as PaymentsIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import StatCard from '../components/dashboard/StatCard';
import FilterToolbar from '../components/dashboard/FilterToolbar';
import CampaignPerformanceChart from '../components/dashboard/CampaignPerformanceChart';
import LeadQualityDistribution from '../components/dashboard/LeadQualityDistribution';
import TopCampaignsTable from '../components/dashboard/TopCampaignsTable';
import { 
  getPerformanceData, 
  getLeadQualityData, 
  getTopCampaigns, 
  getDashboardStats 
} from '../services/dashboardService';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [performanceLoading, setPerformanceLoading] = useState(true);
  const [qualityLoading, setQualityLoading] = useState(true);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  
  const [dashboardStats, setDashboardStats] = useState({
    totalLeads: 0,
    leadsChange: 0,
    conversionRate: 0,
    conversionChange: 0,
    costPerLead: 0,
    costChange: 0,
    revenue: 0,
    revenueChange: 0,
  });
  
  const [performanceData, setPerformanceData] = useState([]);
  const [leadQualityData, setLeadQualityData] = useState([]);
  const [topCampaigns, setTopCampaigns] = useState([]);
  
  const [filters, setFilters] = useState({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
    campaign: 'all',
    source: 'all',
    quality: 'all',
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setStatsLoading(true);
        setPerformanceLoading(true);
        setQualityLoading(true);
        setCampaignsLoading(true);
        
        // Fetch dashboard stats
        const stats = await getDashboardStats(filters);
        setDashboardStats(stats);
        setStatsLoading(false);
        
        // Fetch performance data for the chart
        const performance = await getPerformanceData(filters);
        setPerformanceData(performance);
        setPerformanceLoading(false);
        
        // Fetch lead quality distribution
        const quality = await getLeadQualityData(filters);
        setLeadQualityData(quality);
        setQualityLoading(false);
        
        // Fetch top campaigns
        const campaigns = await getTopCampaigns(filters);
        setTopCampaigns(campaigns);
        setCampaignsLoading(false);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
        setStatsLoading(false);
        setPerformanceLoading(false);
        setQualityLoading(false);
        setCampaignsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 700 }}>
          Marketing Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your campaigns, track lead quality, and optimize performance
        </Typography>
      </Box>
      
      <FilterToolbar onFilterChange={handleFilterChange} loading={loading} />
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Leads"
            value={dashboardStats.totalLeads.toLocaleString()}
            icon={<PersonAddIcon />}
            change={dashboardStats.leadsChange}
            color="primary"
            loading={statsLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Conversion Rate"
            value={dashboardStats.conversionRate.toFixed(1)}
            icon={<TrendingUpIcon />}
            change={dashboardStats.conversionChange}
            color="secondary"
            suffix="%"
            loading={statsLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cost per Lead"
            value={dashboardStats.costPerLead.toFixed(2)}
            icon={<PaymentsIcon />}
            change={-dashboardStats.costChange}
            color="error"
            prefix="$"
            loading={statsLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue Generated"
            value={dashboardStats.revenue.toLocaleString()}
            icon={<BarChartIcon />}
            change={dashboardStats.revenueChange}
            color="success"
            prefix="$"
            loading={statsLoading}
          />
        </Grid>
        
        {/* Performance Chart */}
        <Grid item xs={12} md={8}>
          <CampaignPerformanceChart 
            data={performanceData}
            loading={performanceLoading}
          />
        </Grid>
        
        {/* Lead Quality Distribution */}
        <Grid item xs={12} md={4}>
          <LeadQualityDistribution 
            data={leadQualityData}
            loading={qualityLoading}
          />
        </Grid>
        
        {/* Top Campaigns Table */}
        <Grid item xs={12}>
          <TopCampaignsTable 
            data={topCampaigns}
            loading={campaignsLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;