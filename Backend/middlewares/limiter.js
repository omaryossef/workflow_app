import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 8 * 60 * 1000, // 8 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Zu viel versuche",
});
