const loginAuth = (req, res, next) => {

    if (req.isAuthenticated()) {
        
        return res.redirect('/gallery');
    }
    return next();
}

const ensureAuth = (req, res, next) => {

    if (req.isAuthenticated()) {
        
        return next();

    }
    return res.redirect('/login');
}

module.exports = {

    loginAuth,
    ensureAuth
}