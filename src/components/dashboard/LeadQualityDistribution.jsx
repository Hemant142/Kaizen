import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Tooltip as MuiTooltip,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const QUALITY_COLORS = {
  high: '#4caf50',
  medium: '#ffca28',
  low: '#f44336',
};

const LeadQualityDistribution = ({ data, loading }) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              Lead Quality Distribution
            </Typography>
            <MuiTooltip 
              title="Lead quality scoring is based on engagement, conversion likelihood, and demographic fit" 
              arrow
            >
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </MuiTooltip>
          </Box>
        }
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
              <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
              <MenuItem onClick={handleMenuClose}>Export Data</MenuItem>
              <MenuItem onClick={handleMenuClose}>Set Alerts</MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={QUALITY_COLORS[entry.name.toLowerCase()]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} leads`, 'Count']}
                />
                <Legend 
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  formatter={(value) => {
                    return (
                      <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                        {value} Quality
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadQualityDistribution;