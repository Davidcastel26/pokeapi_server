import express, { Express } from "express";
import cors from "cors";
import router from "../routes/pokemon.routes";
import { productPaths } from "./paths";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || '8080';
export const app: Express = express()

app.use( cors() )
app.use( express.json())
app.use( productPaths.pokemon, router  )

app.listen( port , () => {
    console.log(`-- RUNING ON PORT ${port} --`)
} )