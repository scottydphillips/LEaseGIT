const router = require('express').Router();

//static route to room planner
router.get('/plan', (req, res) => res.sendFile(path.join(__dirname, 'plan.html')));