const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./localroots.db');


db.serialize(() => {
    // Drop old tables to ensure a clean start
    db.run("DROP TABLE IF EXISTS products");
    db.run("DROP TABLE IF EXISTS producers");
    db.run("DROP TABLE IF EXISTS purchases");

    // 1. Producers Table
    db.run(`CREATE TABLE producers (
        producer_id INTEGER PRIMARY KEY,
        name TEXT,
        address TEXT,
        revenue_5yrs REAL,
        top_categories TEXT
    )`);

    // 2. Products Table with your ID: 1077023
    db.run(`CREATE TABLE products (
        product_id TEXT PRIMARY KEY, 
        product_name TEXT,
        category TEXT,
        unit_type TEXT,
        unit_price REAL,
        image_url TEXT
    )`);

    // 3. Purchases Table (The missing table!)
    db.run(`CREATE TABLE purchases (
        purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
        purchase_date TEXT,
        producer_id INTEGER,
        product_id TEXT,
        quantity INTEGER,
        price_at_purchase REAL,
        delivery_method TEXT,
        FOREIGN KEY (producer_id) REFERENCES producers(producer_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`);

    // Insert Academic Data
    db.run(`INSERT INTO producers VALUES (1, 'Bavarian Farm', '123 Academic St, Rosenheim', 100000, 'Veg')`);
    
    db.run(`INSERT INTO products VALUES ('product_01_id1077023', 'Organic Tomatoes', 'Vegetables', 'kg', 4.50, 'http://localhost:3000/images/tomatoes.jpg')`);
    db.run(`INSERT INTO products VALUES ('product_02_id1077023', 'Fresh Carrots', 'Vegetables', 'kg', 3.00, 'http://localhost:3000/images/carrots.jpg')`);
    db.run(`INSERT INTO products VALUES ('product_03_id1077023', 'Farm Eggs', 'Dairy', 'pieces', 0.50, 'http://localhost:3000/images/eggs.jpg')`);
});

module.exports = db;