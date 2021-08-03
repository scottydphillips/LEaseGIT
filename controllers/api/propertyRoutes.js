const router = require('express').Router();
const {User,Property} = require('../../models');

router.get('/',async (req,res)=>{
    res.render('addForm',{loggedIn:req.session.loggedIn});
});

//POST To create new Property
router.post('/add',async(req,res)=>{
    console.log(req.body);
    try {
        const ownerData = await User.findOne({where:{
            email:req.session.email
        }})
        console.log(ownerData);
        const propertyData = await Property.create({
            address: req.body.address,
            availability:req.body.availability,
            owner_id: ownerData.id,
        });
        res.redirect('/api/user');
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//GET a particular Property
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
    
});

module.exports = router;