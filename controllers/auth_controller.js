const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt');

//GET route for signup page
router.get('/signup', (req,res)=>{
    res.render('signup')
  })

//POST route to create an account
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

//GET route for login page
router.get('/login', (req,res)=>{
    res.render('login')
  })

//POST route to login, comparing email and "varifying" user
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
                res.send("Login Successful!");
            } else {
                res.status(401).send("Wrong Password!  Please try again.");
            }
        }
    }).catch(err=>{
        return res.status(500).end();
    })
})

//GET route for keeping track of user 
router.get("/readsessions",(req,res)=>{
    res.json(req.session)
})

//GET route for logging out of account
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect("/auth/login");
})


module.exports = router;