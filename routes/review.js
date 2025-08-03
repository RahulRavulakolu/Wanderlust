const express = require('express');
const router = express.Router({mergeParams:true});
const WrapAsync = require("../utils/WrapAsync.js");
const Review = require('../models/reviews.js');
const Listing = require('../models/listing.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/reviewcontroller.js")

//review 

//post route

router.post("/",
  isLoggedIn,
  validateReview,
  WrapAsync(reviewcontroller.postReview));

//delete route

router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(reviewcontroller.deleteReview)
);


module.exports = router;