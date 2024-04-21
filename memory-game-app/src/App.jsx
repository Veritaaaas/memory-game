import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const [pokemonClicked, setPokemonClicked] = useState([]);
  const [names, setNames] = useState(['pikachu', 'charmander', 'squirtle', 'bulbasaur']);

  useEffect(() => {
    Promise.all(names.map(name =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => ({name, sprites: data.sprites.front_default}))
    ))
    .then(setPokemonSprite)
  }, [names]);

  function shuffleArray(array) {
    if (!array) return [];
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  function handleSpriteClick(name) {
    if (pokemonClicked.includes(name)) {
      alert('Game Over');
      setPokemonClicked([]);
    } else {
      setPokemonClicked([...pokemonClicked, name]);
    }
  }

  function loadSprites() {
    const shuffledSprites = shuffleArray(pokemonSprite);
    return shuffledSprites.map(({ name, sprites }) => (
      <div key={name} className="bg-gray-200 p-4 text-center" onClick={() => handleSpriteClick(name)}>
        <img src={sprites} alt={name} className="h-64"/>
        <p>{name}</p>
      </div>
    ));
  }




  return (
    <>
      <div>
        <h1 className="text-4xl text-center">Memory Game</h1>
        <div className="grid grid-cols-4 gap-4">
          {loadSprites()}
        </div>
      </div>
    </>
  )
}

export default App