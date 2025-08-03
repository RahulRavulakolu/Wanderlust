const express = require('express');
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");

const listingcontrollers = require('../controllers/listingcontroller.js');


// multer for file uploads
const multer  = require('multer')
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });


//index and create listing
router.route('/')
  .get(
    WrapAsync(listingcontrollers.allListings)
  )
  .post( validateListing,
    isLoggedIn,
    upload.single('image'), // for handling file uploads
    WrapAsync(listingcontrollers.createListing)
  );

//new route]
router.get("/new", isLoggedIn, listingcontrollers.newListingForm);


// show, update and delete listing
router.route('/:id')
  .get( WrapAsync(listingcontrollers.showListing)
  )
  .put( validateListing,
    isLoggedIn,
    isOwner,
    upload.single('image'), // for handling file uploads
    WrapAsync(listingcontrollers.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    WrapAsync(listingcontrollers.destroyListing)
  );



//edit route
router.get("/:id/edit", 
  isLoggedIn,
  isOwner,
  WrapAsync(listingcontrollers.editListingForm)
);

module.exports = router;