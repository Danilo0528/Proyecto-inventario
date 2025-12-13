const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, enum: ['admin', 'docente'],default: 'docente'},
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// encriptamos la contraseña antes de guardar el usuario
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// metodo para verificar si la clave es correcta al hacer login
userSchema.methods.comparePassword = async function(passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password);
}

// aqui sacamos la contraseña del objeto para no devolverla en la respuesta
userSchema.methods.toJSON = function() {
    let user = this.toObject();
    delete user.password;
    return user;
}

module.exports = mongoose.model('User', userSchema);