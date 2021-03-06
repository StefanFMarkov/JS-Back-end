const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
// const config = require('./config/config.json')[process.env.NODE_ENV];
const connection_string = 'mongodb://localhost:27017/cubes';
const PORT = 5000;
const initDatabase = require('./config/database');
const {auth} = require('./middlewares/authMiddleware');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(auth);
require('./config/handlebars')(app);

app.use(express.static(path.resolve(__dirname, './public')));
app.use(routes);

initDatabase(connection_string)
    .then(() => {
        app.listen(PORT, console.log.bind(console, `Application is running on http://localhost:${PORT}`));
    })
    .catch(err => {
        console.log('Application init failed: ', err);
    });