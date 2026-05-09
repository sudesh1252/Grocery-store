// User Model - Sequelize
// Stores user account information

const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name is required' },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters',
      },
    },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      msg: 'Email already exists',
    },
    validate: {
      notEmpty: { msg: 'Email is required' },
      isEmail: { msg: 'Invalid email format' },
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Password is required' },
      len: {
        args: [6, 255],
        msg: 'Password must be at least 6 characters',
      },
    },
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    // Hash password before saving
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

// Instance method to compare password
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON response
User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;
