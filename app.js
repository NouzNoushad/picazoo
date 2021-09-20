const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');
const dotenv = require('dotenv');

const IndexRoute = require('./routes/upload');
dotenv.config({ path: './config/.env' });
//mongodb
const connectDB = require('./config/db');
connectDB();

//passport
require('./middlewares/passportAuth')(passport);

const app = express();

const PORT = process.env.PORT || 4000;

//ejs engine
app.set('view engine', 'ejs');

//middlewares
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static('public'));
}

//session
app.use(session({

    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//global vars
app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

//Routes
app.use('/', IndexRoute);

app.listen(PORT, () => console.log(`Server running on port, http://localhost:${PORT}`));