const Image = require('../../models/Image');
const Comment = require('../../models/Comment');

const imageComments = async (req, res) => {

    try {
        
        let comments = await Comment.find();
        const image = await Image.findById(req.params.id);

        let total = 0;
        comments.map(comment => {
            if (req.params.id == comment.image) {
                total++;
            }
        });
        image.comment = total;
        await image.save();

        return res.render('comments', { image, comments });
        
    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

const postImageComments = async (req, res) => {

    try {
        
        //validations
        const { name, comment } = req.body;

        //check all fields
        if (!name || !comment) {
            
            req.flash('error_msg', 'All fields are required');
            return res.redirect(`/comment/${req.params.id}`);

        } else {
            
            const image = await Image.findById(req.params.id);
            const newComment = new Comment({

                name,
                comment,
                image: image.id
            })
            await newComment.save();

            return res.redirect(`/comment/${req.params.id}`);
        }

    } catch (err) {
        
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    imageComments,
    postImageComments
}