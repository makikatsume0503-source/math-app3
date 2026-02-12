import React from 'react';
import { motion } from 'framer-motion';

interface TenFrameProps {
    value: number;
    icon?: React.ElementType;
    colorClass?: string;
    onItemClick?: (index: number) => void;
}

export const TenFrame: React.FC<TenFrameProps> = ({
    value,
    icon: Icon,
    colorClass = 'text-app-pink',
    onItemClick
}) => {
    // Create an array of 10 items (standard Ten Frame size)
    const slots = Array.from({ length: 10 }, (_, i) => i);

    return (
        <div className="grid grid-cols-5 gap-2 p-4 bg-white rounded-xl border-4 border-slate-200 shadow-md w-fit mx-auto">
            {slots.map((index) => {
                const isFilled = index < value;
                return (
                    <div
                        key={index}
                        className="w-12 h-12 flex items-center justify-center border-2 border-slate-100 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                        onClick={() => isFilled && onItemClick && onItemClick(index)}
                    >
                        {isFilled && Icon && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className={colorClass}
                            >
                                <Icon size={38} strokeWidth={2.5} />
                            </motion.div>
                        )}
                        {!isFilled && (
                            <div className="w-2 h-2 rounded-full bg-slate-200" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
