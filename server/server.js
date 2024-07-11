const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const CulinaryCornerRoutes = require('./routes/CulinaryCorner');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const connectMongoDB = require('./config/db');
const { authenticate } = require("./middleware/authMiddle");
const app = express();

app.use(express.json());

connectMongoDB();

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin:[
        'http://localhost:3000'
    ],
    credentials:true
}));
app.use('/api/CulinaryCorner', authenticate, CulinaryCornerRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`CulinaryCorner server is listening on port ${PORT}`);
});