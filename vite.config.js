import path from 'node:path'
import Unfonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'


// https://vitejs.dev/config/
export default defineConfig({
  css:{
    postcss:{
      plugins:[tailwind(),autoprefixer()]
    }
  },
  plugins: [vue(),Unfonts({
    custom: {
      families: [
        {
          name: 'Geist',
          src: './src/assets/fonts/*.woff2',
        },
      ],
    },
  }),],
  server:{
    proxy:{
      '/api':{
        target:'https://voting.taakey.com/api',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    }
  }
})
