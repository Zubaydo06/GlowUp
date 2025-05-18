import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'

function Routines() {
  const [routines, setRoutines] = useState([])
  const [timeOfDayFilter, setTimeOfDayFilter] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [suggestionTimeOfDay, setSuggestionTimeOfDay] = useState('')

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (userId) {
      fetchRoutines()
    }
  }, [timeOfDayFilter, userId])

  const fetchRoutines = async () => {
    try {
      const url = timeOfDayFilter
        ? `/api/users/${userId}/routines?timeOfDay=${timeOfDayFilter}`
        : `/api/users/${userId}/routines`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setRoutines(data)
      } else {
        console.error('Failed to fetch routines', response.status)
      }
    } catch (error) {
      console.error('Failed to fetch routines:', error)
    }
  }

  const handleCreateRoutine = async () => {
    if (!userId) {
      console.error('User not logged in')
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}/routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timeOfDay: suggestionTimeOfDay }),
      })
      if (response.ok) {
        setOpenDialog(false)
        setSuggestionTimeOfDay('')
        fetchRoutines()
      } else {
        console.error('Failed to create routine', response.status)
      }
    } catch (error) {
      console.error('Failed to create routine:', error)
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            My Skincare Routines
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Create New Routine
          </Button>
        </Box>

        <FormControl sx={{ minWidth: 200, mb: 4 }}>
          <InputLabel>Filter by Time of Day</InputLabel>
          <Select
            value={timeOfDayFilter}
            onChange={(e) => setTimeOfDayFilter(e.target.value)}
            label="Filter by Time of Day"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="morning">Morning</MenuItem>
            <MenuItem value="evening">Evening</MenuItem>
            <MenuItem value="both">Both</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          {routines.length > 0 ? (
            routines.map((routine) => (
              <Grid item xs={12} sm={6} md={4} key={routine.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {routine.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Time: {routine.timeOfDay}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Frequency: {routine.frequency}
                    </Typography>
                    <Typography variant="body2">
                      Steps: {routine.steps}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" align="center">
                No routines found. Create a new routine to get started!
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Routine</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Time of Day for Suggestion</InputLabel>
            <Select
              value={suggestionTimeOfDay}
              onChange={(e) => setSuggestionTimeOfDay(e.target.value)}
              label="Time of Day for Suggestion"
              required
            >
              <MenuItem value="morning">Morning</MenuItem>
              <MenuItem value="evening">Evening</MenuItem>
              <MenuItem value="both">Both</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateRoutine} variant="contained" color="primary">
            Suggest Routine
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Routines 