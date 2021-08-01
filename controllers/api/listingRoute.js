const router = require("express").Router();
const { Property, User } = require("../../models");

router.get('/',async (req,res)=>{
    try {
        const propertyData = await Property.findAll();
        
        const listings = propertyData.map(property => {
            property.get({plain: true});
        });

        res.render('listing',{
            listings,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id',(req,res)=>{
    res.json(req.params.id);
});

module.exports = router;