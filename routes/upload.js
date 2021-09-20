const express = require('express');

const router = express.Router();

//controllers
const { getImage, postImage } = require('../controllers/imageControllers/imageController');
const { viewImage, postViewImage } = require('../controllers/imageControllers/viewImageController');
const { postEditImage } = require('../controllers/imageControllers/editImageController');
const { deleteImage, postDeleteImage } = require('../controllers/imageControllers/deleteImageController');
const { imageGallery, likeImage, disLikeImage } = require('../controllers/imageControllers/galleryController');
const { imageComments, postImageComments } = require('../controllers/imageControllers/commentsController');

const { imagePassword, postImagePassword } = require('../controllers/imageControllers/passwordController');

const { registerUser, postRegisterUser } = require('../controllers/userControllers/registerController');
const { loginUser, postLoginUser } = require('../controllers/userControllers/logincontroller');
const logoutUser = require('../controllers/userControllers/logoutController');

//middleware
const uploadFile = require('../middlewares/upload');
const { loginAuth, ensureAuth } = require('../middlewares/loginAuth');
const passwordAuth = require('../middlewares/password');

//image
router.get('/', ensureAuth, getImage);
router.get('/show/:id', viewImage);
router.get('/gallery', imageGallery);
router.get('/password/:id', imagePassword);
router.get('/delete/:id', deleteImage);

router.post('/show', uploadFile, postImage);
router.post('/upload/:id', postViewImage);
router.post('/password/:id', passwordAuth, postImagePassword);
router.post('/edit/:id', postEditImage);
router.post('/delete/:id', passwordAuth, postDeleteImage);

router.get('/like/:id', likeImage);
router.get('/disLike/:id', disLikeImage);
router.get('/comment/:id', ensureAuth, imageComments);

router.post('/comment/:id', postImageComments);

//user
router.get('/register', loginAuth, registerUser);
router.get('/login', loginAuth, loginUser);
router.get('/logout', logoutUser);

router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);

module.exports = router;