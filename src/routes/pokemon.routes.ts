import { Router } from "express";
import { 
    chainsPokemons, 
    getPokemons,
    typePokemons } from "../controllers/savetodb.controller";
import { 
    createPokemon,
    deletePokemon,
    getAllPokemons, 
    getOnePokemon, 
    updateApokemon} from "../controllers/pokemon.controller";

const router = Router()

router.get('/save', getPokemons );
router.get('/savetype', typePokemons );
router.get('/savechain', chainsPokemons );

router.get('/', getAllPokemons);
router.get('/:idPokemon', getOnePokemon);
router.post('/', createPokemon);
router.put('/:idPokemon', updateApokemon);
router.put('/:idPokemon', deletePokemon);


export default router;