module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      phone: '360px',
      tablet: '768px',
      laptop: '976px',
      desktop: '1440px'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      roboto: ['Courier Prime', 'monospace']
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      colors: {
        bermud: '#3751FF',
        dark: '#363740',
        textMenu: '#DDE2FF'
      }
    }
  },
  plugins: []
};
