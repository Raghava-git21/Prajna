export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF8F0',
          100: '#FFEDD5',
          200: '#FED7AA',
          500: '#FF6B00',
          600: '#EA580C',
          700: '#C2410C'
        },
        maroon: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          500: '#C41E3A',
          700: '#8B0000',
          900: '#4C0519'
        },
        gold: {
          300: '#FDE68A',
          400: '#FACC15',
          500: '#FFD700'
        },
        temple: {
          cream: '#FDF6EC',
          dark: '#1A0A00',
          warmGray: '#2D1B0E'
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'gradient-saffron': 'linear-gradient(135deg, #FF6B00 0%, #FF9500 50%, #FFD700 100%)'
      },
      boxShadow: {
        temple: '0 4px 20px rgba(139, 0, 0, 0.15)',
        'temple-lg': '0 10px 40px rgba(139, 0, 0, 0.2)'
      }
    }
  },
  plugins: []
};
