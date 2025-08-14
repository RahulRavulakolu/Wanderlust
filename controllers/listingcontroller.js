const Listing = require('../models/listing.js');
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken  = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.allListings = async (req, res) => {
    const listings = await Listing.find({});
    
    res.render('listings/index.ejs', {listings} );
}

module.exports.newListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing =async(req,res)=>{
        let id = req.params.id;
        const listing = await Listing.findById(id)
        .populate({
          path: "reviews",
          populate: {path:"author"},
        }).populate("owner");
        if(!listing){
          req.flash("error","Listing does not exist!");
          return res.redirect('/listings');
        }
        res.render("listings/show.ejs", {listing} );
};

module.exports.createListing =async (req, res,next) => {

        let response = await geocodingClient.forwardGeocode({
          query: req.body.location, // using the location from the form
          limit: 1
        })
        .send()

        let url = req.file.path; // getting the file path from multer
        let filename = req.file.filename; // getting the file name from multer
        const listing = new Listing(req.body);
        listing.owner = req.user._id; //setting the owner of the listing to the current user
        listing.image = {url, filename}; // setting the image field with the file path and name
        listing.geometry = response.body.features[0].geometry; // setting the geometry field with the coordinates from the geocoding response
        let savedlisting = await listing.save();
        console.log(savedlisting);
        
        req.flash("success","New listing created!");
        res.redirect('/listings');
};

module.exports.editListingForm = async (req, res) => {
        let id = req.params.id;
        const listing = await Listing.findById(id);
        if(!listing){
          req.flash("error","Listing does not exist!");
          return res.redirect('/listings');
        }
        let imageurl = listing.image.url;
        imageurl = imageurl.replace("/upload","/upload/h_250,w_200"); // editing image quality  using cloudinay image transformation
        console.log(imageurl)

        res.render("listings/edit.ejs", {listing , imageurl} );
    };


module.exports.updateListing = async (req, res) => {
        let id = req.params.id;
        const listing = await Listing.findByIdAndUpdate(id, req.body, {runValidators: true});
        if(typeof req.file !== 'undefined') {
         let url = req.file.path; // getting the file path from multer
        let filename = req.file.filename; // getting the file name from multer
         listing.image = {url, filename}; // setting the image field with the file path and name
         await listing.save();
        };

        req.flash("success","Listing Updated!");
        res.redirect(`/listings/${listing._id}`);
};


module.exports.destroyListing =async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted Successfully!");
    res.redirect("/listings")
};


module.exports.filterListing = async(req,res)=>{
  let {category} = req.params;
  const listings = await Listing.find({category:category});
   if (listings.length === 0) {
    req.flash("error", `No listings found for ${category}`);
  }
  res.render('listings/index.ejs', {listings} );
};