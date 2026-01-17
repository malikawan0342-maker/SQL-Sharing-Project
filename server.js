const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

// Task 6a: Route to retrieve all products
app.get('/get_all_products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Task 6b: Route to process a purchase
app.post('/place_order', (req, res) => {
    const { product_id } = req.body;
    // This query inserts a record into the purchases table
    const sql = `INSERT INTO purchases (purchase_date, producer_id, product_id, quantity, price_at_purchase, delivery_method) 
                 VALUES (date('now'), 1, ?, 1, (SELECT unit_price FROM products WHERE product_id = ?), 'local delivery')`;
    
    db.run(sql, [product_id, product_id], function(err) {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Order Successful", id: this.lastID });
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));