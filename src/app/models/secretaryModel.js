const mongoose = require('../../db/database');

const bcrypt = require('bcryptjs');

const secretarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    CPF: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    date_birth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    rg: {
        type: String,
        required: true
    },
    dentist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dentist',
        required: true
    }]
});

secretarySchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next();
})

const Secretary = mongoose.model("Secretary", secretarySchema);

module.exports = Secretary