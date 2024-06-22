const config = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
       boxShadow: {
        'dark-neumorphism': 'inset 4px 4px 6px #414141, inset -4px -4px 8px #000000, 6px 6px 12px #1a1a1a, -6px -6px 12px #252525d2',
        'light-neumorphism': 'inset 4px 4px 6px #ffffff, inset -4px -4px 6px #5251515b, 6px 6px 12px #38383893, -6px -6px 12px #bebebe23',
        'dark-input': 'inset 4px 4px 6px #000000, inset -4px -4px 6px #4e4e4e48',
        'light-input': 'inset 4px 4px 6px #4242429f, inset -4px -4px 6px #41414179',
        'dark-button': "10px 10px 21px #0c0c0c, -5px -5px 14px #303030;",
        'light-button': " 15px 15px 26px #9b9b9b ,-10px -10px 26px #ffffff"
      },
    },
  },
  plugins: [],
};

export default config;
