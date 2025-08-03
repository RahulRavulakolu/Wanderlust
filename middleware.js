const Listing = require("./models/listing");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingschema ,reviewSchema} = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
   
    req.flash("error", "You must be signed in to create a listing!");
    return res.redirect("/login");
  }
  next();
};

module.exports.savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async(req,res,next)=>{
  let id = req.params.id;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(req.user._id)){
        req.flash("error","You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params; // FIX: get reviewId, not id
  const review = await Review.findById(reviewId);
  
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect("back");
  }

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this review!");
    return res.redirect(`/listings/${req.params.id}`);
  }

  next();
};



 //schema validation function
module.exports.validateListing = (req,res,next)=>{
  let {error} = listingschema.validate(req.body);
  if(error){
      throw new ExpressError(400,error);
  }else{
    next();
  }
}


//review validation
module.exports.validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
      throw new ExpressError(400,error);
  }else{
    next();
  }
}
