const Image = require('../../models/Image');

const deleteImage = async (req, res) => {

    try {
        
        const image = await Image.findById(req.params.id);
        return res.render('delete', { image });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const postDeleteImage = async (req, res) => {

    try {
        
        await Image.findOneAndRemove({ _id: req.params.id });
        req.flash('success_msg', 'Image has been deleted successfully');
        return res.redirect('/gallery');

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    deleteImage,
    postDeleteImage
}