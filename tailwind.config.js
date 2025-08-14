/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',   
    './app/**/*.{js,ts,jsx,tsx}', 
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      primary: [`var(---font-jetbrainsMono)`],
    },
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: "#111",
        accent: {
          DEFAULT: "#cc5104",
          hover:   "#592b0e",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};