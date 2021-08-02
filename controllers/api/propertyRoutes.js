const router = require('express').Router();
const {User,Property} = require('../../models');

router.get('/',async (req,res)=>{
    res.render('addForm',{loggedIn:req.session.loggedIn});
});

router.get('/:id',async (req,res)=>{
    console.log(req.params.id);
    try {
        const propertyData = await Property.findByPk(req.params.id,{
            include:[{model:User}],
        })
        res.render('detail',
            {
                id:propertyData.id,
                address:propertyData.address,
                availability:propertyData.availability,
                name:propertyData.user.username,
                email:propertyData.user.email,
                phone:propertyData.user.phone,
                loggedIn:req.session.loggedIn,
            }
        );
    } catch (err) {
        res.json(err);
    }
    
})

module.exports = router;