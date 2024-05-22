/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./App.js","./screens/**/*.{js,jsx,ts,tsx}", "./adminScreens/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily:{
        'Poppins-Black': ['Poppins-Black'],
        'Poppins-Bold': ['Poppins-Bold'],
        'Poppins-ExtraBold': ['Poppins-ExtraBold'],
        'Poppins-ExtraLight': ['Poppins-ExtraLight'],
        'Poppins-Light': ['Poppins-Light'],
        'Poppins-Medium': ['Poppins-Medium'],
        'Poppins-Regular': ['Poppins-Regular'],
        'Poppins-SemiBold': ['Poppins-SemiBold'],
        'Poppins-Thin': ['Poppins-Thin'],
      }
    },
  },
  plugins: [],
}

