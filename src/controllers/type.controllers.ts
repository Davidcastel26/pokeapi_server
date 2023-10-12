import { NextFunction, Request, Response } from "express";
import prismadb from "../models/prismadb";



export const getTypes = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {

    const { limit, since } = req.query;

    try {

        const allPokemons = await prismadb.type.findMany({
            include:{pokemon: true},
            take: limit ? Number(limit): undefined,
            skip: since ? Number(since) : undefined
        })

        return res.status(200).json(allPokemons)
        
    } catch (error) {
        next(error)
    }

}
export const getTypesById = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {

    const { idTypes } = req.params;

    try {
        
        const getPokemon = await prismadb.type.findUnique({
            where:{
                idTypes:idTypes,
            },
            include:{
                pokemon:true
            }
        })

        return res.status(200).json(getPokemon)

    } catch (error) {
        next(error)
    }

}