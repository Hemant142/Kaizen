import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const IconWrapper = styled(Box)(({ theme, color }) => ({
  borderRadius: '50%',
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette[color]?.light || theme.palette.primary.light,
  color: theme.palette[color]?.main || theme.palette.primary.main,
  width: 48,
  height: 48,
}));

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType = 'percent', 
  color = 'primary',
  loading = false,
  prefix = '',
  suffix = '',
  showTrend = true
}) => {
  // Determine if change is positive or negative
  const isPositive = change > 0;
  const formattedChange = Math.abs(change).toFixed(1);
  const trendColor = isPositive ? 'success' : 'error';
  const TrendIcon = isPositive ? ArrowUpward : ArrowDownward;
  const changeLabel = changeType === 'percent' ? '%' : '';

  return (
    <Card
      className="animate-fade-in"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              {title}
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', height: 36 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                {prefix}{value}{suffix}
              </Typography>
            )}
          </Box>
          <IconWrapper color={color}>{icon}</IconWrapper>
        </Box>
        
        {showTrend && !loading && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: `${trendColor}.main`,
                bgcolor: `${trendColor}.light`,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                mr: 1,
              }}
            >
              <TrendIcon fontSize="small" />
              <Typography variant="caption" fontWeight={500} sx={{ ml: 0.5 }}>
                {formattedChange}{changeLabel}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              vs. last period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;