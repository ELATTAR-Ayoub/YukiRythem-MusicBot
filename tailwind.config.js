/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'secondary-color': '#F0F4F4',
        'primary-color-4': '#04080F',
        'primary-color-53': '#507DBC',
        'primary-color-83': '#BBD1EA',
        'primary-color-77': '#A1C6EA',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
      fontFamily: {
        'Plain': ['Plain-Light', 'sans-serif'],
        'Silk_Serif': ['Silk_Serif_ExtraLight', 'serif']
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
    }
  ],
}
