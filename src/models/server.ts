import express, { Express } from "express";
import cors from "cors";
import { productPaths } from "./paths";
import dotenv from 'dotenv';
import { pokemonsRouter, typesRouter } from "../routes";

dotenv.config();

const port = process.env.PORT || '8080';
export const app: Express = express()

app.use( cors() )
app.use( express.json())
app.use( productPaths.pokemon, pokemonsRouter  )
app.use( productPaths.types, typesRouter  )

app.listen( port , () => {
    console.log(`-- RUNING ON PORT ${port} --`)
} )