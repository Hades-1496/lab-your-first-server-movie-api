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


let nextId = 6;

// Rutas


//Servidor
app.get('/peliculas', (req, res) => {
  const { genero } = req.query;

  if (genero) {
    const filtradas = peliculas.filter(p => {
      // Normalizamos ambos textos para quitarles los acentos
      const generoPeliNormalizado = p.genero.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const generoUrlNormalizado = genero.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      // No entiendo muy bien cómo funciona normalize("NDF").replace(/[\u0300-\u036f]/g,"") Pero supongo que elimina los acentos bajo la serie de caracteres UTF-8.
      return generoPeliNormalizado === generoUrlNormalizado;
    });
    return res.json(filtradas)
  }
    res.json(peliculas)
})

app.get('/estadisticas', (req,res) => {
  const conNota = peliculas.filter(p => p.nota !== null);

  if (conNota.length === 0) {
    return res.json({ media: null, total: 0 });
  }

  const suma = conNota.reduce((acc, p) => acc + p.nota, 0);
  const media = (suma / conNota.length).toFixed(2); // Sale 4005 porque dos películas tienen de nota 9999

  res.json({
    media: Number(media),
    total: peliculas.length,
    conNota: conNota.length
  })
})
app.get('/peliculas/:id', (req, res) => {
  const id = Number(req.params.id)
  const pelicula = peliculas.find(p => p.id === id)

  if (!pelicula) {
    return res.status(404).json({ error: 'Película no encontrada' })
  }

  res.json(pelicula)
})


app.post('/peliculas', (req,res) => {
  const { titulo, director, anio, genero, nota } = req.body;

  if (!titulo || !director || !anio || !genero) {
    // Menos mal que la nota es opcional
    return res.status(400).json({
      error: 'Los campos de título, director, año y género son obligatorios.'
    });
  }
  if (nota !== undefined && (nota < 0 || nota > 10)) {
    return res.sendStatus(400).json({
      error: 'La nota debe tener un valor entre 0 y 10'
    });
  }

  const nuevaPelicula = {
    id: nextId++,
    titulo,
    director,
    anio: Number(anio),
    genero,
    nota: nota !== undefined ? Number(nota) : null
  };

  peliculas.push(nuevaPelicula);

  res.status(201).json(nuevaPelicula);
})

app.delete('/peliculas/:id', (req, res) => { //Casi idéntica a búsqueda de películas por id.
  const id = Number(req.params.id);
  const index = peliculas.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }

  const eliminada = peliculas.splice(index, 1)[0]; // Única diferencia respecto a get/peliculas/:id
  // [0] es para eliminar el array y que sólo salga el elemento resultante.

  res.json({ mensaje: 'Película eliminada', pelicula: eliminada });
})

//Casos inexistentes
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` });
});

app.listen(PORT, () => {console.log('Servidor corriendo en http://localhost:${PORT}')});

