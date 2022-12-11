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

app.use(require('./backend/routes/login'));
app.use(require('./backend/routes/register'));
app.use(require('./backend/routes/tierList'));
app.use(require('./backend/routes/tierListItems'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
