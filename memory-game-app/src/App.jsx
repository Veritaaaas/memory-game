import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const [names, setNames] = useState(['pikachu', 'charmander', 'squirtle', 'bulbasaur']);

  useEffect(() => {
    Promise.all(names.map(name =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => ({name, sprites: data.sprites.front_default}))
    ))
    .then(setPokemonSprite)
  }, [names]);

  return (
    <>
      <div>
        <h1 className="text-4xl text-center">Memory Game</h1>
        <div className="grid grid-cols-4 gap-4">
          {pokemonSprite && pokemonSprite.map(({name, sprites}) => (
            <div key={name} className="bg-gray-200 p-4 text-center">
              <img src={sprites} alt={name} className="h-64"/>
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App