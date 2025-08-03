const joi = require('joi'); //used to validate the fields in the schema


module.exports.listingschema = joi.object({
    
        title: joi.string().required(),
        description:joi.string().required(),
        location :joi.string().required(),
        country :joi.string().required(),
        price :joi.number().required().min(0),
        image:joi.string().allow("",null)
});


module.exports.reviewSchema = joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required()
})