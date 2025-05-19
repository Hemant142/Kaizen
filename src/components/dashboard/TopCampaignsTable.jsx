import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  LinearProgress,
  Chip,
  useTheme,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const TopCampaignsTable = ({ data, loading }) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const getPerformanceColor = (value) => {
    if (value > 15) return theme.palette.success.main;
    if (value > 0) return theme.palette.success.light;
    if (value === 0) return theme.palette.text.disabled;
    if (value > -15) return theme.palette.error.light;
    return theme.palette.error.main;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'draft':
        return 'default';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title="Top Performing Campaigns"
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
              <MenuItem onClick={handleMenuClose}>View All Campaigns</MenuItem>
              <MenuItem onClick={handleMenuClose}>Export Data</MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent sx={{ flex: 1, p: 0, '&:last-child': { pb: 0 } }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Campaign</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Leads</TableCell>
                  <TableCell>Conv. Rate</TableCell>
                  <TableCell>Cost / Lead</TableCell>
                  <TableCell>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((campaign) => (
                  <TableRow key={campaign.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 
                              campaign.source === 'facebook' ? theme.palette.primary.main :
                              campaign.source === 'google' ? theme.palette.secondary.main :
                              campaign.source === 'linkedin' ? '#0077B5' :
                              campaign.source === 'instagram' ? '#E1306C' :
                              campaign.source === 'email' ? theme.palette.success.main :
                              theme.palette.grey[500],
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2" component="div" fontWeight={500}>
                          {campaign.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={campaign.status} 
                        size="small" 
                        color={getStatusColor(campaign.status)}
                        variant={campaign.status.toLowerCase() === 'active' ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell>{campaign.leads}</TableCell>
                    <TableCell>{campaign.conversionRate}%</TableCell>
                    <TableCell>${campaign.costPerLead}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ flex: 1, mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(Math.max((campaign.performance + 50) * 0.9, 10), 100)}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: theme.palette.grey[200],
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                bgcolor: getPerformanceColor(campaign.performance),
                              },
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: getPerformanceColor(campaign.performance),
                          }}
                        >
                          {campaign.performance > 0 ? (
                            <ArrowUpwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          ) : campaign.performance < 0 ? (
                            <ArrowDownwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          ) : (
                            <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          )}
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{ fontWeight: 500 }}
                          >
                            {Math.abs(campaign.performance)}%
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCampaignsTable;