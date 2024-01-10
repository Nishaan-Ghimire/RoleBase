import cors from "cors";
import express from "express";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ROUTES
import abibahitCertRoutes from "./routes/abibahitcert.routes.js";
import birthCertRoutes from "./routes/birthcert.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(
  "/images",
  express.static(path.join(__dirname, "..", "public", "images"))
);

app.use("/users", userRoutes);
app.use("/birth-certs", birthCertRoutes);
app.use("/abibahit-certs", abibahitCertRoutes);

export { app };
