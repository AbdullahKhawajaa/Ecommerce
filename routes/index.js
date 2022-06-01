const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const product = require("../models/listproduct");


router.get("/", forwardAuthenticated, (req, res) =>
    res.render("welcome", { layout: "layouts/layout" })
);

// Dashboard

router.get("/dashboard/:page", ensureAuthenticated, async (req, res, next) => {
    var perPage = 3;
    var page = req.params.page || 1;

    product.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, image) {
        product.count().exec(function(err, count){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render("dashboard", {
                user: req.user,
                layout: "layouts/layout",
                data: image,
                current: page,
                pages: Math.ceil(count / perPage) 
            })
        }
       })
    });

});

router.get("/adminManageProduct/:page", ensureAuthenticated, (req, res) =>{
    var perPage = 5;
    var page = req.params.page || 1;
    product.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, products) {
        product.count().exec(function(err, count){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render("adminManageProduct", {
                user: req.user,
                layout: "layouts/layout",
                data: products,
                current: page,
                pages: Math.ceil(count / perPage) 
            })
        }
       })
    });
});

router.get("/products", ensureAuthenticated, (req, res) =>
    res.render("products", {
        user: req.user,
        layout: "layouts/layout"
    })
);

router.get("/contact", ensureAuthenticated, (req, res) =>
    res.render("contact", {
        user: req.user,
        layout: "layouts/layout"
    })
);

router.get("/about", ensureAuthenticated, (req, res) =>
    res.render("about", {
        user: req.user,
        layout: "layouts/layout"
    })
);


router.get("/mouse", ensureAuthenticated, (req, res) =>
    res.render("mouse", {
        user: req.user,
        layout: "layouts/layout"
    })
);

router.get("/cart", ensureAuthenticated, (req, res) =>
    res.render("cart", {
        user: req.user,
        layout: "layouts/layout"
    })
);



router.get("/admin", ensureAuthenticated, (req, res) =>
    res.render("adminwelcome", {
        user: req.user,
        layout: "layouts/layout"
    })
);

router.get("/listproduct", ensureAuthenticated, (req, res) =>
    res.render("adminAddProduct", {
        user: req.user,
        layout: "layouts/layout"
    })
);

router.get("/adminPayment", ensureAuthenticated, (req, res) =>
    res.render("adminPayment", {
        user: req.user,
        layout: "layouts/layout"
    })
);



router.get("/adminUpdate", ensureAuthenticated, (req, res) =>
    res.render("adminUpdate", {
        user: req.user,
        layout: "layouts/layout"
    })
);


module.exports = router;