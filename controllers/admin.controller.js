const product = require("../models/listproduct");
const pdf = require("html-pdf");
const fs = require("fs");

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

  exports.delete = async (req, res) => {
    let result = await product.deleteOne({ _id: req.params.id });
    if (!result)
      return res.status(400).json({
        err: `Oops something went wrong! Cannont delete student with ${req.params.id}.`
      });
    req.flash("student_del_success_msg", "Student has been deleted successfully");
    res.redirect("/student/all");
  };