const router = require("express").Router();
const { Contract, Property, User } = require("../../models");

// Create Route to Get Owner by email
router.get("/", async (req, res) => {
  try {
    const ownerData = await User.findOne({
      where: { email: req.body.email },
    });

    res.render("owner", {
      ownerData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Route to owner post
router.post("/", async (req, res) => {
  try {
    const ownerData = await Property.create({
      address: req.body.address,
      availability: 1,
    });
    const leaseLength = await Contract.create({
      term: req.body.term,
    });

    req.session.save(() => {
      req.session.Owner = true;

      res.status(200).json(ownerData);
      res.status(200).json(leaseLength);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
