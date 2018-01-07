const express = require ('express');
const router  = express.Router();
const PropsController = require('../controllers/propsController')
const authentication  = require('../middleware/authentication')
const multer          = require('../middleware/multer')
const gcs             = require('../middleware/gcs')

// Create Prop
router.post('/',authentication, multer.single('file'), gcs, PropsController.createProp);

// Get All Props
router.get('/', authentication, PropsController.getAllProps);

// Get User's Prop
router.get('/user/:id', authentication, PropsController.getUserProps);

//Delete Prop
router.delete('/:id', authentication, PropsController.deleteProp)

// Edit Prop
router.put('/:id', authentication, PropsController.editProp);



module.exports = router;
