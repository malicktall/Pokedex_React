/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import Pokemon from "../models/pokemon"
import PokemonService from "../services/pokemon-service"

const usePokemon = () => {
 
    const [pokemons, setPokemon] = useState<Pokemon[]>([])
    useEffect( () =>{
        // setPokemon(POKEMONS)
        PokemonService.getPokemons()
            .then((pokemons) => {
                setPokemon(pokemons)
            })
    }, [])

    return pokemons;
}

export default usePokemon;