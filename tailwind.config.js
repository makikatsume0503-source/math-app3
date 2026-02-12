/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'app-blue': '#4ECDC4',
                'app-yellow': '#FFD166',
                'app-pink': '#FF6B6B',
                'app-green': '#06D6A0',
                'app-background': '#F7F9FC',
            },
            fontFamily: {
                sans: ['"M PLUS Rounded 1c"', 'sans-serif'], // We'll need to import this font
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
            }
        },
    },
    plugins: [],
}
