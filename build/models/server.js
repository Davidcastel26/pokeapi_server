"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const paths_1 = require("./paths");
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("../routes");
dotenv_1.default.config();
const port = process.env.PORT || '8080';
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(paths_1.productPaths.pokemon, routes_1.pokemonsRouter);
exports.app.use(paths_1.productPaths.types, routes_1.typesRouter);
exports.app.listen(port, () => {
    console.log(`-- RUNING ON PORT ${port} --`);
});
//# sourceMappingURL=server.js.map