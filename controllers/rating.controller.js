const Review = require("../models/review.model");
const Product = require("../models/listproduct");

exports.addReview = (req, res) => {
    let review = new Review({
        username: req.body.Username,
        data: req.body.data,
        rating: req.body.Rating,
        // refrence: prod
    });
    review.save(function(err) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont insert Product.." });
        }
        req.flash("product_add_success_msg", "New Product add Successfully");
        //  res.redirect(`/users/reviewsView/${prod}`);
    });
};
//let prod
//exports.all = (req, res) => {
//  prod = req.params.id;
//Review.find({ refrence: prod }, function(err, review) {
//  if (err) {
//    return res
//      .status(400)
//    .json({ err: "Oops something went wrong! Cannont find students." });
//}
//res.status(200).render("reviews", { user: req.user, review: review });
// });
//};