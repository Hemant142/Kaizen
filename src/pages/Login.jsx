import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton, 
  Divider, 
  useTheme, 
  Link as MuiLink,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 400, width: '100%', px: 2 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" fill={theme.palette.primary.main} />
              <path d="M4 11C4 10.4477 4.44772 10 5 10H11C11.5523 10 12 10.4477 12 11V19C12 19.5523 11.5523 20 11 20H5C4.44772 20 4 19.5523 4 19V11Z" fill={theme.palette.secondary.main} />
              <path d="M16 11C16 10.4477 15.5523 10 15 10H15C14.4477 10 14 10.4477 14 11V13C14 13.5523 14.4477 14 15 14H15C15.5523 14 16 13.5523 16 13V11Z" fill={theme.palette.warning.main} />
              <path d="M20 11C20 10.4477 19.5523 10 19 10H19C18.4477 10 18 10.4477 18 11V19C18 19.5523 18.4477 20 19 20H19C19.5523 20 20 19.5523 20 19V11Z" fill={theme.palette.warning.main} />
            </svg>
          </Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            MarketEdge
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Lead management for marketing agencies
          </Typography>
        </Box>
        
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
              Sign In
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  size="small"
                />
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
              
              <Typography variant="body2" align="center">
                Don't have an account?{' '}
                <MuiLink component={Link} to="/register" color="primary">
                  Sign Up
                </MuiLink>
              </Typography>
            </form>
          </CardContent>
        </Card>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            For demo purposes, use: demo@example.com / password123
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;