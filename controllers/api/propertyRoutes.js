const router = require('express').Router();
const {User,Property} = require('../../models');

router.get('/',async (req,res)=>{
    res.render('addForm',{loggedIn:req.session.loggedIn});
});

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


router.get('/plan', async (req, res) => {
    res.render('planner');
});

module.exports = router;