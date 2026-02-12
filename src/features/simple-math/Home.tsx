import React from 'react';
import { motion } from 'framer-motion';
import { StampCalendar } from './StampCalendar';
import { useDailyProgress } from '../../hooks/useDailyProgress';

type GameMode = 'multiplication';

interface HomeProps {
    onStartGame: (mode: GameMode, level: 1 | 2 | 3 | 4) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartGame }) => {
    const { progress, todayCount, dailyGoal } = useDailyProgress();

    return (
        <div className="max-w-2xl mx-auto p-6 flex flex-col items-center gap-8">
            <div className="w-full">
                {/* Multiplication Card */}
                <div className="bg-white/90 backdrop-blur rounded-[2rem] p-6 shadow-xl border-4 border-app-yellow/50 hover:scale-105 transition-transform max-w-md mx-auto">
                    <div className="text-center mb-4">
                        <span className="text-4xl bg-app-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-orange-500 font-black border-2 border-orange-400">
                            ×
                        </span>
                        <h2 className="text-2xl font-black text-slate-700 mt-2">かけざん</h2>
                    </div>
                    <div className="space-y-3">
                        <button onClick={() => onStartGame('multiplication', 1)} className="w-full py-2 rounded-xl bg-orange-400 text-white font-bold shadow-md border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all">
                            レベル 1 (九九)
                        </button>
                        <button onClick={() => onStartGame('multiplication', 2)} className="w-full py-2 rounded-xl bg-orange-500 text-white font-bold shadow-md border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all">
                            レベル 2 (ランダム)
                        </button>
                        <button onClick={() => onStartGame('multiplication', 3)} className="w-full py-2 rounded-xl bg-red-500 text-white font-bold shadow-md border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all">
                            レベル 3 (ちょうせん)
                        </button>
                        <button onClick={() => onStartGame('multiplication', 4)} className="w-full py-2 rounded-xl bg-slate-800 text-app-yellow font-black shadow-md border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all relative overflow-hidden group">
                            <span className="relative z-10">レベル 4 (超・ちょうせん)</span>
                            <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-500 transform -skew-x-12 -translate-x-full" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stamp Calendar */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full flex justify-center"
            >
                <StampCalendar progress={progress} todayCount={todayCount} dailyGoal={dailyGoal} />
            </motion.div>
        </div>
    );
};

