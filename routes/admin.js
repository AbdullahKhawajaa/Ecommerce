const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller')

router.post('/listProducts', adminController.listProduct);

router.get("/update/:id", adminController.update);
router.post("/update/:id", adminController.updateStudent);
router.get("/delete/:id", adminController.delete);

module.exports = router;