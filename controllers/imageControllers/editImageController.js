const Image = require('../../models/Image');

const editImage = async (req, res) => {

    try{

        const image = await Image.findById(req.params.id);
        return res.render('edit', { image });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const postEditImage = async (req, res) => {

    try {
        
        //validations
        const { description } = req.body;

        await Image.findOneAndUpdate({ _id: req.params.id }, {
            
            $set: {
                description
            }
        });

        req.flash('success_msg', `Image story has updated successfully`);
        return res.redirect('/gallery');

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    editImage,
    postEditImage
}