const router = require("express").Router();
const db = require("../models");

router.get('/', (req, res)=>{
    db.Wine.findAll
})