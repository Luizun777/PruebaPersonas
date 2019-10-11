var express = require('express')
var bcrypt = require('bcryptjs')
var verifica = require('../middlewares/autenticacion')

var app = express()

// Mongo
var UsuarioModel = require('../models/usuarios')

// Rutas
app.get('/', (req, res, next) => {
  UsuarioModel.find({}, 'usuario role')
    .exec((err, usu) => {
      if (err) {
        res.status(500).json({
          ok: false,
          mensaje: 'Error cargando Usuarios en DB',
          errors: err
        })
      }
      res.status(200).json({
        ok: true,
        usuarios: usu
      })
    })
})

// ====================
// Actualizar usuario
// ====================
app.put('/:id', verifica.verificaToken, (req, res) => {
  var id = req.params.id
  var body = req.body

  UsuarioModel.findById(id, (err, usu) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuario',
        errors: err
      })
    }

    if (!usu) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El usuario con el id ' + id + ' no existe',
        errors: { message: 'No existe un usuario con ese ID' }
      })
    }

    usu.usuario = body.usuario
    usu.role = body.role

    usu.save((err, usuarioGuardar) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al actualizar usuario',
          errors: err
        })
      }

      usuarioGuardar.password = ':v'

      res.status(200).json({
        ok: true,
        usuario: usuarioGuardar
      })
    })
  })
})

// ====================
// Crear usuario
// ====================
app.post('/', verifica.verificaToken, (req, res) => {
  var body = req.body

  var usuario = new UsuarioModel({
    usuario: body.usuario,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })

  usuario.save((err, usuarioGuardar) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear persona',
        errors: err
      })
    }
    res.status(201).json({
      ok: true,
      usuario: usuarioGuardar,
      usuarioToken: req.usuario
    })
  })
})

module.exports = app
