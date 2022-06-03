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
router.get("/editprofile", ensureAuthenticated, (req, res) =>
    res.render("editprofile", {
        user: req.user,
        layout: "layouts/layout"
    })
);


router.get("/mouse/:page", ensureAuthenticated, (req, res) =>{
    var perPage = 3;
    var page = req.params.page || 1;

    product.find({category: "Mouse"})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, mouse) {
        product.count().exec(function(err, count){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render("mouse", {
                user: req.user,
                layout: "layouts/layout",
                data: mouse,
                current: page,
                pages: Math.ceil(count / perPage) 
            })
        }
       })
    });
});

router.get("/keyboard/:page", ensureAuthenticated, (req, res) =>{
    var perPage = 3;
    var page = req.params.page || 1;

    product.find({category: "Keyboard"})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, mouse) {
        product.count().exec(function(err, count){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render("keyboard", {
                user: req.user,
                layout: "layouts/layout",
                data: mouse,
                current: page,
                pages: Math.ceil(count / perPage) 
            })
        }
       })
    });
});

router.get("/headphones/:page", ensureAuthenticated, (req, res) =>{
    var perPage = 3;
    var page = req.params.page || 1;

    product.find({category: "Headphone"})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, mouse) {
        product.count().exec(function(err, count){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render("headphones", {
                user: req.user,
                layout: "layouts/layout",
                data: mouse,
                current: page,
                pages: Math.ceil(count / perPage) 
            })
        }
       })
    });
});

router.get("/cart", ensureAuthenticated, (req, res) =>
    res.render("cart", {
        user: req.user,
        layout: "layouts/layout"
    })
);

router.get("/adminlogin", ensureAuthenticated, (req, res) =>
    res.render("adminlogin", {
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

router.get("/viewcharts", ensureAuthenticated, (req, res) =>
    res.render("viewcharts", {
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