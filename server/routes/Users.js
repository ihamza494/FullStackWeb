const express = require('express');
const {Users} = require('../models');
const router = express.Router()
const bcrypt = require("bcrypt");




router.post("/" ,async (req, res)=>{
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        });
        res.json("Success");
    });
})

router.post("/login", async(req, res)=>{
    console.log(req.body);
    const { username, password} = req.body;
    console.log(password);
    const user = await Users.findOne({ where : { username : username }});
    console.log(user);
    if(!user){
        return res.json({ error: "User Doesn't exist"});
    };
    bcrypt.compare(password, user.password).then((match)=>{
        if(!match){
            return res.json({ error: "Wrong Password and Username."})
        }
        return res.json("You logged In successfully!");
    })

})




module.exports = router