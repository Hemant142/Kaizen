import { useState } from 'react';
import { 
  Box, 
  TextField, 
  MenuItem, 
  Button, 
  Chip, 
  IconButton, 
  Tooltip, 
  Popover,
  Paper, 
  useTheme,
  Typography,
  Divider,
  Grid,
} from '@mui/material';
import { 
  FilterList as FilterIcon,
  DateRange as DateRangeIcon, 
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const FilterToolbar = ({ onFilterChange, loading }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateRangeChange = (newValue, type) => {
    setDateRange({
      ...dateRange,
      [type]: newValue,
    });
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const handleCampaignChange = (event) => {
    setSelectedCampaign(event.target.value);
  };

  const handleQualityChange = (event) => {
    setSelectedQuality(event.target.value);
  };

  const handleApplyFilters = () => {
    const filters = [];
    
    if (selectedSource !== 'all') {
      filters.push({ type: 'source', value: selectedSource, label: `Source: ${selectedSource}` });
    }
    
    if (selectedCampaign !== 'all') {
      filters.push({ type: 'campaign', value: selectedCampaign, label: `Campaign: ${selectedCampaign}` });
    }
    
    if (selectedQuality !== 'all') {
      filters.push({ type: 'quality', value: selectedQuality, label: `Quality: ${selectedQuality}` });
    }
    
    setActiveFilters(filters);
    
    onFilterChange({
      dateRange,
      campaign: selectedCampaign,
      source: selectedSource,
      quality: selectedQuality,
    });
    
    handleClose();
  };

  const handleResetFilters = () => {
    setSelectedCampaign('all');
    setSelectedSource('all');
    setSelectedQuality('all');
    setDateRange({
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
    });
    setActiveFilters([]);
    
    onFilterChange({
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
      campaign: 'all',
      source: 'all',
      quality: 'all',
    });
  };

  const handleRemoveFilter = (filterToRemove) => {
    const updatedFilters = activeFilters.filter(
      (filter) => filter.type !== filterToRemove.type
    );
    
    setActiveFilters(updatedFilters);
    
    // Update the corresponding state
    if (filterToRemove.type === 'campaign') {
      setSelectedCampaign('all');
    } else if (filterToRemove.type === 'source') {
      setSelectedSource('all');
    } else if (filterToRemove.type === 'quality') {
      setSelectedQuality('all');
    }
    
    // Apply the updated filters
    onFilterChange({
      dateRange,
      campaign: filterToRemove.type === 'campaign' ? 'all' : selectedCampaign,
      source: filterToRemove.type === 'source' ? 'all' : selectedSource,
      quality: filterToRemove.type === 'quality' ? 'all' : selectedQuality,
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              px: 1,
            }}
          >
            <DateRangeIcon color="action" sx={{ mr: 1 }} />
            <DatePicker
              value={dateRange.start}
              onChange={(newValue) => handleDateRangeChange(newValue, 'start')}
              slotProps={{
                textField: {
                  size: "small",
                  variant: "standard",
                  InputProps: {
                    disableUnderline: true,
                  },
                },
              }}
            />
            <Typography sx={{ mx: 1 }}>-</Typography>
            <DatePicker
              value={dateRange.end}
              onChange={(newValue) => handleDateRangeChange(newValue, 'end')}
              slotProps={{
                textField: {
                  size: "small",
                  variant: "standard",
                  InputProps: {
                    disableUnderline: true,
                  },
                },
              }}
            />
          </Box>

          {activeFilters.map((filter) => (
            <Chip
              key={filter.type}
              label={filter.label}
              onDelete={() => handleRemoveFilter(filter)}
              color="primary"
              variant="outlined"
              size="small"
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<FilterIcon />}
            endIcon={<ExpandMoreIcon />}
            onClick={handleClick}
          >
            Filters
          </Button>
          
          <Tooltip title="Refresh data">
            <IconButton 
              color="primary"
              onClick={() => onFilterChange({ 
                dateRange, 
                campaign: selectedCampaign, 
                source: selectedSource,
                quality: selectedQuality,
              })}
              disabled={loading}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Paper sx={{ p: 3, width: 400, maxWidth: '100%' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Filter Options
            </Typography>
            
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Campaign"
                  value={selectedCampaign}
                  onChange={handleCampaignChange}
                  size="small"
                >
                  <MenuItem value="all">All Campaigns</MenuItem>
                  <MenuItem value="facebook_q2">Facebook Ads Q2</MenuItem>
                  <MenuItem value="google_search">Google Search</MenuItem>
                  <MenuItem value="email_nurture">Email Nurture</MenuItem>
                  <MenuItem value="linkedin_b2b">LinkedIn B2B</MenuItem>
                  <MenuItem value="instagram_awareness">Instagram Brand</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Lead Source"
                  value={selectedSource}
                  onChange={handleSourceChange}
                  size="small"
                >
                  <MenuItem value="all">All Sources</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="google">Google</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="linkedin">LinkedIn</MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="organic">Organic</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Lead Quality"
                  value={selectedQuality}
                  onChange={handleQualityChange}
                  size="small"
                >
                  <MenuItem value="all">All Qualities</MenuItem>
                  <MenuItem value="high">High (80-100)</MenuItem>
                  <MenuItem value="medium">Medium (50-79)</MenuItem>
                  <MenuItem value="low">Low (0-49)</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleResetFilters} color="inherit">
                  Reset
                </Button>
                <Button onClick={handleApplyFilters} variant="contained" color="primary">
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default FilterToolbar;