/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './public/js/**/*.js'],
  theme: {
    // Reference artboard: 1440px wide. Container is 1170px (the 832px column in the 1024px mockup x 1.40625).
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // Sampled from nsuk.edu.ng
        nsuk: {
          50: '#F3F7F5', // light section background
          100: '#E6EFEB', // pale card background
          200: '#D7E5E0',
          500: '#166747',
          600: '#106442',
          700: '#075E3B', // brand green (nav bar, buttons)
          800: '#074A2F', // dark green sections
          900: '#04462C',
          950: '#101D17', // near-black green (footer, text)
        },
        gold: {
          100: '#F5EAC9',
          400: '#DCB342', // brand gold (CTA, accents)
          500: '#D7A928',
        },
        cream: '#F7F5EF',
        line: '#DCDED9',
        ink: '#101D17',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1170px',
      },
      letterSpacing: {
        tightish: '-0.02em',
      },
    },
  },
  plugins: [],
};
