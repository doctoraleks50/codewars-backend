const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
const passport = require('passport');
const auth = require('./auth');
const cookieSession = require('cookie-session');
const config = require('./config/config.json');
const authorizationMiddleware = require('./middlewares/authorization');
const port = config.port.portNumber;

global.__base = __dirname
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport.js auth and cookie
app.use(cookieSession({
    secret: config.secret.cookieKey,
    maxAge: 30 * 24 * 60 * 60 * 1000
}));

auth(passport);
app.use(passport.initialize());
app.use(passport.session());
// end passport.js auth

app.use('/api/v1', authorizationMiddleware().unless({
    path: [
        /\/auth/,
        '/api/v1/users/profile'
    ]
  }));

app.use(router);

app.listen(port, () => console.log(`Web server listening on port ${port}!`));  

module.exports = app;