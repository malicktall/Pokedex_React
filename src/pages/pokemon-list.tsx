import React, { FunctionComponent } from 'react';

import PokemonCard from '../components/pokemon-card';
import usePokemon from '../hooks/pokemon.hook';
import { Link } from 'react-router-dom';
import PokemonSearch from '../components/pokemon-search';
  
const PokemonList: FunctionComponent = () => {
  
  const pokemons = usePokemon()
  
  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <PokemonSearch/>
      <div className="container"> 
        <div className="row"> 
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
        </div>

      </div>
        <Link to={'/pokemon/add'} className='btn-large btn-floating halfway-fab waves-effect waves-light red w-depth-3' 
          style={{position:'fixed', bottom:'25px', right:'25px'}}>
          <i className="material-icons">add</i>
         </Link>
    </div> 
  );
}
  
export default PokemonList;