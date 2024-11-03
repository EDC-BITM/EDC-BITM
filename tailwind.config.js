/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },  
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },

        },
      },
        animation: {
          'infinte-slide': '20s slide infinite linear',
        },
     
      },
      variants: {
        animation: ['responsive', 'hover'],
      },
  },
  plugins: [],
}

