/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#121110',
          dark: '#0B0A09',
          surface: '#181715',
          card: '#1D1C19',
          border: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.14)',
        },
        cream: {
          DEFAULT: '#F4EFE8',
          card: '#FAF7F2',
          surface: '#ECE5DB',
          darkText: '#181715',
          mutedText: '#68625B',
          border: 'rgba(24, 23, 21, 0.12)',
        },
        brass: {
          DEFAULT: '#C9A24B',
          light: '#DEBA67',
          dark: '#9F7C2B',
          tint: 'rgba(201, 162, 75, 0.12)',
          border: 'rgba(201, 162, 75, 0.3)',
        },
      },
      fontFamily: {
        sans: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'page-h1': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'section-h2': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h3': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h4': ['1.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'small': ['0.875rem', { lineHeight: '1.55', letterSpacing: '0' }],
        'caption': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        // Minimum 13px floor: xs mapped to 13px (0.8125rem)
        'xs': ['0.8125rem', { lineHeight: '1.4' }],
      },
      letterSpacing: {
        tight: '-0.02em',
        subtight: '-0.01em',
        normal: '0',
        wide: '0.08em',
        editorial: '0.08em',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};
