import { useState, useEffect } from "react";

// Define the levels
const levels = [
  ['pikachu', 'charmander', 'squirtle', 'bulbasaur'],
  ['pikachu', 'charmander', 'squirtle', 'bulbasaur', 'eevee', 'jigglypuff', 'psyduck', 'meowth'],
  ['pikachu', 'charmander', 'squirtle', 'bulbasaur', 'eevee', 'jigglypuff', 'psyduck', 'meowth', 'snorlax', 'magikarp', 'mew', 'mewtwo']
];

export function Cards() {
  const [pokemonSprite, setPokemonSprite] = useState([]);
  const [shuffledSprites, setShuffledSprites] = useState([]);
  const [pokemonClicked, setPokemonClicked] = useState([]);
  const [level, setLevel] = useState(0);
  const [animation, setAnimation] = useState(''); 

  // Fetch the sprites for the current level
  useEffect(() => {
    Promise.all(levels[level].map(name =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => ({name, sprites: data.sprites.front_default}))
    ))
    .then(setPokemonSprite)
  }, [level]);

  useEffect(() => {
    setShuffledSprites(shuffleArray(pokemonSprite));
  }, [pokemonSprite]);

  // Shuffle an array
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  // Handle a sprite click
  function handleSpriteClick(name) {
    if (pokemonClicked.includes(name)) {
      alert('Game Over');
      setPokemonClicked([]);
      setLevel(0);
      return;
    } 
    else {
      setPokemonClicked([...pokemonClicked, name]);
      setAnimation('shrink');
    }

    if (pokemonClicked.length === pokemonSprite.length - 1) {
      if (level === 2) {
        alert('You win!');
        setLevel(0);
      } 
      else {
        setLevel(level + 1);
        setPokemonClicked([]);
        setAnimation('shrink');
      }
    }
  }

  // Handle animation changes
  useEffect(() => {
    if (animation === 'shrink') {
      setTimeout(() => {
        setAnimation('grow');
        setShuffledSprites(shuffleArray(pokemonSprite));
      }, 1000);
    } 
    else if (animation === 'grow') {
      setTimeout(() => {
        setAnimation('');
      }, 1000);
    }
  }, [animation]);

  // Load the sprites
  function loadSprites() {
    return shuffledSprites.map(({ name, sprites }) => (
      <div key={name} className={`bg-gray-200 p-4 text-center ${animation}`} onClick={() => handleSpriteClick(name)}>
        <img src={sprites} alt={name} className="h-64"/>
        <p>{name}</p>
      </div>
    ));
  }

  // Render the component
  return (
    <div>
      <h1 className="text-4xl text-center">Memory Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {loadSprites()}
      </div>
    </div>
  );
}