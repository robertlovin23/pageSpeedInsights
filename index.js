const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

require('./models/Metrics');
require('./models/Users');

require('./services/passportGoogle');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 *60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/metricsRoutes')(app);
require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);


const port = process.env.PORT || 5000;

app.listen(port)