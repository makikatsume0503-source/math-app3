import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StampCalendar } from './StampCalendar';
import { useDailyProgress } from '../../hooks/useDailyProgress';
import { MultiplicationTable } from '../../components/MultiplicationTable';
import { BookOpen } from 'lucide-react';

type GameMode = 'multiplication';

interface HomeProps {
    onStartGame: (mode: GameMode, level: 1 | 2 | 3 | 4) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartGame }) => {
    const { progress, todayCount, dailyGoal } = useDailyProgress();
    const [showTable, setShowTable] = useState(false);

    return (
        <div className="max-w-2xl mx-auto p-6 flex flex-col items-center gap-8">
            <div className="w-full">
                {/* Multiplication Card */}
                <div className="bg-white/90 backdrop-blur rounded-[2rem] p-6 shadow-xl border-4 border-app-yellow/50 hover:scale-105 transition-transform max-w-md mx-auto relative">

                    {/* Table Button */}
                    <button
                        onClick={() => setShowTable(true)}
                        className="absolute top-4 right-4 p-2 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1 font-bold text-sm"
                        title="九九表を見る"
                    >
                        <BookOpen size={20} />
                        <span>早見表</span>
                    </button>

                    <div className="text-center mb-4">
                        <span className="text-4xl bg-app-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-orange-500 font-black border-2 border-orange-400">
                            ×
                        </span>
                        <h2 className="text-2xl font-black text-slate-700 mt-2">かけざん</h2>
                    </div>
                    <div className="space-y-3">
                        <button onClick={() => onStartGame('multiplication', 1)} className="w-full py-2 rounded-xl bg-orange-400 text-white font-bold shadow-md border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-all">
                            Lv.1 (九九)
                        </button>
                        <button onClick={() => onStartGame('multiplication', 2)} className="w-full py-2 rounded-xl bg-orange-500 text-white font-bold shadow-md border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all">
                            Lv.2 (2桁 × 1桁)
                        </button>
                        <button onClick={() => onStartGame('multiplication', 3)} className="w-full py-2 rounded-xl bg-red-500 text-white font-bold shadow-md border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all">
                            Lv.3 (2桁 × 1桁 繰り上がり)
                        </button>
                        <button onClick={() => onStartGame('multiplication', 4)} className="w-full py-2 rounded-xl bg-slate-800 text-app-yellow font-black shadow-md border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all relative overflow-hidden group">
                            <span className="relative z-10">Lv.4 (2桁 × 2桁)</span>
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

            <MultiplicationTable isOpen={showTable} onClose={() => setShowTable(false)} />

            <div className="text-slate-400 text-xs mt-8">
                v2026.02.16-3
            </div>
        </div>
    );
};

