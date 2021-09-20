const Image = require('../../models/Image');

const imagePassword = async (req, res) => {

    try {
        
        const image = await Image.findById(req.params.id);
        return res.render('password', { image });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const postImagePassword = async (req, res) => {

    try {
        
        const image = await Image.findById(req.params.id);
        return res.render('edit', { image });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    imagePassword,
    postImagePassword
    
}