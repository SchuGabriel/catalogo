require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');

const app = express();

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Adicione esta linha

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
