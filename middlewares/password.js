const bcrypt = require('bcrypt');
const Image = require('../models/Image');

const passwordAuth = async (req, res, next) => {

    try {
        const image = await Image.findById(req.params.id);
        const { password } = req.body;
        if (!password) {
            
            req.flash('error_msg', 'Please enter your image password');
            return res.redirect(`/password/${req.params.id}`);

        } else {
            
            //compare password
            bcrypt.compare(password, image.password, (err, match) => {

                if (err) {

                    console.log(err);
                    return res.render('notFound');
                }

                if (match) {
                
                    return next();

                } else {
                    
                    req.flash('error_msg', 'Invalid password. please make sure you enter correct password');
                    return res.redirect(`/password/${req.params.id}`);
                }
            });
        }
    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = passwordAuth;