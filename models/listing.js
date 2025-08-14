const { string } = require('joi');
const mongoose = require('mongoose');
const Review = require("./reviews.js")
const schema = mongoose.Schema;

const listingSchema = new schema({
  title: {
    type: String,
    required: true,
    maxlength:50
  },
  description: {
    type: String,
  },
   image: {
    type: {
      url: String,
      filename: String
    }
  },
  price:{
    type:String,
  },
  location: {
    type: String,  
  },
  country: {
    type: String,
  },
  reviews:[
    {
      type: schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type: schema.Types.ObjectId,
    ref:"User"
  },
  geometry:{
     type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
  },
  category:{
    type:String,
    enum:['Trending','Rooms','Iconic_places','Mountains','Castles','Amazing_pools','Camping','Farm','Arctic','Domes','Boat'],
    required: true
  }

});


listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}})
  }
})
    
module.exports = mongoose.model('Listing', listingSchema);