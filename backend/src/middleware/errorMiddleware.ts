import type { ErrorRequestHandler, Response } from "express";
import AppError from "../utils/AppError";

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({ message: error.message });
};

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  return res.status(500).send("Internal server error");
};

export default errorHandler;