import assert from "node:assert";
import AppError from "./AppError";

type AppAssert = (
  condition: any,
  statusCode: number,
  message: string
) => asserts condition;

const appAssert: AppAssert = (condition, statusCode, message) => {
  assert(condition, new AppError(statusCode, message));
};

export default appAssert;