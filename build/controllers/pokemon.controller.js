"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPokemons = exports.deletePokemon = exports.updateStatus = exports.updateApokemon = exports.getOnePokemon = exports.getAllPokemons = exports.createPokemon = void 0;
const uuid_1 = require("uuid");
const prismadb_1 = __importDefault(require("../models/prismadb"));
const createPokemon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, typeId } = req.body;
    console.log(req.body);
    try {
        const id = (0, uuid_1.v4)();
        const postPokemon = {
            idPokemon: id,
            name,
            typeId
        };
        const type = yield prismadb_1.default.type.findUnique({
            where: {
                idTypes: typeId
            }
        });
        if (type !== null) {
            yield prismadb_1.default.pokemon.create({
                data: {
                    idPokemon: postPokemon.idPokemon,
                    name: postPokemon.name,
                    typeId: type.idTypes
                }
            });
        }
        res.status(201).json(postPokemon);
    }
    catch (error) {
        next(error);
    }
});
exports.createPokemon = createPokemon;
const getAllPokemons = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, since } = req.query;
    try {
        const allPokemons = yield prismadb_1.default.pokemon.findMany({
            include: {
                type: true,
                evolutionTo: true
            },
            take: limit ? Number(limit) : undefined,
            skip: since ? Number(since) : undefined
        });
        return res.status(200).json(allPokemons);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPokemons = getAllPokemons;
const getOnePokemon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPokemon } = req.params;
    try {
        const getPokemon = yield prismadb_1.default.pokemon.findUnique({
            where: {
                idPokemon: idPokemon,
            },
            include: {
                evolutionTo: true
            }
        });
        return res.status(200).json(getPokemon);
    }
    catch (error) {
        next(error);
    }
});
exports.getOnePokemon = getOnePokemon;
const updateApokemon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPokemon } = req.params;
    const { name, typeId } = req.body;
    try {
        const poekmonUpdate = {
            name,
            typeId
        };
        yield prismadb_1.default.pokemon.update({
            where: {
                idPokemon
            },
            data: {
                name: poekmonUpdate.name,
                typeId: poekmonUpdate.typeId,
            }
        });
        return res.status(202).json(poekmonUpdate);
    }
    catch (error) {
        next(error);
    }
});
exports.updateApokemon = updateApokemon;
const updateStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPokemon } = req.params;
    const { state } = req.body;
    try {
        const pokemonStatus = yield prismadb_1.default.pokemon.update({
            where: {
                idPokemon
            },
            data: {
                isActive: state
            }
        });
        return res.status(202).json(pokemonStatus);
    }
    catch (error) {
        next(error);
    }
});
exports.updateStatus = updateStatus;
const deletePokemon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPokemon } = req.params;
    try {
        yield prismadb_1.default.evolution.deleteMany({
            where: {
                pokemonId: idPokemon
            },
        });
        const deletePokemon = yield prismadb_1.default.pokemon.delete({
            where: {
                idPokemon: idPokemon
            },
        });
        res.status(204).json(deletePokemon);
    }
    catch (error) {
        next(error);
    }
});
exports.deletePokemon = deletePokemon;
const searchPokemons = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchParam } = req.body;
    try {
        const results = yield prismadb_1.default.pokemon.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchParam
                            // like:
                        }
                    }, {
                        idPokemon: {
                            equals: searchParam
                        }
                    }
                ]
            },
            include: {
                type: true,
                evolutionTo: true
            }
        });
        return res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
});
exports.searchPokemons = searchPokemons;
//# sourceMappingURL=pokemon.controller.js.map