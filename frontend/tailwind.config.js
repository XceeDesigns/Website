/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Open Sans', 'Arial', 'Helvetica', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
        'xxxs': '0.5rem',  // 8px
        // Add more custom sizes as needed
      } , 
      spacing: {
        '128': '32rem',  // Adding a custom spacing value of 32rem (512px)
        '144': '36rem',  // Adding a custom spacing value of 36rem (576px)
      } , 
      height: {
        '126': '31.5rem', // Customize as needed
        '144': '36rem',
         '150': '42rem' // Customize as needed
        // Add more custom heights if needed
      }
      ,
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

