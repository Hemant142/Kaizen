import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  PeopleAlt as LeadsIcon,
  BarChart as ReportsIcon,
  Business as ClientsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Campaigns', icon: <CampaignIcon />, path: '/campaigns' },
  { text: 'Leads', icon: <LeadsIcon />, path: '/leads' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { text: 'Clients', icon: <ClientsIcon />, path: '/clients' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = ({ open, onClose, variant = 'permanent' }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const drawer = (
    <>
      <Box sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ mr: 1 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" fill={theme.palette.primary.main} />
            <path d="M4 11C4 10.4477 4.44772 10 5 10H11C11.5523 10 12 10.4477 12 11V19C12 19.5523 11.5523 20 11 20H5C4.44772 20 4 19.5523 4 19V11Z" fill={theme.palette.secondary.main} />
            <path d="M16 11C16 10.4477 15.5523 10 15 10H15C14.4477 10 14 10.4477 14 11V13C14 13.5523 14.4477 14 15 14H15C15.5523 14 16 13.5523 16 13V11Z" fill={theme.palette.accent} />
            <path d="M20 11C20 10.4477 19.5523 10 19 10H19C18.4477 10 18 10.4477 18 11V19C18 19.5523 18.4477 20 19 20H19C19.5523 20 20 19.5523 20 19V11Z" fill={theme.palette.accent} />
          </svg>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          MarketEdge
        </Typography>
      </Box>
      
      <Divider />
      
      {currentUser && (
        <Box
          sx={{
            py: 3,
            px: 3,
            mb: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
            boxShadow: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.name}
            sx={{
              width: 56,
              height: 56,
              mb: 1.5,
              fontSize: 24,
              fontWeight: 700,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              boxShadow: 3,
            }}
          >
            {!currentUser.avatar && currentUser.name && currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, color: 'primary.contrastText', textAlign: 'center' }}>
            {currentUser.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'primary.contrastText', opacity: 0.85, textAlign: 'center' }}>
            {currentUser.role === 'admin' ? 'Administrator' : 'Marketing Manager'}
          </Typography>
        </Box>
      )}
      
      <Divider />
      
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  py: 1,
                  px: 3,
                  color: isActive ? 'primary.main' : 'text.primary',
                  bgcolor: isActive ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
                  '&:hover': {
                    bgcolor: isActive ? 'rgba(63, 81, 181, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                  },
                  borderRight: isActive ? `3px solid ${theme.palette.primary.main}` : 'none',
                  transition: theme.transitions.create(['background-color'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Need Help?
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Check our documentation for tips and guides
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;