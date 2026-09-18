/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 60px rgba(56, 189, 248, 0.12)'
      }
    }
  },
  plugins: []
};
