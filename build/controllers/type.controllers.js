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
exports.getTypesById = exports.getTypes = void 0;
const prismadb_1 = __importDefault(require("../models/prismadb"));
const getTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, since } = req.query;
    try {
        const allPokemons = yield prismadb_1.default.type.findMany({
            include: { pokemon: true },
            take: limit ? Number(limit) : undefined,
            skip: since ? Number(since) : undefined
        });
        return res.status(200).json(allPokemons);
    }
    catch (error) {
        next(error);
    }
});
exports.getTypes = getTypes;
const getTypesById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTypes } = req.params;
    try {
        const getPokemon = yield prismadb_1.default.type.findUnique({
            where: {
                idTypes: idTypes,
            },
            include: {
                pokemon: true
            }
        });
        return res.status(200).json(getPokemon);
    }
    catch (error) {
        next(error);
    }
});
exports.getTypesById = getTypesById;
//# sourceMappingURL=type.controllers.js.map