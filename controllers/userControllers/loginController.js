const passport = require("passport");

const loginUser = (req, res) => {

    try {
        
        return res.render('login');

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const postLoginUser = passport.authenticate('local', {

    successRedirect: '/gallery',
    failureRedirect: '/login',
    failureFlash: true
});

module.exports = {

    loginUser,
    postLoginUser
}