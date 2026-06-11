/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6366F1'
        }
      },
      width: {
        // custom width aliases
        '204': '8.5in'
      },
      minHeight: {
        '264': '11in'
      },
      minWidth: {
        '55': '220px'
      }
    }
  },
  plugins: []
}
