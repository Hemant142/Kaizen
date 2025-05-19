import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  Avatar, 
  Box, 
  Tooltip, 
  Menu, 
  MenuItem, 
  InputBase, 
  alpha, 
  useTheme 
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ sidebarOpen, onSidebarToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenu = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleProfileClick = () => {
    handleClose();
    navigate('/settings');
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(sidebarOpen && {
          ml: { sm: '240px' },
          width: { sm: `calc(100% - 240px)` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onSidebarToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            borderRadius: 2,
            px: 2,
            py: 0.5,
            ml: { xs: 0, sm: 2 },
            width: { xs: '100%', sm: 300 },
          }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search..."
              sx={{ 
                color: 'inherit',
                '& .MuiInputBase-input': {
                  width: '100%',
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              aria-label="notifications"
              onClick={handleNotificationsMenu}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Menu
            id="notifications-menu"
            anchorEl={notificationsAnchorEl}
            keepMounted
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: { width: 320, maxWidth: '100%' },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleNotificationsClose}>
              <Box>
                <Typography variant="body2" fontWeight={600}>New Campaign Created</Typography>
                <Typography variant="caption" color="text.secondary">Facebook Ads Q3 was created by John</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleNotificationsClose}>
              <Box>
                <Typography variant="body2" fontWeight={600}>Lead Quality Alert</Typography>
                <Typography variant="caption" color="text.secondary">Email campaign conversion rate dropped by 15%</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleNotificationsClose}>
              <Box>
                <Typography variant="body2" fontWeight={600}>Report Ready</Typography>
                <Typography variant="caption" color="text.secondary">Monthly performance report is ready to view</Typography>
              </Box>
            </MenuItem>
          </Menu>
          
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Account">
              <IconButton
                onClick={handleMenu}
                size="small"
                aria-controls={anchorEl ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? 'true' : undefined}
              >
                <Avatar
                  alt={currentUser?.name || "User"}
                  src={currentUser?.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{ sx: { width: 200 } }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleProfileClick}>
              <PersonIcon fontSize="small" sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SettingsIcon fontSize="small" sx={{ mr: 2 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;