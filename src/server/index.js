require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 4001;
const { API_KEY } = process.env;
const API_BASE_URL = 'https://public-api.tracker.gg/v2/apex/standard/profile';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
  });
}

app.post('/api', async (req, res) => {
  const { platform, gamertag } = req.body;
  const url = `${API_BASE_URL}/${platform}/${gamertag}`;

  const headers = { 'TRN-Api-Key': API_KEY };
  const options = { method: 'GET', headers };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          code: 'Server error',
          message: 'Server could not respond properly',
          data: {},
        },
      ],
    });
  }
});

app.listen(PORT, () => console.log(`✨ Server is running on port ${PORT}.`));
