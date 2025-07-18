import { defineConfig } from 'vite'
import { viteSingleFile } from "vite-plugin-singlefile"
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(), 
    viteSingleFile(), 
    tailwindcss()
  ],
})
