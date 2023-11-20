"use strict";

import { Response, Request } from "express";

/**
 * Is API running.
 * @route GET /api
 */
export const getHealth = (req: Request, res: Response) => {
  res.json({ status: "OK" });
};
