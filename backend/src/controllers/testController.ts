import { Request, Response } from "express";

export const ping = async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json({ message: "Ping Successful" });
};