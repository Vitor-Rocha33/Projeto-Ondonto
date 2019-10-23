const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    fistName : String,
    lastName : String,
    dateOfBirth : String,
    gender : String,
    maritalStatus : String,
    address : String,
    neighborhood : String,
    city : String,
    uf : String,
    zipCode : String,
    homePhone : String,
    phoneNumber : String,
    email : String,
    profession : String,
    id : String,
    cpf : String,
    mothersName : String,
    fathersName : String,
    responsible : String 
});

module.exports = mongoose.model('Patient', PatientSchema);