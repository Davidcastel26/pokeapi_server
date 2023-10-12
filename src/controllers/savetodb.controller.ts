import axios from "axios";
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from "express";
import { Pokemon_Root } from "typeScript/interfaces/pokemon";
import { Type_Root } from "typeScript/interfaces/typePoke";
import { Evolution_Root } from "typeScript/interfaces/chainEvo";
import prismadb from "../models/prismadb";
dotenv.config();

const apilinkPokemon = process.env.URL_POKEMON_API || 'default';
const apilinkType = process.env.URL_POKETYPE_ || 'default';
const apiChainPoke = process.env.URL_POKE_CHAIN || 'default';

export const getPokemons = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const pokemonsData = await axios.get(apilinkPokemon)
        const results = pokemonsData.data.results;
        const urlsPokemon = results.map( (e:any) => e.url)
        // console.log(results)
        for(const u of urlsPokemon){
            const getPokemonDetail = await axios.get(u)
            const dataByPokemon: Pokemon_Root = getPokemonDetail.data;
            const {id, name, types} = dataByPokemon;

            const typeNames = types.map(e => e.type.name)

            const findTypePokemon = await prismadb.type.findMany({where:{
                typeName: {
                    in: typeNames
                },
                
            },select:{idTypes:true}})
            const typeIds = findTypePokemon.map((type) => type.idTypes);

            if( findTypePokemon ){

                await prismadb.pokemon.create({
                    data:{
                        idPokemon:id.toString(),
                        name: name,
                        typeId: typeIds[0]
                    },
                })
            }
        }

        res.json({msg: 'looking'})

    } catch (error) {
        next(error)
    }
}

export const typePokemons = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const typesPokemon = await axios.get(apilinkType)
        const resultType  = typesPokemon.data.results;
        const urlType = resultType.map((e:any) => e.url )

        for(const tp of urlType ){
            const getTypeDetail = await axios.get(tp)
            const dataType: Type_Root = getTypeDetail.data; 
            const {id, name} = dataType;
            // console.table({id,name})
            await prismadb.type.create({
                data:{
                    idTypes: id.toString(),
                    typeName: name,
                }
            })
        }
        res.json({msg: 'looking & saving types'})

    } catch (error) {
        next(error)
    }
}

export const chainsPokemons = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const typesPokemon = await axios.get(apiChainPoke)
        const resultType  = typesPokemon.data.results;
        const urlChain = resultType.map((e:any) => e.url )
        
        for(const ch of urlChain ){

            const blockChain = [];

            const getTypeDetail = await axios.get(ch)
            const dataType: Evolution_Root = getTypeDetail.data; 
            const { chain } = dataType;

            const firstEvolution = blockChain.push(chain.species.name);

            if( chain.evolves_to && chain.evolves_to.length > 0 ){
                chain.evolves_to.forEach((e)=> {
                    if(e === null) return
                    blockChain.push(e.species.name)
                    if(e.evolves_to.length > 0 ){
                        e.evolves_to.forEach(e => blockChain.push(e.species.name))
                    }
                })
                
            }

            const findChainPokemon = await prismadb.pokemon.findFirst({
                where:{
                    name: blockChain[0]
                },
            })

            if( findChainPokemon && findChainPokemon.name !== null){

                await prismadb.evolution.create({
                    data:{
                        pokemonId: findChainPokemon.name,
                        evoName1: blockChain[0],
                        evoName2: blockChain[1],
                        evoName3: blockChain[2]
                    },
                })

            }
        }
        
        res.json({msg: 'looking'})

    } catch (error) {
        next(error)
    }
}