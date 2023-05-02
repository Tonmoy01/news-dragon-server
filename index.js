const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const app = express();

const categories = require('./data/categories.json');
const news = require('./data/news.json');

env.config();

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/categories', (req, res) => {
  res.send(categories);
});

app.get('/news', (req, res) => {
  res.send(news);
});

app.get('/news/:id', (req, res) => {
  const id = req.params.id;

  const selectedNews = news.find((n) => n._id === id);

  res.send(selectedNews);
});

app.get('/categories/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (id === 0) {
    res.send(news);
  } else {
    const categoryNews = news.filter((n) => parseInt(n.category_id) === id);
    res.send(categoryNews);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
