const router = require("express").Router();
const db = require("../models");

router.get('/', (req, res)=>{
    db.Wine.findAll ({
        include:[db.Wine]
    }).then(userData=>{
        const userDataJson = userData.map(userObj=>{
            return userObj.toJSON();
        })
        const hbsObj = {
            users:userData
        }
        console.log(userData)
        res.render("index",hbsObj)
    })
})

module.exports = router;