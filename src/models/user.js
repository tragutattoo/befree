const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {
    timestamps: true,
})

// middleware para criptografar a senha
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next() //Só faz o hash se a senha for modificada

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err) {
        next(err)
    }
})

module.exports = mongoose.model('User', UserSchema)