const Dentist = require('../models/dentistModel');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const env = require('../../../.env');

// Generate token
function generateToken(params = {}) {
    return jwt.sign(params, env.secret, {
      expiresIn: 300
    });
  };

exports.dentist_register = async(req,res) =>{
    try{
        const {email, name, telephone, date_birth,CPF,especialization,rg,CRO, password,state,lastName} = req.body;

        if(await Dentist.findOne({email}))
            return res.status(400).send({error:'This email already exists'});
        
        const createdDentist = await Dentist.create({email, name, telephone, date_birth,CPF,especialization,rg,CRO, password,state,lastName});
        
        createdDentist.password = undefined;

        return res.send({createdDentist,
            token: generateToken({
            id: createdDentist._id})
        });

    }catch(err){
        res.status(400).send({error:'Error in create a new Dentist'});
        console.log(err);
    }
};

exports.dentist_login = async(req,res)=>{
    try {
    const {email,password} = req.body;
    
    const dentist = await Dentist.findOne({ email }).select("+password");
    if(!dentist)
        return res.status(400).send({error:'Dentist not exist'});
    if (!(await bcrypt.compare(password, dentist.password)))

        return res.status(400).send({ error: "Invalid password" });
    
    dentist.password = undefined;
    res.send({dentist,
        token: generateToken({
        id: dentist._id})
    })
    

}catch(err){
    res.status(400).send({error:'error in authenticate'})
    console.log(err)
}
}   