require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { connectDB } = require('./config/database');

const Temple = require('./models/Temple');
const User = require('./models/User');
const Review = require('./models/Review');

Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Temple, { foreignKey: 'templeId' });
Temple.hasMany(Review, { foreignKey: 'templeId' });
User.hasMany(Review, { foreignKey: 'userId' });

const authRoutes = require('./routes/auth');
const templeRoutes = require('./routes/temples');
const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5714', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/temples', templeRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Prajna API is running', time: new Date() });
});

app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error.' });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Prajna Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

start();
