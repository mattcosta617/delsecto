const express = require('express');
const router = express.Router();

// Database
const db = require('./', (req, res) => {
    res.send("Hello! Welcome to Delsecto!")
});