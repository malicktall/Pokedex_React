import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
// import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import { useNavigate  } from 'react-router-dom';
import './pokemon-card.css';
type Props = {
  pokemon: Pokemon
  borderColor?: string
};
  
const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#009688'}) => {
  const [color, setColor] = useState('#009688')
  const setBorder = (color: string) => {
    setColor(color)
  }
  const navigate = useNavigate()
  const goToPokemon = (id: number) => {
    navigate(`/pokemon/detail/${pokemon.id}`)
  }  
 
  return (
    <div className="col s6 m4" >
      <div className="card horizontal"
            style={{borderColor:color}}
            onMouseEnter={() => setBorder('red')}
            onMouseLeave={() =>setBorder('#009688')}
            onClick={() => goToPokemon(pokemon.id)}
            >
        <div className="card-image"> 
          <img src={pokemon.picture} alt={pokemon.name}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            {/* <p><small>{formatDate(pokemon.created)}</small></p> */}
            {
                pokemon.types.map( (type, index) =>(
                    <span className={formatType(type)} key={index}>{type}</span>
                ))
            }
          </div>
        </div>
      </div> 
    </div>
  );
}
  
export default PokemonCard;