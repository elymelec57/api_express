const db = require("./db");
const fs = require('fs');
const helper = require("../helper");
const config = require("../config");
const path = require("path");
const fileUpload = require("express-fileupload");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM empleados LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getEmpleado(id) {
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM empleados WHERE id=${id}`
  );
  const data = helper.emptyOrRows(rows);
  //const meta = { page };

  return {
    data
    //meta,
  };
}

async function create(empleado) {
    
  let response = {"error": true, "message": "No Data match", "image": ""}
  
  let path = './public/img/';
  let nameImg = Date.now()+'.jpg';
  let imageData = empleado.fileimg;

  let base64Data = imageData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  fs.writeFileSync(path + nameImg, base64Data,  {encoding: 'base64'});
  response = {"error": false, "message": "Save image", "image": path + nameImg}

  const result = await db.query(
    `INSERT INTO empleados 
    (name, last_name, job, phone, address, age, photo) 
    VALUES 
    ("${empleado.name}", "${empleado.last_name}", "${empleado.job}", "${empleado.phone}", "${empleado.address}", "${empleado.age}", "${nameImg}")`
  );

  let message = "Error in creating programming language";

  if (result.affectedRows) {
    message = "Programming language created successfully";
  }

  return { message };
}

async function update(id, empleado) {

  let response = {"error": true, "message": "No Data match", "image": ""}
  
  let path = './public/img/';
  let nameImg = Date.now()+'.jpg';
  let imageData = empleado.fileimg;

  let base64Data = imageData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  fs.writeFileSync(path + nameImg, base64Data,  {encoding: 'base64'});
  response = {"error": false, "message": "Save image", "image": path + nameImg}

  const result = await db.query(
    `UPDATE empleados 
    SET name="${empleado.name}", last_name="${empleado.last_name}", job="${empleado.job}", 
    phone="${empleado.phone}", address="${empleado.address}", age="${empleado.age}", photo="${nameImg}" 
    WHERE id="${id}"`
  );

  let message = "Error in updating programming language";

  if (result.affectedRows) {
    message = "Programming language updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM empleados WHERE id=${id}`
  );

  let message = "Error in deleting programming language";

  if (result.affectedRows) {
    message = "Programming language deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getEmpleado
};