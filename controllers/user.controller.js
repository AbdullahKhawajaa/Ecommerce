const bcrypt = require("bcryptjs");
const passport = require("passport");
const crypto = require("crypto")
var multer = require('multer');
var fs = require('fs');
var nodemailer = require('nodemailer');

// Load User model
const User = require("../models/User");
const product = require("../models/listproduct");
const profile=require("../models/editprofile");

//Login Function
exports.login = (req, res) =>
    res.render("login", {
        layout: "layouts/layout"
    });

//reset function
exports.reset = (req, res) => {
    res.render("reset-password", {
        layout: "layouts/layout"
    })
}

//Register Funcion
exports.register = (req, res) =>
    res.render("register", {
        layout: "layouts/layout"
    });

//verify Login
exports.verifyLogin = async(req, res) => {
    try {
        const user = await User.findOne({ emailToken: false })
        await User.updateOne({ isVarified: true, emailToken: null });
        if (user) {
            req.flash(
                "error_msg",
                "Email not verified"
            );
            res.redirect("/users/register")
            console.log("Email not verified")

        } else {
            req.flash("success_msg",
                "You can now login")
            res.redirect("/users/login");
        }
    } catch (err) {
        console.log(err)
    }
}

//reset password
exports.resetPassword = async(req, res) => {
    const { password1, password2 } = req.body;
    let errors = [];
    if (!password1 || !password2) {
        errors.push({ msg: "Please enter all fields" })
    }
    req.flash("success_msg", "Password updated")
    await User.updateOne({ password: password1 })
    console.log("Password updated, You can login")
    res.redirect("/users/login")
}


//MailSender Details

var Transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'f190946@nu.edu.pk',
        pass: '20481506'
    },
    tls: {
        rejectUnauthorized: false
    }
});



//Handle Post Request to add a new user
exports.registerUser = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
        errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: "Email already exists" });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    emailToken: crypto.randomBytes(64).toString('hex'),
                    isVarified: false,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    "success_msg",
                                    "Verification email is sent to your entered email"
                                );
                                //Send Email 

                                var mailOptions = {
                                    from: 'f190946@nu.edu.pk',
                                    to: newUser.email,
                                    subject: "Verify your Email",
                                    html: `<h2> Thanks! for Registering to Red Caps </h2
                    <h4> Please Verify your email to continue... </h4> 
                  <a href ="http://localhost:3021/users/verify-login"> Verify Your email </a>`
                                };

                                //Sending Email
                                Transport.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });

                                res.redirect("/users/login");
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
};

//Handle post request to Login a user
exports.loginUser = (req, res, next) => {
    const user = User.findOne({ isVarified: true })
    if (user) {
        passport.authenticate("local", {
            successRedirect: "/dashboard/1",
            failureRedirect: "/users/login",
            failureFlash: true
        })(req, res, next);
    } else {
        console.log("First verify the email")
    }
};

// Logout already logined user
exports.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
};


// storage for multer
// const storage = multer.diskStorage({
//     destination: function(request, file, callback) {
//         callback(null, './uploads/images')
//     },

//     filename: function(request, file, callback) {
//         callback(null, Date.now() + file.originalname);
//     }
// })

// upload multers

// var upload = multer({
//     storage: storage
// })



//Listing Product
exports.listProduct = (req, res) => {
    console.log("Inside list products")
    const { name, category, description, price, quantity } = req.body;
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var image = {
        data: new Buffer(encode_img, 'base64'),
        contentType: req.file.mimetype,
    };
    let errors = [];
    if (errors.length > 0) {
        res.render("adminAddProduct", {
            errors,
            name,
            category,
            description,
            price,
            quantity,
            image
        });
    } else {
        product.findOne({ name: name }).then(user => {
            console.log("In find one condition")
            if (user) {
                errors.push({ msg: "Product already exists" });
                res.render("adminAddProduct", {
                    errors,
                    name,
                    category,
                    description,
                    price,
                    quantity,
                    image
                });
            } else {
                const newProduct = new product({
                    name,
                    category,
                    description,
                    price,
                    quantity,
                    image,
                });
                newProduct.save()
                    .then((result) => {
                        //res.send(result);
                        console.log("Product added in DB")
                            // req.flash("success_msg", "Product Added");
                        res.redirect("/adminManageProduct");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                res.redirect("/adminManageProduct");
                console.log("Product added in DB")
                    // req.flash("success_msg", "Product Added");
            }
        });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, category, description, price, quantity } = req.body;
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var image = {
        data: new Buffer(encode_img, 'base64'),
        contentType: req.file.mimetype,
    };
    let result = await product.updateOne(
    {
        _id:req.params.id
    },
    {
        name,
        category,
        description,
        price,
        quantity,
        image,
    });
      if (!result)
        return res.status(400).json({
          err: `Oops something went wrong! Cannont update product with ${req.params.id}.`
        });
      req.flash("product_update_success_msg", "Product updated successfully");
      res.redirect("/adminManageProduct"); 
};

  exports.update = async function(req, res) {
    let products = await product.findOne({ _id: req.params.id });
    res.render("adminUpdate", {
      products,
      layout: "layouts/studentLayout"
    });
  };

  exports.delete = async (req, res) => {
    let result = await product.deleteOne({ _id: req.params.id });
    if (!result)
      return res.status(400).json({
        err: `Oops something went wrong! Cannont delete product with ${req.params.id}.`
      });
    //req.flash("student_del_success_msg", "Student has been deleted successfully");
    res.redirect("/adminManageProduct");
  };
//Profile
  exports.editprofile = (req, res) => {
    console.log("Inside edit profile")
    const { fname, lname, address, country, city, email } = req.body;
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var image = {
        data: new Buffer(encode_img, 'base64'),
        contentType: req.file.mimetype,
    };
    let errors = [];
    if (errors.length > 0) {
        res.render("dasboard", {
            fname, lname, address, country, city, email,image
        });
    } else {
        profile.findOne({ email: email }).then(user => {
            console.log("In find one condition")
            if (user) {
                errors.push({ msg: "Profile already exists !" });
                res.render("dashboard", {
                    fname, lname, address, country, city, email,image
                });
            } else {
                const newProfile = new profile({
                    fname, lname, address, country, city, email,image
                });
                newProfile.save()
                    .then((result) => {
                        //res.send(result);
                        console.log("Profile added in DB")
                            // req.flash("success_msg", "Product Added");
                        res.redirect("/dasboard/1");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                res.redirect("/dashboard/1");
                console.log("Profile added in DB")
                    // req.flash("success_msg", "Product Added");
            }
        });
    }
};  
  