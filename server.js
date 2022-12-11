if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;
app.set('view-engine', 'ejs');
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(fileUpload());

const loginRoutes = require('./backend/routes/login');
const registerRoutes = require('./backend/routes/register');
const tierListRoutes = require('./backend/routes/tierList');
const tierListItemsRoutes = require('./backend/routes/tierListItems');

app.use(loginRoutes);
app.use(registerRoutes);
app.use(tierListRoutes);
app.use(tierListItemsRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
