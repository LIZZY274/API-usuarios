const sql = require("./db.js");


const Usuario = function(usuario) {
  this.nombre = usuario.nombre;
  this.apellido = usuario.apellido;
  this.correo = usuario.correo;
  this.contrasenia = usuario.contrasenia;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuarios: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM usuario WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = (title, result) => {
  let query = "SELECT * FROM usuarios";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.getAllPublished = result => {
  sql.query("SELECT * FROM usuario WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuario: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
    [usuario.nombre, usuario.apellido, usuario.correo, usuario.contrasenia, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated usuario: ", { id: id, ...usuario });
      result(null, { id: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
     
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted usuario with id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;