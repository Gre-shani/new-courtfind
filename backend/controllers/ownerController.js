const db = require('../config/db'); // MySQL connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.changePassword = async (req, res) => {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;
   
    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch user from database
    const sql = 'SELECT password FROM users WHERE userId = ?';
    db.query(sql, [userId], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = 'UPDATE users SET password = ? WHERE userId = ?';
        db.query(updateSql, [hashedPassword, userId], (err, result) => {
            if (err) return res.status(500).json({ message: "Error updating password" });

            res.json({ message: "Password updated successfully" });
        });
    });
};

exports.dashboard = (req, res) => {
    res.json({ message: "Welcome to the Owner Dashboard", user: req.user });
};

exports.manageCourts = (req, res) => {
    res.json({ message: "Owner managing courts" });
};

// =====================
// ADD ARENA CONTROLLER
// =====================
exports.addArena = (req, res) => {
    const ownerId = req.user.userId;  
    const { arenaName, streetName, city } = req.body;

    if (!arenaName || !streetName || !city) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = 'INSERT INTO arenas (ownerId, arenaName, streetName, city) VALUES (?, ?, ?, ?)';
    db.query(sql, [ownerId, arenaName, streetName, city], (err, result) => {
        if (err) {
            console.error("Error inserting arena:", err);
            return res.status(500).json({ message: "Database error while adding arena" });
        }

        res.status(201).json({ message: "Arena added successfully", arenaId: result.insertId });
    });
};

// ================================
// OWNER PROFILE CONTROLLER METHODS
// ================================

exports.getOwnerProfile = (req, res) => {
    const ownerId = req.user.userId;

    const sql = 'SELECT userId, name, email, phone, image FROM users WHERE userId = ?';
    db.query(sql, [ownerId], (err, results) => {
        if (err) {
            console.error("Error fetching owner profile:", err);
            return res.status(500).json({ message: "Database error while fetching profile" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Owner profile not found" });
        }

        res.json(results[0]);
    });
};

exports.updateOwnerProfile = (req, res) => {
    const ownerId = req.user.userId;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE userId = ?';
    db.query(sql, [name, email, phone, ownerId], (err, result) => {
        if (err) {
            console.error("Error updating profile:", err);
            return res.status(500).json({ message: "Database error while updating profile" });
        }

        res.json({ message: "Profile updated successfully" });
    });
};

exports.uploadProfileImage = (req, res) => {
    const ownerId = req.user.userId;

    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }

    const imagePath = req.file.filename;

    const sql = 'UPDATE users SET image = ? WHERE userId = ?';
    db.query(sql, [imagePath, ownerId], (err, result) => {
        if (err) {
            console.error("Error saving image:", err);
            return res.status(500).json({ message: "Database error while saving image" });
        }

        res.json({ message: "Profile image uploaded successfully", filename: imagePath });
    });
};

exports.getProfileImage = (req, res) => {
    const ownerId = req.user.userId;

    const sql = 'SELECT image FROM users WHERE userId = ?';
    db.query(sql, [ownerId], (err, results) => {
        if (err) {
            console.error("Error fetching image:", err);
            return res.status(500).json({ message: "Database error while fetching image" });
        }

        if (results.length === 0 || !results[0].image) {
            return res.status(404).json({ message: "No profile image found" });
        }

        res.json({ image: results[0].image });
    });
};
