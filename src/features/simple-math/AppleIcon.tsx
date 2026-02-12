import React from 'react';

interface AppleIconProps {
    size?: number;
    className?: string;
    fill?: string;
}

export const AppleIcon: React.FC<AppleIconProps> = ({ size = 24, className = "", fill = "currentColor" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Stem */}
            <path d="M11.5 2C10.5 2 9.5 2.5 9.5 2.5" stroke="#8B4513" strokeWidth="2" />

            {/* Leaf */}
            <path d="M11.5 2C13.5 2 14.5 3.5 14.5 4.5C14.5 5.5 13 6 12 5" stroke="#4ADE80" strokeWidth="2" fill="#4ADE80" />

            {/* Apple Body */}
            <path
                d="M12 5C9 5 4 6 4 11C4 16 7 21 11 21C11.5 21 12 20 12 20C12 20 12.5 21 13 21C17 21 20 16 20 11C20 6 15 5 12 5Z"
                fill={fill}
                stroke={fill}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            {/* Highlight */}
            <path d="M7 9C7 9 8 7 10 7" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
        </svg>
    );
};
