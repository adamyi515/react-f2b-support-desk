const express = require('express');
const router = express.Router();

// Middleware
const { authMiddleware } = require('../middlewares/authMiddleware');

// Controller
const { getTickets, createTicket } = require('../controller/ticketController');


router.route('/').get(authMiddleware, getTickets).post(authMiddleware, createTicket)




module.exports = router;