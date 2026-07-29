const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerUser = async (req,res)=>{

    const {name,email,password} = req.body;


    const hashedPassword = await bcrypt.hash(password,10);


    res.json({
        message:"Register API working",
        user:{
            name,
            email,
            password:hashedPassword
        }
    });

};


exports.loginUser = async(req,res)=>{

    const {email,password} = req.body;


    const token = jwt.sign(
        {email},
        "secretkey",
        {expiresIn:"1h"}
    );


    res.json({
        message:"Login API working",
        token
    });

};