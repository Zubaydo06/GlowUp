const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory data stores
let users = [];
let routines = [];

// Helper functions
const findUserById = (id) => users.find(user => user.id === id);
const findRoutinesByUserId = (userId) => routines.filter(routine => routine.userId === userId);

// Register New User
app.post('/api/users/register', (req, res) => {
    const { username, email, skinType, concerns } = req.body;

    if (!username || !email || !skinType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        skinType,
        concerns: concerns || []
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Create Personalized Routine
app.post('/api/users/:userId/routines', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { name, steps, frequency, timeOfDay } = req.body;

    const user = findUserById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (!name || !steps || !frequency || !timeOfDay) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newRoutine = {
        id: routines.length + 1,
        userId,
        name,
        steps,
        frequency,
        timeOfDay
    };

    routines.push(newRoutine);
    res.status(201).json(newRoutine);
});

// Edit Skin Concerns
app.put('/api/users/:userId/concerns', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { concerns } = req.body;

    const user = findUserById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (!Array.isArray(concerns)) {
        return res.status(400).json({ error: 'Concerns must be an array' });
    }

    user.concerns = concerns;
    res.json(user);
});

// Filter Routines by Time of Day
app.get('/api/users/:userId/routines', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { timeOfDay } = req.query;

    const user = findUserById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    let userRoutines = findRoutinesByUserId(userId);

    if (timeOfDay) {
        userRoutines = userRoutines.filter(routine =>
            routine.timeOfDay.toLowerCase() === timeOfDay.toLowerCase() ||
            routine.timeOfDay.toLowerCase() === 'both'
        );
    }

    res.json(userRoutines);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});