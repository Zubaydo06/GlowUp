import { Container, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to GlowUp
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Your Personal Skincare Routine Manager
        </Typography>
        <Typography variant="body1" paragraph sx={{ mt: 2, mb: 4 }}>
          Create personalized skincare routines, track your progress, and achieve your skin goals
          with our easy-to-use platform.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/routines')}
          >
            View Routines
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Home 