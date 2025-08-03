const Listing = require('../models/listing.js');
const Review = require('../models/reviews.js');

module.exports.postReview = async (req,res)=>{
  let listing = await Listing.findById(req.params.id);
  console.log(listing)
  let review = new Review(req.body);
  review.author = req.user._id; //setting the author of the review to the current user
  console.log(review);
  listing.reviews.push(review);
 

  await review.save();
  await listing.save();

  console.log("review saved");
  req.flash("success","New Review created!");
  res.redirect(`/listings/${listing._id}`);
};


module.exports.deleteReview = async(req,res)=>{
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);
  };