const express = require('express');
const router = express.Router();
const CulinaryCornerController = require("../controllers/CulinaryCorner");
const {authenticate} = require("../middleware/authMiddle");

router.get('/', CulinaryCornerController.getAllCulinaryCorner);
router.post('/', CulinaryCornerController.createCulinaryCorner);
router.patch('/:id',CulinaryCornerController.updateCulinaryCorner);  // Use :id for specific resource
router.delete('/:id', CulinaryCornerController.deleteCulinaryCorner); // Use :id for specific resource

module.exports = router;
