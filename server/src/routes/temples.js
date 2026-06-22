const express = require('express');
const router = express.Router();
const {
  getTemples, getFeaturedTemples, getStats, getStates,
  getTempleById, createTemple, updateTemple, deleteTemple
} = require('../controllers/templeController');
const { getReviews, createReview } = require('../controllers/reviewController');
const { protect, requireAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/states', getStates);
router.get('/featured', getFeaturedTemples);
router.get('/stats', protect, requireAdmin, getStats);
router.get('/', getTemples);
router.get('/:id', getTempleById);

// Review routes
router.get('/:id/reviews', getReviews);
router.post('/:id/reviews', protect, createReview);

// Admin routes
router.post('/', protect, requireAdmin, upload.array('images', 10), createTemple);
router.put('/:id', protect, requireAdmin, upload.array('images', 10), updateTemple);
router.delete('/:id', protect, requireAdmin, deleteTemple);

module.exports = router;
