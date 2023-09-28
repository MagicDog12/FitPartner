import express from 'express';
const app = express();
const PORT = process.env.PORT || 3001;

// Ruta principal del servidor
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Ruta principal de la api
app.get("/api", (req, res) => {
  res.json({ message: "Hola desde la api del servidor!" });
});

// Confirmación del puerto
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})