const mongoose = require('mongoose');
let Mongo_URL = "mongodb://127.0.0.1:27017/Wanderlust"
const Listing = require('../models/listing.js');
const initdata = require('../init/data.js');


main().then(() => {
  console.log('Connected to MongoDB');  
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

async function main() {
  await mongoose.connect(Mongo_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDb = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) =>({
        ...obj,
        owner:"68889aab45333ce09312b449" //this is the id of the user who created the listing
    })); 
    await Listing.insertMany(initdata.data);
    console.log('Database initialized with sample data');
};

initDb(); 
