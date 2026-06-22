const Review = require('../models/Review');
const Temple = require('../models/Temple');
const User = require('../models/User');

// GET /api/temples/:id/reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { templeId: req.params.id },
      include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/temples/:id/reviews (auth required)
const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const templeId = parseInt(req.params.id);

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
    }

    const temple = await Temple.findByPk(templeId);
    if (!temple) {
      return res.status(404).json({ success: false, message: 'Temple not found.' });
    }

    // Check for duplicate review
    const existing = await Review.findOne({ where: { templeId, userId: req.user.id } });
    if (existing) {
      await existing.update({ rating, comment });
      // Recalculate average
      const all = await Review.findAll({ where: { templeId } });
      const avg = all.reduce((sum, r) => sum + r.rating, 0) / all.length;
      await temple.update({ rating: avg.toFixed(2), reviewCount: all.length });
      return res.json({ success: true, data: existing, message: 'Review updated.' });
    }

    const review = await Review.create({ templeId, userId: req.user.id, rating, comment });

    // Update temple rating avg
    const all = await Review.findAll({ where: { templeId } });
    const avg = all.reduce((sum, r) => sum + r.rating, 0) / all.length;
    await temple.update({ rating: avg.toFixed(2), reviewCount: all.length });

    // Return with user info
    const withUser = await Review.findByPk(review.id, {
      include: [{ model: User, attributes: ['id', 'name', 'avatar'] }]
    });
    res.status(201).json({ success: true, data: withUser, message: 'Review added.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/reviews/:id (admin or owner)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    if (review.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    await review.destroy();
    res.json({ success: true, message: 'Review deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getReviews, createReview, deleteReview };
