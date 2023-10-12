"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const savetodb_controller_1 = require("../controllers/savetodb.controller");
const pokemon_controller_1 = require("../controllers/pokemon.controller");
const router = (0, express_1.Router)();
router.get('/save', savetodb_controller_1.getPokemons);
router.get('/savetype', savetodb_controller_1.typePokemons);
router.get('/savechain', savetodb_controller_1.chainsPokemons);
router.get('/', pokemon_controller_1.getAllPokemons);
router.get('/:idPokemon', pokemon_controller_1.getOnePokemon);
router.post('/', pokemon_controller_1.createPokemon);
router.post('/search', pokemon_controller_1.searchPokemons);
router.put('/:idPokemon', pokemon_controller_1.updateApokemon);
router.patch('/:idPokemon', pokemon_controller_1.updateStatus);
router.delete('/:idPokemon', pokemon_controller_1.deletePokemon);
exports.default = router;
//# sourceMappingURL=pokemon.routes.js.map