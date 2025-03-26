const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());

let data = [];

fs.readFile('./data/data.json', 'utf8', (err, content) => {
  if (err) {
    console.error('Error reading data file:', err);
    process.exit(1);
  }
  data = JSON.parse(content);
});

app.get('/data', (req, res) => {
  let { page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 20;

  const from = (page - 1) * limit;
  const to = from + limit;

  if (from < 0 || from >= data.length) {
    return res.status(400).json({ error: 'Invalid range' });
  }

  const result = data.slice(from, to);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
