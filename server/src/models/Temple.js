const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Temple = sequelize.define('Temple', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  deity: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pincode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  lat: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  lng: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  openTime: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  closeTime: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  darshanSlots: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  aartiTimings: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  festivalTimings: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  history: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  festivals: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  dressCode: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  facilities: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  contact: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  bannerImage: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  bestTimeToVisit: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  howToReach: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.0
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'temples',
  timestamps: true
});

module.exports = Temple;
