import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Routines from './pages/Routines'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4', // Pink color for skincare theme
    },
    secondary: {
      main: '#4A90E2', // Blue color for contrast
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/routines" element={<Routines />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App 