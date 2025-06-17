import { Request, Response } from "express";
import { testDatabaseConnection } from "../services/testServices.js";

export const ping = async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json({ message: "Ping Successful" });
};

export const pingDB = async (req: Request, res: Response): Promise<any> => {
    const validateDB = await testDatabaseConnection()
    if (validateDB) {
        return res.status(200).json({ message: "DB Ping Successful" });
    }
    return res.status(500).json({ message: "DB Ping Unsuccessful" });
};