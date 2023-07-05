import React, { FunctionComponent } from 'react';

import PokemonList from './pages/pokemon-list';
import {Route} from 'react-router';
import { Link, Routes } from 'react-router-dom';
import PokemonsDetail from './pages/pokemon-detail';
import PageNotFound from './pages/page-not-found';
import PokemonEdit from './pages/pokemon-edit';
import PokemonAdd from './pages/pokemon-add';
import Login from './pages/login';

const App: FunctionComponent = () => {
  return (
     <>
      <nav>
        <div className="nav-wrapper teal">
          <Link to="/" className='brand-logo center'>Pokedex</Link>
        </div>
      </nav>

      <Routes>
          <Route  path='/' Component={PokemonList}/>
          <Route  path='/pokemons' Component={PokemonList}/>
          <Route  path='/login' Component={Login}/>
          <Route  path='/pokemon/add' Component={PokemonAdd}/>
          <Route  path='pokemon/detail/:id' Component={PokemonsDetail}/>
          <Route  path='pokemon/edit/:id' Component={PokemonEdit}/>
          <Route path='*' Component={PageNotFound}/>
      </Routes>
    
     </>
  );
}

export default App;
