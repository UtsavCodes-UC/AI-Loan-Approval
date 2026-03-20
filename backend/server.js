const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db.js');
const authRoute = require('./routes/authRoutes.js');
const predictionRoute = require('./routes/predictionRoutes.js');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: "*",
}));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoute);
app.use('/api/predict', predictionRoute);

app.listen(PORT, ()=> {
    console.log('Server running')
});
