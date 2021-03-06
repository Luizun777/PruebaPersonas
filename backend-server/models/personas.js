var mongoose = require('mongoose')
// var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema

var usuarioSchema = new Schema({
  nombre: { type: String, required: [true, 'Nombre necesario'] },
  edad: { type: Number, required: [true, 'Edad necesaria'] },
  sexo: { type: String, default: 'No binario' },
  codigo: { type: String, default: '' }
})

// usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Personas', usuarioSchema)
