/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF8F0',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF6B00',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        maroon: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#F43F5E',
          500: '#C41E3A',
          600: '#9F1239',
          700: '#8B0000',
          800: '#6B0020',
          900: '#4C0519',
        },
        gold: {
          50: '#FFFEF0',
          100: '#FEFCE8',
          200: '#FEF9C3',
          300: '#FDE68A',
          400: '#FACC15',
          500: '#FFD700',
          600: '#EAB308',
          700: '#CA8A04',
          800: '#A16207',
          900: '#854D0E',
        },
        temple: {
          cream: '#FDF6EC',
          sand: '#F5E6D3',
          dark: '#1A0A00',
          warmGray: '#2D1B0E',
          deepBrown: '#3D2414',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-saffron': 'linear-gradient(135deg, #FF6B00 0%, #FF9500 50%, #FFD700 100%)',
        'gradient-maroon': 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FDF6EC 0%, #F5E6D3 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A0A00 0%, #2D1B0E 100%)',
      },
      boxShadow: {
        'temple': '0 4px 20px rgba(139, 0, 0, 0.15)',
        'temple-lg': '0 10px 40px rgba(139, 0, 0, 0.2)',
        'gold': '0 4px 20px rgba(255, 215, 0, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 107, 0, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 107, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
