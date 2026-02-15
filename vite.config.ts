import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'さんすうランド - かけざん',
                short_name: 'かけざん',
                description: '小学2年生向けのかけざん練習アプリ',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'icon.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ],
})
