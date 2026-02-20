// server/index.js – minimal Express API
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingsRouter from "./routes/bookings.js";
import paymentsRouter from "./routes/payments.js";
import { verifyJwt } from "./utils/authMiddleware.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

// Public routes (health, Stripe webhook)
app.get("/healthz", (_, res) => res.send("OK"));
app.use("/api/payments", paymentsRouter);

// Protected routes – JWT verification
app.use("/api", verifyJwt);
app.use("/api/bookings", bookingsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API listening on ${PORT}`));
