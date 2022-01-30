import { User } from "../model/user";
import { Request, Response } from "express";

/**
 * Request and response is passed as is if needed.
 */
export interface Context {
  req: Request;
  res: Response;
  user: User | null;
}
