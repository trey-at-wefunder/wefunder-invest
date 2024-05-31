const express = require('express');
const path = require('path');
const fs = require('fs');
const scrapeWefunderProfile = require('./scraper');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/company/:slug', async (req, res) => {
  const slug = req.params.slug;
  const data = await scrapeWefunderProfile(slug);
  res.json(data);
});

app.post('/store-data', (req, res) => {
  const { name, email } = req.body;
  console.log('Received data:', req.body);

  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }

    const jsonData = JSON.parse(data);
    jsonData.push({ name, email });

    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to data.json:', err);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }

      res.json({ status: 'success', data: req.body });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
