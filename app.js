const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const recipesRoutes = require('./routes/recipes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const PORT = process.env.PORT || 3001;
const mongoURL = 'mongodb+srv://root:root@atlascluster.wwedndy.mongodb.net/STdb?retryWrites=true&w=majority';

async function connectMongoDb() { 
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectMongoDb();

app.use(express.urlencoded({ extended: false }));

app.use('/users',usersRoutes);
app.use('/recipes', recipesRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
