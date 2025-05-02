const db = require('../config/db'); // MySQL connection
const bcrypt = require('bcrypt');

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

exports.addArena = (req, res) => {
    const { arenaName, streetName, city } = req.body;

    if (!arenaName || !streetName || !city) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = 'INSERT INTO arenas (arena_name, street_name, city) VALUES (?, ?, ?)';
    db.query(sql, [arenaName, streetName, city], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ error: 'Error adding arena' });
        }
        res.status(201).json({ message: 'Arena added successfully', arenaId: result.insertId });
    });
};

