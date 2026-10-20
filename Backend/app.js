require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
connectDB();

const authRoutes = require('./routes/authRoute');
const courseRoutes = require('./routes/courseRoute');
const batchRoutes = require('./routes/batchRouter');
const enrollmentRoutes = require('./routes/enrollmentRoute');
const dashboardRoutes = require('./routes/dashboardRoute');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is live on Port no ${PORT}`);
    
})