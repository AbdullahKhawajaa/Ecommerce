const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) =>
  res.render("welcome", { layout: "layouts/layout" })
);

// Dashboard
router.get("/products", ensureAuthenticated, (req, res) =>
  res.render("products", {
    user: req.user,
    layout: "layouts/layout"
  })
);

module.exports = router;
