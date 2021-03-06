const express = require ('express');
const router  = express.Router();
const PropsController = require('../controllers/propsController')
const authentication  = require('../middleware/authentication')
const multer          = require('../middleware/multer')
const gcs             = require('../middleware/gcs')

// Create Prop
router.post('/',authentication, multer.array('files',5), gcs, PropsController.createProp);

// Get All Props
router.get('/', authentication, PropsController.getAllProps);

// Search Props
router.get('/search', authentication, PropsController.searchAllProps);

// Get All Props
router.get('/:id', authentication, PropsController.getPropById);

// Get User's Prop
router.get('/user/:id', authentication, PropsController.getUserProps);

//Delete Prop
router.delete('/:id', authentication, PropsController.deleteProp)

// Edit Prop
router.put('/:id', authentication, multer.array('files',5), gcs, PropsController.editProp);



module.exports = router;
