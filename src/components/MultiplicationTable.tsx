
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MultiplicationTableProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MultiplicationTable: React.FC<MultiplicationTableProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                        >
                            <X className="text-slate-500" />
                        </button>

                        <h2 className="text-3xl font-black text-center text-app-blue mb-6">
                            くく つくえ (九九表)
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-2"></th>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                            <th key={num} className="p-2 text-xl font-black text-app-pink bg-pink-50 rounded-t-lg">
                                                {num}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(row => (
                                        <tr key={row} className="hover:bg-blue-50 transition-colors group">
                                            <th className="p-2 text-xl font-black text-app-blue bg-blue-50 rounded-l-lg group-hover:bg-blue-100">
                                                {row}
                                            </th>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(col => (
                                                <td
                                                    key={`${row}-${col}`}
                                                    className="p-3 text-center text-xl font-bold text-slate-600 border border-slate-100 hover:bg-yellow-100 hover:scale-110 transition-transform cursor-default"
                                                >
                                                    {row * col}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
