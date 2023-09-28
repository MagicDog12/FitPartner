import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express();

// Uso de middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // si recibe un body lo parsea a JSON

// Ruta principal a las demás rutas
app.use("/", routes);

export default app;