 const fs = require('fs');

 let lsitadoPorHacer = [];

 const guardarDB = () => {
     let data = JSON.stringify(lsitadoPorHacer);

     fs.writeFile(`db/data.json`, data, (err) => {
         if (err) throw new Error('No se pudo grabar', err);
     });
 }

 const cargarDB = () => {
     try {
         lsitadoPorHacer = require('../db/data.json');

     } catch (err) {
         lsitadoPorHacer = [];
     }
 }


 const crear = (descripcion) => {
     cargarDB();
     let porHacer = {
         descripcion,
         completado: false
     };

     lsitadoPorHacer.push(porHacer);
     guardarDB();
     return porHacer;
 }

 const getListado = () => {
     cargarDB()
     return lsitadoPorHacer;
 }

 const actualizar = (descripcion, completado = true) => {
     cargarDB();
     let index = lsitadoPorHacer.findIndex(tarea => {
         return tarea.descripcion === descripcion;
     });

     if (index >= 0) {
         lsitadoPorHacer[index].completado = completado;
         guardarDB();
         return true;
     } else {
         return false;
     }
 }

 const borrar = (descripcion) => {
     cargarDB();
     let nuevoListado = lsitadoPorHacer.filter(tarea => {
         return tarea.descripcion !== descripcion
     });

     if (lsitadoPorHacer.length === nuevoListado.length) {
         return flase;
     } else {
         lsitadoPorHacer = nuevoListado;
         guardarDB();
         return true;
     }
 }

 module.exports = {
     crear,
     getListado,
     actualizar,
     borrar
 }