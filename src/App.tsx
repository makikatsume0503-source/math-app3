import { useState } from 'react';
import { SimpleMathGame } from './features/simple-math/SimpleMathGame';
import { Home } from './features/simple-math/Home';
import { useDailyProgress } from './hooks/useDailyProgress';

type Screen = 'home' | 'game';
type GameMode = 'multiplication';

function App() {
    const [screen, setScreen] = useState<Screen>('home');
    const [gameConfig, setGameConfig] = useState<{ mode: GameMode; level: 1 | 2 | 3 | 4 }>({ mode: 'multiplication', level: 1 });
    const { incrementProgress } = useDailyProgress();

    const handleStartGame = (mode: GameMode, level: 1 | 2 | 3 | 4) => {
        setGameConfig({ mode, level });
        setScreen('game');
    };

    const handleBack = () => {
        setScreen('home');
    };

    return (
        <div className="min-h-screen bg-app-background bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] py-8 px-4 flex flex-col items-center font-sans overflow-y-auto">
            <header className="mb-8 text-center animate-bounce-slow">
                <h1 className="text-5xl md:text-6xl font-black text-app-blue tracking-tighter drop-shadow-md cursor-pointer" onClick={() => setScreen('home')}>
                    さんすう<span className="text-app-pink">ランド</span>
                </h1>
            </header>

            <main className="w-full max-w-4xl relative z-10 mb-8">
                {screen === 'home' ? (
                    <Home onStartGame={handleStartGame} />
                ) : (
                    <SimpleMathGame
                        mode={gameConfig.mode}
                        level={gameConfig.level}
                        onBack={handleBack}
                        onCorrectAnswer={incrementProgress}
                    />
                )}
            </main>

            <footer className="mt-auto text-slate-400 text-sm font-bold opacity-60">
                © 2026 Math Adventure
            </footer>
        </div>
    );
}

export default App;
