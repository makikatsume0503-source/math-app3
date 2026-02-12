import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { AppleIcon } from './AppleIcon';

type GameMode = 'multiplication';

interface SimpleMathGameProps {
    mode: GameMode;
    level: 1 | 2 | 3 | 4;
    onBack: () => void;
    onCorrectAnswer?: () => void;
}

export const SimpleMathGame: React.FC<SimpleMathGameProps> = ({ mode, level, onBack, onCorrectAnswer }) => {
    const [score, setScore] = useState(0);
    const [problem, setProblem] = useState(() => generateProblem(level));
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showHint, setShowHint] = useState(true);

    function generateProblem(currentLevel: 1 | 2 | 3 | 4) {
        // Multiplication
        if (currentLevel === 1) {
            // Level 1: 1-9 Tables (Simple 1-digit x 1-digit)
            const a = Math.floor(Math.random() * 9) + 1; // 1-9
            const b = Math.floor(Math.random() * 9) + 1; // 1-9
            return { a, b, ans: a * b, operator: '×', level: 1 };
        } else if (currentLevel === 2) {
            // Level 2: Random 1-digit (Same range as Level 1 but conceptually "Random test")
            const a = Math.floor(Math.random() * 9) + 1;
            const b = Math.floor(Math.random() * 9) + 1;
            return { a, b, ans: a * b, operator: '×', level: 2 };
        } else if (currentLevel === 3) {
            // Level 3: Challenge (2-digit x 1-digit) e.g. 12x3
            const a = Math.floor(Math.random() * 90) + 10; // 10-99
            const b = Math.floor(Math.random() * 8) + 2;   // 2-9
            return { a, b, ans: a * b, operator: '×', level: 3 };
        } else {
            // Level 4: Super Challenge (2-digit x 2-digit) e.g. 24x15
            const a = Math.floor(Math.random() * 90) + 10; // 10-99
            const b = Math.floor(Math.random() * 90) + 10; // 10-99
            return { a, b, ans: a * b, operator: '×', level: 4 };
        }
    }

    const checkAnswer = () => {
        const num = parseInt(userAnswer);
        if (num === problem.ans) {
            setFeedback('correct');
            setScore(s => s + 1);
            if (onCorrectAnswer) onCorrectAnswer();
        } else {
            setFeedback('incorrect');
        }
    };

    const nextProblem = () => {
        setProblem(generateProblem(level));
        setUserAnswer('');
        setFeedback(null);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white/90 backdrop-blur-md rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[6px] border-app-blue/30 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-app-yellow/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-app-pink/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 bg-white px-4 py-2 rounded-full text-slate-500 font-bold border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all shadow-sm group"
                >
                    <ChevronLeft size={20} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                    <span>もどる</span>
                </button>

                <div className="bg-white/80 px-4 py-1 rounded-full border-2 border-slate-100 shadow-sm flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-app-yellow" />
                    <span className="font-bold text-slate-500 text-sm">
                        かけざん Lv.{level}
                    </span>
                </div>

                <div className="flex items-center gap-2 bg-app-yellow/20 px-3 py-1 rounded-full border-2 border-app-yellow text-app-yellow-dark">
                    <span className="text-lg">⭐</span>
                    <span className="text-xl font-black text-orange-400">{score}</span>
                </div>
            </div>

            {/* Problem Display */}
            <div className="text-center mb-6 relative z-10">
                <div className="text-5xl md:text-6xl font-black text-slate-700 tracking-wider flex items-center justify-center gap-2 md:gap-4 drop-shadow-sm mb-4">
                    <span className="bg-white px-3 py-1 md:px-4 md:py-2 rounded-2xl shadow-sm border-b-4 border-slate-200 min-w-[3rem]">{problem.a}</span>
                    <span className="text-app-blue">{problem.operator}</span>
                    <span className="bg-white px-3 py-1 md:px-4 md:py-2 rounded-2xl shadow-sm border-b-4 border-slate-200 min-w-[3rem]">{problem.b}</span>
                    <span>=</span>
                    <span className={`min-w-[5rem] h-24 md:h-28 bg-white rounded-2xl border-4 text-slate-800 flex items-center justify-center shadow-inner text-4xl md:text-5xl transition-all ${userAnswer ? 'border-app-green bg-green-50' : 'border-dashed border-slate-300'}`}>
                        {userAnswer || "?"}
                    </span>
                </div>

                <button
                    onClick={() => setShowHint(!showHint)}
                    className={`text-sm font-bold px-4 py-1.5 rounded-full border-2 transition-all flex items-center gap-2 mx-auto ${showHint ? 'bg-app-green text-white border-app-green shadow-md' : 'bg-white text-slate-400 border-slate-200'}`}
                >
                    {showHint ? <Eye size={16} /> : <EyeOff size={16} />}
                    {showHint ? 'ヒントをかくす' : 'ヒントをみる'}
                </button>
            </div>

            {/* Visuals */}
            <AnimatePresence>
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 bg-slate-50/80 p-4 rounded-[1.5rem] border-4 border-dashed border-slate-200/80 relative z-10 grid place-items-center max-h-60 overflow-y-auto overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row justify-center gap-4 items-start md:items-center">
                            {/* Visuals handled for multiplication */}
                            {mode === 'multiplication' && level <= 2 && (
                                <div className="flex flex-wrap justify-center gap-4">
                                    {Array.from({ length: problem.a }).map((_, groupIndex) => (
                                        <div key={groupIndex} className="bg-orange-50 p-2 rounded-xl border-2 border-orange-100 flex flex-col items-center">
                                            <span className="text-xs font-bold text-orange-300 mb-1">{groupIndex + 1}</span>
                                            <div className="grid grid-cols-3 gap-1">
                                                {Array.from({ length: problem.b }).map((_, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        <AppleIcon size={16} className="text-red-500" fill="currentColor" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Number Pad */}
            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto mb-6 relative z-10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <button
                        key={num}
                        onClick={() => setUserAnswer(prev => {
                            if (prev.length >= 2) return prev; // Limit to 2 digits
                            return prev + num.toString();
                        })}
                        className="aspect-square bg-white border-b-[5px] border-slate-200 rounded-xl text-2xl font-bold text-slate-600 active:border-b-0 active:translate-y-[5px] transition-all hover:bg-slate-50 shadow-sm"
                    >
                        {num}
                    </button>
                ))}
                <button
                    onClick={() => setUserAnswer('')}
                    className="aspect-square bg-red-50 border-b-[5px] border-red-200 rounded-xl text-red-400 flex items-center justify-center active:border-b-0 active:translate-y-[5px] transition-all hover:bg-red-100 font-bold"
                >
                    <RotateCcw size={24} />
                </button>
            </div>

            {/* Submit Button */}
            <div className="text-center relative z-10 min-h-[5rem] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!feedback && userAnswer && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            onClick={checkAnswer}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-3 bg-gradient-to-r from-app-green to-emerald-400 text-white text-2xl font-black rounded-full shadow-[0_10px_20px_rgba(6,214,160,0.3)] border-b-6 border-emerald-600 active:border-b-0 active:translate-y-[6px] transition-all tracking-wide"
                        >
                            できた！
                        </motion.button>
                    )}

                    {feedback === 'correct' && (
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="text-4xl font-black text-app-pink mb-3 animate-bounce drop-shadow-md bg-white px-6 py-3 rounded-full border-4 border-app-pink/20">
                                せいかい！🎉
                            </div>
                            <button
                                onClick={nextProblem}
                                className="px-8 py-2 bg-app-yellow text-white rounded-full font-bold text-lg shadow-[0_8px_15px_rgba(255,209,102,0.4)] border-b-4 border-orange-300 hover:scale-105 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2"
                            >
                                つぎへGO! <ArrowRight strokeWidth={3} />
                            </button>
                        </motion.div>
                    )}

                    {feedback === 'incorrect' && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="text-2xl font-bold text-slate-400 mb-3 bg-slate-100 px-5 py-2 rounded-full">
                                おしい...！🥺
                            </div>
                            <button
                                onClick={() => setFeedback(null)}
                                className="px-6 py-2 bg-white text-slate-500 border-2 border-slate-200 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-slate-50 transition-colors"
                            >
                                <RotateCcw size={18} /> もういっかい
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
};
