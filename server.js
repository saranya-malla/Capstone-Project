// 1. IMPORTS
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// 2. CREATE APP
const app = express();

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests"
});

app.use(limiter);

// 3. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔐 API KEY MIDDLEWARE (AFTER app creation)
// const API_KEY = "123456";

// app.use((req, res, next) => {
//   const key = req.headers["x-api-key"];

//   if (!key || key !== API_KEY) {
//     return res.status(403).json({ message: "Unauthorized - Invalid API Key" });
//   }

  // next();
// });

// 4. DATABASE
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "india_location_db"
});

db.connect(err => {
  if (err) {
    console.log("DB Connection Failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// 5. APIs

// Test API
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// STATES
app.get("/states", (req, res) => {
  const query = "SELECT id AS state_id, state_name FROM states";

  db.query(query, (err, result) => {
    if (err) return res.status(500).send("Error fetching states");
    res.json(result);
  });
});

// DISTRICTS
app.get("/districts", (req, res) => {
  const state_id = req.query.state_id;

  const query = `
    SELECT district_code AS district_id, district_name, state_code AS state_id
    FROM districts
    WHERE state_code = ?
  `;

  db.query(query, [state_id], (err, result) => {
    if (err) return res.status(500).send("Error fetching districts");
    res.json(result);
  });
});

// SUBDISTRICTS
app.get("/subdistricts", (req, res) => {
  const district_id = req.query.district_id;

  const query = `
    SELECT sub_district_code AS subdistrict_id, sub_district_name, district_code AS district_id
    FROM sub_districts
    WHERE district_code = ?
  `;

  db.query(query, [district_id], (err, result) => {
    if (err) return res.status(500).send("Error fetching subdistricts");
    res.json(result);
  });
});

// VILLAGES (FINAL VERSION WITH PAGINATION + SEARCH)
app.get("/villages", (req, res) => {
  const subdistrict_id = req.query.subdistrict_id;
  const search = req.query.search || "";

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const offset = (page - 1) * limit;

  const query = `
  SELECT village_code AS village_id, village_name, sub_district_code AS subdistrict_id
  FROM villages
  WHERE sub_district_code = CAST(? AS UNSIGNED)
  AND LOWER(village_name) LIKE LOWER(?)
  LIMIT ? OFFSET ?
`;
console.log("Subdistrict ID:", subdistrict_id);
  db.query(
    query,
    [subdistrict_id, `%${search}%`, limit, offset],
    (err, result) => {
      if (err) return res.status(500).send("Error fetching villages");

      res.json({
        page,
        limit,
        count: result.length,
        data: result
      });
    }
  );
});

// 6. START SERVER (ALWAYS LAST)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});