const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./users');
const recipesRoutes = require('./recipes');

const PORT = process.env.PORT || 3001;
const mongoURL = process.env.MONGO_URL || 'mogodb://localhost:27017/mealplannerapi';
async function connectMongoDb() { await mongoose.connect(
mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
}

connectMongoDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes )
app.use(cors());
app.listen(PORT, () => {
console.log(`Strežnik posluša na http://localhost:${PORT}`);
});
