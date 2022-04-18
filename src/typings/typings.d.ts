import { Request, Response } from "express";

export type RouteExecute = (req: Request, res: Response) => any;

export interface RouteInterface {
    name: string,
    middleware?: any[],
    execute: RouteExecute
}