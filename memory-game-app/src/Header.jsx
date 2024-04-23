import React, { useState } from 'react';
import lightBulb from './assets/light_bulb.png';
import pokeball from './assets/pokeball.png';
import close from './assets/close.png';

function Header({ score, HighScore }) {
    
    const [showInfo, setShowInfo] = useState(false);

    function showInfoHandler() {
        setShowInfo(!showInfo);
    }

    return (
        <>
            <header className="grid grid-cols-header mt-1 items-center mb-3">
                <div>
                    <img src={lightBulb} className="h-14 cursor-pointer" onClick={() => showInfoHandler()}/>
                </div>
                <div className="flex items-center">
                    <img src={pokeball} className="h-16"/>
                    <h2 className="text-3xl text-center font-Press font-press-start text-white">
                        <span className="text-red-500">Poké</span>
                        Memoria</h2>
                </div>
            </header>
            <div className="text-2xl flex items-center justify-center mb-4 font-Press font-press-start">
                <h4 className="mx-6">Score: {score}</h4>
                <h4 className="flex items-center mx-6">High Score: {HighScore}<img src="src/assets/trophy.png" className="h-10"/></h4>
            </div>
            {showInfo &&
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="bg-gray-300 p-6 rounded-3xl border-4 border-black shadow-lg w-3/4 max-w-lg relative">
                    <img src={close} className="h-6 absolute top-2 right-2 cursor-pointer" onClick={() => showInfoHandler()}/>
                  <p className="text-sm text-center font-Press font-press-start text-black">Click on a Pokémon to earn points, but don't click on the same Pokémon twice!</p>
                </div>
              </div>
            }
        </>
    );
}

export default Header;