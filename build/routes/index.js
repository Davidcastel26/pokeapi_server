"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typesRouter = exports.pokemonsRouter = void 0;
const pokemon_routes_1 = __importDefault(require("./pokemon.routes"));
exports.pokemonsRouter = pokemon_routes_1.default;
const type_routes_1 = __importDefault(require("./type.routes"));
exports.typesRouter = type_routes_1.default;
//# sourceMappingURL=index.js.map