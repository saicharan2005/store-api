const express =require('express');
const { getAllproducts, getAllproductsStatic } = require('../controllers/products');

const router =express.Router();


router.route("/").get(getAllproducts)

router.route("/static").get(getAllproductsStatic)




module.exports = router;