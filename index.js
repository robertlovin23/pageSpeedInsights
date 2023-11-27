const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
// require('./models/Items');
// require('./models/Cart');
require('./models/Metrics');
require('./models/Users');
// require('./models/Payments')
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
// require('./routes/payRoutes')(app);
// require('./routes/cartRoutes')(app);   
// require('./routes/userRoutes')(app);
require('./routes/authRoutes')(app);

// if(process.env.NODE_ENV === 'production'){
//     // Express will serve up production assets
//     // like our main.js or main.css
    // app.use(express.static('client/build'));
    // // Express will serve up index.html file
    // // if it doesn't recognizes the route
    // const path = require('path');

    // app.get('*', (req,res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // });
// }

mongoose.connect(keys.mongoURI);


const port = process.env.PORT || 5000;

app.listen(port)