const { v4: uuidv4 } = require('uuid');
const Image = require('../../models/Image');

const File = require('../../models/File');

const getImage = (req, res) => {

    try {

        const image = [];
        return res.render('index', { image });

    } catch (err) {

        console.log(err);
        return res.render('notFound');

    }
}

const postImage = async (req, res) => {

    try {
        
        req.upload(req, res, async (err) => {

            //err
            if (err) {
                
                return res.json({ message: err.message });
            }

            //file uploaded
            if (req.file) {
                
                req.file.uuid = uuidv4();
                const file = await File.create(req.file);

                //create new image
                const newImage = new Image({

                    image: file.filename
                });
                const image = await newImage.save();
                return res.redirect(`/show/${image.id}`);

            } else {
                
                req.flash('error_msg', 'Please upload an image');
                return res.redirect('/');
            }

        })

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    getImage,
    postImage
}