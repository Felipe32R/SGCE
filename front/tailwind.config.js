/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    colors:{
      instagram:{ main: '#E2467D'},
      facebook:{ main: '#3b5998'},
      twitter:{ main: '#1DA1F2'},
      blue:{
        main: "#276FBF",
        hover: '#1c4d85',
        light: "#8FB2D9",
        dark: "#183059",
        cardhover: '#deedff',
        lighter: '#F6F4F3',
        border: '#187bed'
      },
      gray: {
        lighter: '#e6e3e3',
        light: '#C3C3C3',
        main: '#707070',
        lightdark: '#57615C',
        dark: '#1B2E35',
        input: '#A6A9B2'
      },
      yellow: {
        main: '#ED7D2B',
        light: '#f9ab46',

      },
      white: {
        main: '#fff',
      },
      red:{
        main: '#ba3434'
      }
    },
    extend: {},
  },
  plugins: [],
}