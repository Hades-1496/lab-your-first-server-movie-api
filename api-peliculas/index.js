require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());



let peliculas = [
  {
    id: 1,
    titulo: 'Inception',
    director: 'Christopher Nolan',
    anio: 2010,
    genero: 'ciencia-ficcion',
    nota: 8.8
  },
  {
    id: 2,
    titulo: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    anio: 1994,
    genero: 'crimen',
    nota: 8.9
  },
  {
    id: 3,
    titulo: 'El Señor de los Anillos',
    director: 'Peter Jackson',
    anio: 2001,
    genero: 'fantasia',
    nota: 8.8
  },
  {
    id: 4,
    titulo: 'Army of Darkness',
    director: 'Sam Raimi',
    anio: 1992,
    genero: 'accion',
    nota: 9999.99,
  },
  {
    id: 5,
    titulo: 'The Thing',
    director: 'John Carpenter',
    anio: 1983,
    genero: 'Terror',
    nota: 9999.99,
  },
];


let nextId = 4;

// Rutas


//Servidor

app.listen(PORT, () => {console.log('Servidor corriendo en http://localhost:${PORT}')});

