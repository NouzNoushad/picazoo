const Image = require('../../models/Image');
const bcrypt = require('bcrypt');

const viewImage = async (req, res) => {

    try {
        
        let errors = [];
        const image = await Image.findById(req.params.id);
        return res.render('index', { image, errors });
        
    } catch (err) {

        console.log(err);
        return res.render('notFound');

    }
}

const postViewImage = async (req, res) => {

    try {
        let errors = [];
        const image = await Image.findById(req.params.id);

        if (image) {
            
            //validations
            const { description, password } = req.body;

            //check password
            if (!password) {
                
                errors.push({ message: 'Please enter your image password. password is needed to secure your image' });
            }

            //password limited to 5 characters
            if (password.length > 5) {
                
                errors.push({ message: 'Password should not exceed 5 characters' });
            }

            if (errors.length > 0) {
                
                return res.render('index', { errors, image });

            } else {
                
                //create new image
                image.description = description,
                image.password = password,

                //bcrypt
                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(image.password, salt, async (err, hash) => {

                        if (err) throw err;

                        //hash password
                        image.password = hash;
                        await image.save();
                        return res.redirect('/gallery');
                    })
                })
                
            }

        } else {
            
            req.flash('error_msg', 'Please upload an image');
            return res.redirect('/');

        }


    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    viewImage,
    postViewImage
}