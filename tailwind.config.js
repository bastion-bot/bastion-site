/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bastion: {
          bg: '#060810',
          card: '#080b12',
          'card-hover': '#0c1019',
          red: '#e8203a',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
      },
      maxWidth: {
        site: '1100px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.5', transform: 'translate(-50%,-50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translate(-50%,-50%) scale(1.4)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%': { top: '0px', opacity: '0' },
          '5%': { opacity: '1' },
          '95%': { opacity: '0.5' },
          '100%': { top: '100vh', opacity: '0' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        particleRise: {
          '0%': { transform: 'translateY(100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-5vh)', opacity: '0' },
        },
        ctaPulse: {
          '0%,100%': { opacity: '0.6', transform: 'translate(-50%,-50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translate(-50%,-50%) scale(1.15)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        wave: 'wave 9s linear infinite',
        'wave-slow': 'wave 13s linear infinite reverse',
        ticker: 'ticker 22s linear infinite',
        scan: 'scan 7s ease-in-out infinite',
        blink: 'blink 1.5s ease-in-out infinite',
        'particle-rise': 'particleRise linear infinite',
        'cta-pulse': 'ctaPulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
