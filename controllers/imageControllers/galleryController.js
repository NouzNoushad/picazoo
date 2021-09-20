const Image = require('../../models/Image');

const imageGallery = async (req, res) => {

    try {
        
        const images = await Image.find();
        return res.render('gallery', { images });

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const handleLikeDislike = async (image, count, option) => {

    if (image[option] > 0) {
            
            image[option]++;
            await image.save();
            
        } else {
            
            count++;
            image[option] = count;
            await image.save();

        }
}

const likeImage = async (req, res) => {

    try {
        let like = 0;
        let option = 'like';
        const image = await Image.findById(req.params.id);
        handleLikeDislike(image, like, option)
        return res.redirect('/gallery');

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const disLikeImage = async (req, res) => {

    try {
        let disLike = 0;
        let option = 'disLike'
        const image = await Image.findById(req.params.id);
        handleLikeDislike(image, disLike, option);
        return res.redirect('/gallery');

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {
    imageGallery,
    likeImage,
    disLikeImage
}