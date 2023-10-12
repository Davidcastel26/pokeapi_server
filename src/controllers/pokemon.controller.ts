import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import prismadb from "../models/prismadb";
import { Pokemon_Base } from "../typeScript/interfaces/pokemon";

export const createPokemon = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {
    
    const { name, typeId }:Pokemon_Base = req.body;

    try {
        
        const id = uuidv4();

        const postPokemon:Pokemon_Base={
            idPokemon: id,
            name,
            typeId
        }

        await prismadb.pokemon.create({
            data:{
                idPokemon: postPokemon.idPokemon,
                name: postPokemon.name,
                typeId: postPokemon.typeId
            }
        })

        res.status(201).json(postPokemon)

    } catch (error) {
        next(error)
    }

}

export const getAllPokemons = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {

    const { limit, since } = req.query;

    try {

        const allPokemons = await prismadb.pokemon.findMany({
            include:{
                type: true,
                evolutionTo:true
            },
            take: limit ? Number(limit): undefined,
            skip: since ? Number(since) : undefined
        })

        return res.status(200).json(allPokemons)
        
    } catch (error) {
        next(error)
    }

}

export const getOnePokemon = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {

    const { idPokemon } = req.params;

    try {
        
        const getPokemon = await prismadb.pokemon.findUnique({
            where:{
                idPokemon:idPokemon,
            },
            include:{
                evolutionTo: true
            }
        })

        return res.status(200).json(getPokemon)

    } catch (error) {
        next(error)
    }

}

export const updateApokemon = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {


    const { idPokemon } = req.params;
    const { name, typeId }:Pokemon_Base = req.body
    try {

        const poekmonUpdate = {
            name,
            typeId
        }

        await prismadb.pokemon.update({
            where:{
                idPokemon
            },
            data:{
                name: poekmonUpdate.name,
                typeId: poekmonUpdate.typeId,
            }
        })
        
        return res.status(202).json(poekmonUpdate)

    } catch (error) {
        next(error)
    }
}

export const updateStatus = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {


    const { idPokemon } = req.params;
    const { state } = req.body
    try {

        const pokemonStatus = await prismadb.pokemon.update({
            where:{
                idPokemon
            },
            data:{
                isActive: state
            }
        })
        
        return res.status(202).json(pokemonStatus)

    } catch (error) {
        next(error)
    }
}

export const deletePokemon = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {

    const { idPokemon } = req.params;

    try {
        
        await prismadb.evolution.deleteMany({
            where:{
                pokemonId:idPokemon
            },
            
        })

        const deletePokemon = await prismadb.pokemon.delete({
            where:{
                idPokemon:idPokemon
            },
        })

        res.status(204).json(deletePokemon)

    } catch (error) {
        next(error)
    }

}

export const searchPokemons = async (
    req: Request,
    res: Response,
    next:NextFunction
) => {

    const { searchParam } = req.body;

    try {
        
        const results = await prismadb.pokemon.findMany({
            where:{
                OR: [
                    {
                        name: {
                            contains:searchParam
                            // like:
                        }
                    }, {
                        idPokemon: {

                            equals:searchParam
                        }
                    }
                ]
            },
            include:{
                evolutionTo: true
            }
        })

        return res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}