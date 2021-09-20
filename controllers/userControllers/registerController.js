const Login = require("../../models/Login");
const bcrypt = require('bcrypt');

const registerUser = (req, res) => {

    try {
        
        let errors = [];
        return res.render('register', { errors });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const postRegisterUser = async (req, res) => {

    try {
        
        let errors = [];
        //validations
        const { name, email, password, confirmPassword } = req.body;

        //check all fields
        if (!name || !email || !password || !confirmPassword) {
            
            errors.push({ message: 'All fields are required' });
        }

        //password limited to 5 charas
        if (password.length > 5) {
            
            errors.push({ message: 'Password should not exceed 5 characters' });
        }

        //check password matches
        if (password !== confirmPassword) {
            
            errors.push({ message: 'Password doesnot match. please try again' });
        }

        //errors
        if (errors.length > 0) {
            
            return res.render('register', { errors });

        } else {
            
            //check user exists
            const user = await Login.findOne({ email: email });
            if (user) {
                
                errors.push({ message: 'Email already exists' });
                return res.render('register', { errors });

            } else {
                
                const newUser = new Login({

                    name,
                    email,
                    password
                });

                //bcrypt password
                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(newUser.password, salt, async (err, hash) => {

                        if (err) throw err;

                        newUser.password = hash;

                        //save user
                        await newUser.save();
                        req.flash('success_msg', `${newUser.name} has signed In`);
                        return res.redirect('/login');

                    });
                })

            }
        }

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}
module.exports = {
    
    registerUser,
    postRegisterUser
}