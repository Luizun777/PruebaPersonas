var express = require('express');
var verifica = require('../middlewares/autenticacion');

var app = express();

//mongo
var PersonaModel = require('../models/personas');

// Rutas
app.get('/', (req, res, next) => {

    PersonaModel.find({}, (err, per) => {
        if ( err ) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Perosnas en DB',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            personas: per
        });
    });
});

// ====================
// Actualizar persona
// ====================
app.put('/:id', verifica.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    // res.status(200).json({
    //     ok: true,
    //     id: id,
    //     body: body
    // });

    PersonaModel.findById( id, (err, perso) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!perso) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La persona con el id ' + id + ' no existe',
                errors: { message: 'No existe un persona con ese ID' }
            });
        }

        perso.nombre = body.nombre;
        perso.edad = body.edad;
        perso.sexo = body.sexo;
        perso.codigo = body.codigo;

        perso.save((err, personaGuardar) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar persona',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                persona: personaGuardar
            });

        });
    });

});

// ====================
// Crear Persona
// ====================
app.post('/', verifica.verificaToken, (req, res) => {
    var body = req.body;

    var persona = new PersonaModel({
        nombre: body.nombre,
        edad: body.edad,
        sexo: body.sexo,
        codigo: body.codigo
    });

    persona.save( (err, personaGuardar ) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear persona',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            persona: personaGuardar,
            personaToken: req.persona
            })
    })
});

// ====================
// Eliminar Persona
// ====================
app.delete('/:id', verifica.verificaToken, (req, res) => {
    var id = req.params.id;

    PersonaModel.findByIdAndRemove(id, (err, personaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!personaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            persona: personaBorrado
        });

    });


});

module.exports = app;