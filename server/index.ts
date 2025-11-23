import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";
import { connectToDatabase, closeDatabase } from "./db/mongo";

// Import API routes
import authRoutes from "./api/auth";
import foodsRoutes from "./api/foods";
import exercisesRoutes from "./api/exercises";
import mealsRoutes from "./api/meals";
import workoutsRoutes from "./api/workouts";
import azkarRoutes from "./api/azkar";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Connect to MongoDB
  try {
    await connectToDatabase();
    log("✅ MongoDB connected successfully");
  } catch (error: any) {
    log("❌ MongoDB connection failed:", error?.message || error);
    process.exit(1);
  }

  // Register API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/foods", foodsRoutes);
  app.use("/api/exercises", exercisesRoutes);
  app.use("/api/meals", mealsRoutes);
  app.use("/api/workouts", workoutsRoutes);
  app.use("/api/azkar", azkarRoutes);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Darwfit API is running" });
  });

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`Error: ${status} - ${message}`);
    res.status(status).json({ error: message });
  });

  // Create HTTP server
  const server = createServer(app);

  // Setup Vite for development or serve static files for production
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    log(`🚀 Server running on port ${port}`);
    log(`📊 Environment: ${app.get("env")}`);
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    log('Shutting down gracefully...');
    await closeDatabase();
    server.close(() => {
      log('Server closed');
      process.exit(0);
    });
  });
})();
