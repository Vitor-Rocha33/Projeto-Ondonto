const mongoose = require('../../db/database');

const bcrypt = require('bcryptjs');

const dentistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,    
        required:true
    },
    state:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    CPF:{
        type:String,
        required:true
    },
    especialization:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    },
    date_birth:{
        type:Date,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    CRO:{
        type:String,
        required:true
    },
    rg:{
        type:String,
        required:true
    }
});

dentistSchema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  
    next();
  });


  const Dentist = mongoose.model("Dentist", dentistSchema);

  module.exports = Dentist;
