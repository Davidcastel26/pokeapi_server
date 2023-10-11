import { Router } from "express";
import { getTypes } from "../controllers/type.controllers";

const router = Router()

router.get('/', getTypes);

export default router;