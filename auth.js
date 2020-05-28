const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const container = require('./di');
const config = require('./config/config.json')

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        container.UsersRepository.getById(id).then((user) => {
            done(null, user);
        }, done);
    });

    passport.use(
        new GoogleStrategy({
                clientID: config.google.clientID,
                clientSecret: config.google.clientSecret,
                callbackURL: 'http://cm.codewars.ua/api/v1/auth/google/callback'
            },
            function (accessToken, refreshToken, profile, done) {
                return container.UsersRepository.getByGoogleId(profile.id)
                    .then((user) => {
                        if (user) {
                            return user;
                        }
                        return container.UsersRepository.create({
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                        })
                    })
                    .then((user) => {
                        done(null, user)
                    })
                    .catch(done);
            }
        ));

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret.cookieKey
    }, function (jwt_payload, done) {
        container.UsersRepository.getById(jwt_payload.sub)
            .then((user) => done(null, user))
            .catch(done);
    }));
};
