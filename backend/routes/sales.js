const express = require('express');
const router = express.Router();

let sales = [
  { name: 'Model A', sales: 150 },
  { name: 'Model B', sales: 200 },
  { name: 'Model C', sales: 100 },
];

router.get('/', (req, res) => {
  res.json(sales);
});

router.post('/', (req, res) => {
  const { name, sales: saleVolume } = req.body;
  const newSale = { name, sales: saleVolume };
  sales.push(newSale);
  res.status(201).json(newSale);
});

module.exports = router;