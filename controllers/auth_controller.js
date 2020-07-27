const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt');


router.post('/signup',(req,res)=>{
    db.User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(userData=>{
        res.json(userData.id)
    }).catch(err=>{
        res.status(500).end();
    })
})

router.post('/login',(req,res)=>{
    db.User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        if(!user){
            return res.status(404).send("no such user")
        } else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = {
                    id:user.id,
                    name:user.name,
                    email:user.email
                }
                res.send("login successful!");
            } else {
                res.status(401).send("wrong password");
            }
        }
    }).catch(err=>{
        return res.status(500).end();
    })
})

// router.get("/readsessions",(req,res)=>{
//     res.json(req.session)
// })

// router.get('/secretroute',(req,res)=>{
//     if(req.session.user){
//         res.send(`welcome to the club ${req.session.user.name}!`)
//     }else {
//         res.status(401).send("log in first ya knucklehead!")
//     }
// })

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send('logged out!');
})


module.exports = router;