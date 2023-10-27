   /** @type {import('tailwindcss').Config} */
   module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          main: '#FFCD36',
          primary: '#FFCD36',
          auxiliary: '#2D2D2D',
          bg: '#222222',
          'text-main': '#000000',
          'text-bright': '#ffffff',
          'text-auxiliary': '#999999',
          'border-main': '#444444',
          'border-auxiliary': '#666666'
        }
      }
    },
    
    plugins: []
  }
