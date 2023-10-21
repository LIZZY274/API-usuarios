const Usuario = require("../models/usuario.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const usuario = new Usuario({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    contrasenia: req.body.contrasenia
  });

  Usuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  Usuario.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Usuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Usuario with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


exports.findAllPublished = (req, res) => {
  Usuario.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving usuario."
      });
    else res.send(data);
  });
};


exports.update = (req, res) => {
 
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Usuario.updateById(
    req.params.id,
    new Usuario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Usuario with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Usuario with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.delete = (req, res) => {
  Usuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete usuario with id " + req.params.id
        });
      }
    } else res.send({ message: `Usuario was deleted successfully!` });
  });
};


exports.deleteAll = (req, res) => {
  Usuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all usuarios."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};

