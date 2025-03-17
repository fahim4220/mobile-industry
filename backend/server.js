const express = require('express');
const cors = require('cors');
const salesRoutes = require('./routes/sales');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sales', salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));