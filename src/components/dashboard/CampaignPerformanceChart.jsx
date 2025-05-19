import { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Box, 
  Tab, 
  Tabs, 
  Skeleton, 
  useTheme, 
  CircularProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
} from 'recharts';
import { MoreVert as MoreIcon } from '@mui/icons-material';
import { formatDate } from '../../utils/dateUtils';

const CampaignPerformanceChart = ({ data, loading, timeframe = 'month' }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState('leads');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  useEffect(() => {
    if (data && !loading) {
      setChartData(data);
    }
  }, [data, loading]);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getYAxisDomain = () => {
    if (activeTab === 'leads') {
      return [0, 'auto'];
    } else if (activeTab === 'conversion') {
      return [0, 100];
    } else if (activeTab === 'cost') {
      return [0, 'auto'];
    }
    return [0, 'auto'];
  };

  const getMetricLabel = () => {
    if (activeTab === 'leads') {
      return 'Lead Volume';
    } else if (activeTab === 'conversion') {
      return 'Conversion Rate (%)';
    } else if (activeTab === 'cost') {
      return 'Cost per Lead ($)';
    }
    return '';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title="Campaign Performance"
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Export Data</MenuItem>
              <MenuItem onClick={handleMenuClose}>View Detailed Report</MenuItem>
              <MenuItem onClick={handleMenuClose}>Set Alert</MenuItem>
            </Menu>
          </>
        }
      />
      <Box sx={{ px: 2, pb: 1 }}>
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          textColor="primary"
          indicatorColor="primary"
          aria-label="campaign metrics tabs"
          variant="fullWidth"
        >
          <Tab label="Lead Volume" value="leads" />
          <Tab label="Conversion Rate" value="conversion" />
          <Tab label="Cost per Lead" value="cost" />
        </Tabs>
      </Box>
      <CardContent sx={{ flex: 1, p: 0, pb: '16px !important' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </Box>
        ) : chartData.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <Typography variant="body1" color="text.secondary">
              No data available
            </Typography>
          </Box>
        ) : (
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => formatDate(value, timeframe)} 
                  stroke={theme.palette.text.secondary}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={getYAxisDomain()}
                  stroke={theme.palette.text.secondary}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => activeTab === 'cost' ? `$${value}` : value}
                />
                <Tooltip 
                  formatter={(value) => activeTab === 'conversion' ? `${value}%` : activeTab === 'cost' ? `$${value}` : value}
                  labelFormatter={(label) => formatDate(label, 'day')}
                />
                <Legend verticalAlign="top" height={36} />
                
                {activeTab === 'leads' && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="facebook"
                      name="Facebook"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="google"
                      name="Google"
                      stroke={theme.palette.secondary.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="email"
                      name="Email"
                      stroke={theme.palette.success.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </>
                )}
                
                {activeTab === 'conversion' && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="facebookConversion"
                      name="Facebook"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="googleConversion"
                      name="Google"
                      stroke={theme.palette.secondary.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="emailConversion"
                      name="Email"
                      stroke={theme.palette.success.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </>
                )}
                
                {activeTab === 'cost' && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="facebookCpl"
                      name="Facebook"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="googleCpl"
                      name="Google"
                      stroke={theme.palette.secondary.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="emailCpl"
                      name="Email"
                      stroke={theme.palette.success.main}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignPerformanceChart;