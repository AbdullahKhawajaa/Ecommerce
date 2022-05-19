const product = require("../models/listproduct");

exports.listProduct = (req, res) => {
    const { productName, productCategory, productDescription, productPrice, productQuantity } = req.body;
    let errors = [];
  
    if (!productName || !productCategory || !productDescription || !productPrice || productQuantity) {
      errors.push({ msg: "Please enter all fields" });
    }
  
    if (errors.length > 0) {
      res.render("adminAddProduct", {
        errors,
        productName,
        productCategory,
        productDescription,
        productPrice,
        productQuantity
      });
    } else {
      User.findOne({ productName: productName }).then(user => {
        if (user) {
          errors.push({ msg: "Product already exists" });
          res.render("adminAddProduct", {
            errors,
            productName,
            productCategory,
            productDescription,
            productPrice,
            productQuantity
          });
        } else {
          const newProduct = new product({
            productName,
            productCategory,
            productDescription,
            productPrice,
            productQuantity
          });
        }
      });
    }
  };