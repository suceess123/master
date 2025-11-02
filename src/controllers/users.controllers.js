import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      gender,
      profileFor,
      dateOfBirth,
      height,
      country,
      city,
      state,
      residentialStatus,
      education,
      workExperience,
      occupation,
      income,
      maritalStatus,
      motherTongue,
      religion,
      caste,
      sect,
    } = req.body;

    // const profilePic = req.file ? req.file.filename : null;

    // ✅ Check if user already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert into DB
    const [result] = await pool.query(
      `INSERT INTO users (
        name, email, password, phoneNumber, gender, profileFor, dateOfBirth, height, 
        country, city, state, residentialStatus, education, workExperience, occupation, 
        income, maritalStatus, motherTongue, religion, caste, sect
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        phoneNumber,
        gender,
        profileFor,
        dateOfBirth,
        height,
        country,
        city,
        state,
        residentialStatus,
        education,
        workExperience,
        occupation,
        income,
        maritalStatus,
        motherTongue,
        religion,
        caste,
        sect,
      ]
    );

    const userId = result.insertId;

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: userId,
        name,
        email,
        phoneNumber,
        gender,
        profileFor,
        dateOfBirth,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const user = users[0];
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '7d' }
      );
  
      // Successful login
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          profilePic: user.profilePic,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

// ✅ Get all users controller
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({
      message: 'All users fetched successfully',
      users: rows,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


