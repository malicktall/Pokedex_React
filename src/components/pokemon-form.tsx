/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { useNavigate  } from 'react-router-dom';
import PokemonService from '../services/pokemon-service';

type Props = {
  pokemon: Pokemon,
  isEditForm: boolean
};
type Field = {
  value?: any,
  error?: string|undefined,
  isValid?: boolean
}

type Form = {
  picture: Field,
  name:Field,
  hp: Field,
  cp: Field,
  types: Field
}
const PokemonForm: FunctionComponent<Props> = ({pokemon, isEditForm}) => {
  
  const [form, setForm] = useState<Form>({
    picture: {value: pokemon.picture, isValid:true},
    name: {value: pokemon.name, isValid:true},
    hp: {value: pokemon.hp, isValid:true},
    cp: {value: pokemon.cp, isValid:true},
    types: {value: pokemon.types, isValid:true},
  })
  const navigate = useNavigate()
  console.log(pokemon.id);
  
  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];
  const hasType = (type: string): boolean =>{
    return form.types.value.includes(type)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName: string = e.target.name;
      const fieldValue: string = e.target.value;
      const newField:Field = {[fieldName]: {value:fieldValue}};

      setForm({...form, ...newField});
      // console.log(form.name);
      
  }

  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>) =>{

    const checked = e.target.checked
    let newField: Field;

    if (checked){
      const newTypes: string[] = form.types.value.concat([type])
      newField = {value:newTypes}
    }else{
      const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type)
      newField = {value:newTypes}

    }
    setForm({...form, ...{types:newField}});
    // console.log(form.types);

  }

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(form, pokemon);
    pokemon.picture = form.picture.value
    pokemon.name = form.name.value
    pokemon.hp = form.hp.value
    pokemon.cp = form.cp.value
    pokemon.types = form.types.value
   
    isEditForm ? updatePokemon() : addPokemon()
  }

  const updatePokemon = () => {
    PokemonService.updatePokemon(pokemon).then( (pokemon) =>  navigate(`/pokemon/detail/${pokemon.id}`))

  }
  const addPokemon = () => {
    PokemonService.addPokemon(pokemon).then( () =>  navigate(`/pokemons`))

  }
  const handleDelete  = (e : any) => {
    // e.preventDefault();
   
    PokemonService.deletePokemon(pokemon).then(() =>  navigate(`/pokemons`))

  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="card-image">
              {
                isEditForm && <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
              }
              <span  className='btn btn-floating halfway-fab waves-effect waves-light'>
                <i onClick={e =>handleDelete(e)} className="material-icons">Delete</i> </span>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                <div className="form-group">
                  <label htmlFor="picture">Image</label>
                   <input 
                   id="picture" name='picture' 
                   type="text" className="form-control"
                    value={form.picture.value}
                    onChange={(e) => handleInputChange(e)}
                    ></input>
                </div>
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                   <input 
                   id="name" name='name' 
                   type="text" className="form-control"
                    value={form.name.value}
                    onChange={(e) => handleInputChange(e)}
                    ></input>
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input 
                    id="hp" type="number"
                    name='hp' className="form-control"
                     value={form.hp.value}
                     onChange={(e) => handleInputChange(e)}
                     ></input>
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input 
                    id="cp" name='cp'
                    type="number" className="form-control"
                     value={form.cp.value}
                     onChange={(e) => handleInputChange(e)}
                     ></input>
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input 
                          id={type} name={type}
                          type="checkbox" className="filled-in"
                          value={type} checked={hasType(type)}
                          onChange={(e) => selectType(type,e)}
                        ></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default PokemonForm;