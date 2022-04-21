const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


router.get("/", forwardAuthenticated, (req, res) =>
  res.render("welcome", { layout: "layouts/layout" })
);

<<<<<<< HEAD
// Dashboard
router.get("/products", ensureAuthenticated, (req, res) =>
  res.render("products", {
=======

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
>>>>>>> refs/remotes/origin/main
    user: req.user,
    layout: "layouts/layout"
  })
);

router.get("/adminwelcome", ensureAuthenticated, (req, res) =>
  res.render("adminwelcome", {
    user: req.user,
    layout: "layouts/layout"
  })
);

router.get("/adminaddproduct", ensureAuthenticated, (req, res) =>
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

module.exports = router;
