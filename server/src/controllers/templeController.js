const { Op } = require('sequelize');
const Temple = require('../models/Temple');
const Review = require('../models/Review');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// GET /api/temples
const getTemples = async (req, res) => {
  try {
    const {
      page = 1, limit = 12, search = '', state = '', city = '',
      deity = '', sort = 'name', order = 'ASC', featured
    } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { deity: { [Op.like]: `%${search}%` } },
        { city: { [Op.like]: `%${search}%` } },
        { state: { [Op.like]: `%${search}%` } }
      ];
    }
    if (state) where.state = { [Op.like]: `%${state}%` };
    if (city) where.city = { [Op.like]: `%${city}%` };
    if (deity) where.deity = { [Op.like]: `%${deity}%` };
    if (featured === 'true') where.isFeatured = true;

    const validSortFields = ['name', 'rating', 'createdAt', 'state', 'city'];
    const sortField = validSortFields.includes(sort) ? sort : 'name';
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Temple.findAndCountAll({
      where,
      order: [[sortField, sortOrder]],
      limit: parseInt(limit),
      offset
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/temples/featured
const getFeaturedTemples = async (req, res) => {
  try {
    const temples = await Temple.findAll({
      where: { isFeatured: true },
      order: [['rating', 'DESC']],
      limit: 6
    });
    res.json({ success: true, data: temples });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/temples/stats
const getStats = async (req, res) => {
  try {
    const total = await Temple.count();
    const featured = await Temple.count({ where: { isFeatured: true } });

    const stateStats = await Temple.findAll({
      attributes: ['state', [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']],
      group: ['state'],
      order: [[require('sequelize').literal('count'), 'DESC']],
      raw: true
    });

    res.json({ success: true, data: { total, featured, byState: stateStats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/temples/states
const getStates = async (req, res) => {
  try {
    const states = await Temple.findAll({
      attributes: ['state'],
      group: ['state'],
      order: [['state', 'ASC']],
      raw: true
    });
    res.json({ success: true, data: states.map(s => s.state) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/temples/:id
const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findByPk(req.params.id);
    if (!temple) {
      return res.status(404).json({ success: false, message: 'Temple not found.' });
    }
    res.json({ success: true, data: temple });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/temples (admin)
const createTemple = async (req, res) => {
  try {
    const body = req.body;

    // Parse JSON string fields sent from FormData
    const parseJSON = (val, fallback = []) => {
      if (!val) return fallback;
      try { return JSON.parse(val); } catch { return fallback; }
    };

    const data = {
      ...body,
      darshanSlots: parseJSON(body.darshanSlots),
      aartiTimings: parseJSON(body.aartiTimings),
      festivals: parseJSON(body.festivals),
      facilities: parseJSON(body.facilities),
      images: parseJSON(body.images),
      isFeatured: body.isFeatured === 'true' || body.isFeatured === true
    };

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(f => `/uploads/${f.filename}`);
      if (!data.bannerImage) data.bannerImage = imageUrls[0];
      data.images = [...(data.images || []), ...imageUrls];
    }
    if (req.file) {
      data.bannerImage = `/uploads/${req.file.filename}`;
    }

    const temple = await Temple.create(data);
    res.status(201).json({ success: true, data: temple, message: 'Temple created successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/temples/:id (admin)
const updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findByPk(req.params.id);
    if (!temple) {
      return res.status(404).json({ success: false, message: 'Temple not found.' });
    }

    const body = req.body;
    const parseJSON = (val, fallback) => {
      if (val === undefined) return fallback;
      try { return JSON.parse(val); } catch { return fallback; }
    };

    const data = {
      ...body,
      darshanSlots: parseJSON(body.darshanSlots, temple.darshanSlots),
      aartiTimings: parseJSON(body.aartiTimings, temple.aartiTimings),
      festivals: parseJSON(body.festivals, temple.festivals),
      facilities: parseJSON(body.facilities, temple.facilities),
      isFeatured: body.isFeatured !== undefined
        ? (body.isFeatured === 'true' || body.isFeatured === true)
        : temple.isFeatured
    };

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(f => `/uploads/${f.filename}`);
      data.bannerImage = imageUrls[0];
      const existing = parseJSON(body.existingImages, temple.images || []);
      data.images = [...existing, ...imageUrls];
    }

    await temple.update(data);
    res.json({ success: true, data: temple, message: 'Temple updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/temples/:id (admin)
const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByPk(req.params.id);
    if (!temple) {
      return res.status(404).json({ success: false, message: 'Temple not found.' });
    }
    await Review.destroy({ where: { templeId: temple.id } });
    await temple.destroy();
    res.json({ success: true, message: 'Temple deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTemples, getFeaturedTemples, getStats, getStates,
  getTempleById, createTemple, updateTemple, deleteTemple
};
