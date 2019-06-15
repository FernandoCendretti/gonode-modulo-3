const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Utilização dos hooks:
 * Os hooks são os meios pelos quais o sistema "escuta" ações feitas
 * pelo usuário e as manipula de maneira assincrona. Nesse método o hook
 * vai executar antes da ação save, que vale tanto para criação quanto
 * para atualização
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

// Método que cada instancia do usuário terá
UserSchema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

/**
 * Utilização do JWT:
 * O JWT é o meio pelo qual podemos criptografar informações do usuário que são
 * importantes, na utilização so "sign" recebemos 3 parametos: Informação a ser
 * criptografada, uma "palavra secreta" e em quanto tempo ela expira
 */

// Método estático que é disparado pelo model User, e não por uma istância de user
UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
