import { useState, useEffect } from "react";
import Header from './Header.jsx';

// Define the levels
const levels = [
  ['pikachu', 'charmander', 'squirtle', 'bulbasaur'],
  ['pikachu', 'charmander', 'squirtle', 'bulbasaur', 'eevee', 'jigglypuff', 'psyduck', 'meowth'],
  ['pikachu', 'charmander', 'squirtle', 'bulbasaur', 'eevee', 'jigglypuff', 'psyduck', 'meowth', 'snorlax', 'magikarp', 'mew', 'mewtwo']
];

export function Cards() {
  const [pokemonSprite, setPokemonSprite] = useState([]);
  const [score, setScore] = useState(0);
  const [HighScore, setHighScore] = useState(0);
  const [pokemonClicked, setPokemonClicked] = useState([]);
  const [level, setLevel] = useState(0);
  const [animation, setAnimation] = useState('grow'); 

  // Fetch the sprites for the current level
  useEffect(() => {
    Promise.all(levels[level].map(name =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => ({name, sprites: data.sprites.front_default}))
    ))
    .then(pokemonSprites => {
      setPokemonSprite(shuffleArray(pokemonSprites));
    });
  }, [level]);

  // Shuffle an array
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  //handleSpriteClick
  function handleSpriteClick(pokemon) {
    if (pokemonClicked.includes(pokemon)) {
      setPokemonClicked([]);
      setLevel(0);
      setScore(0);
      if (score > HighScore) {
        setHighScore(score);
      }

      alert("Game Over");
      return;
    } 


    
    else {
      setPokemonClicked([...pokemonClicked, pokemon]);
      setScore(score + 1);
      setAnimation('shrink')
      setPokemonSprite(shuffleArray(pokemonSprite));
      setTimeout(() => {
        setAnimation('grow');
      }, 1000)
    }
  }

  //detects if the level is complete
  useEffect(() => {
    if (pokemonClicked.length === levels[level].length) {

      if (level === levels.length - 1) {
        alert("You win!");
        setLevel(0);
        setScore(0);
        if (score > HighScore) {
          setHighScore(score);
        }
      }

      setPokemonClicked([]);
      setLevel(level + 1);
      setTimeout(() => {
        setAnimation('grow');
      }, 1000);
    }
  }, [pokemonClicked]);

  // Render the component
  return (
    <>
      <Header score={score} HighScore={HighScore}/>
      <div className="pl-16 pr-16 flex justify-center">
        <div className="grid grid-cols-4 gap-8">
          {pokemonSprite.map((pokemon, index) => (
            <div key={index} onClick={() => handleSpriteClick(pokemon.name)} className={`bg-black bg-opacity-25 
              flex flex-col justify-center items-center p-1 cursor-pointer cards ${animation}`}>
              
              <img src={pokemon.sprites} alt={pokemon.name} className="m-0 size-40"/>
              <p className="m-0 capitalize text-white font-Press font-press-start text-[16px]">{pokemon.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
    
  );
}