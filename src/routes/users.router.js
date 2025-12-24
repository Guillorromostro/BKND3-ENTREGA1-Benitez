const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET /api/users - list all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).lean();
    res.json({ status: 'success', payload: users });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

module.exports = router;
