/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode via adding 'dark' class to <html>
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#4F46E5", // Example brand color
      },
    },
  },
  plugins: [],
};
