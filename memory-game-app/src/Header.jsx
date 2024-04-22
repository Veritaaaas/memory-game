function Header({ score, HighScore }) {
    return (
        <>
            <header className="grid grid-cols-header mt-1 items-center mb-3">
                <div>
                    <img src="src/assets/light_bulb.png" className="h-14"/>
                </div>
                <div className="flex items-center">
                    <img src="src/assets/pokeball.png" className="h-16"/>
                    <h2 className="text-3xl text-center font-Press font-press-start text-white">
                        <span className="text-red-500">Poké</span>
                        Memoria</h2>
                </div>
            </header>
            <div className="text-2xl flex items-center justify-center mb-4 font-Press font-press-start">
                <h4 className="mx-6">Score: {score}</h4>
                <h4 className="flex items-center mx-6">High Score: {HighScore}<img src="src/assets/trophy.png" className="h-10"/></h4>
            </div>
        </>
    );
}

export default Header;