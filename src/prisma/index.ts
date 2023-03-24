import { PrismaClient } from ".prisma/client";
import e from "express";


const prismaClient = new PrismaClient ();

export default prismaClient;