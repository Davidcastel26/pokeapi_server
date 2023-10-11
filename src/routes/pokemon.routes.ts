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
    updateApokemon,
    updateStatus} from "../controllers/pokemon.controller";

const router = Router()

router.get('/save', getPokemons );
router.get('/savetype', typePokemons );
router.get('/savechain', chainsPokemons );

router.get('/', getAllPokemons);
router.get('/:idPokemon', getOnePokemon);

router.post('/', createPokemon);

router.put('/:idPokemon', updateApokemon);

router.patch('/:idPokemon', updateStatus);

router.delete('/:idPokemon', deletePokemon);


export default router;