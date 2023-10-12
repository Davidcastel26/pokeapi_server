import { Router } from "express";
import { getTypes, getTypesById } from "../controllers/type.controllers";

const router = Router()

router.get('/', getTypes);

router.get('/:idTypes', getTypesById );

export default router;