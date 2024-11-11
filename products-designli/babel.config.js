module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            ".": ".",
            "@components": ["./src/components"],
            "@api": ["./src/api"],
            "@navigation": ["./src/navigation"],
            "@screens": ["./src/screens"],
            "@store": ["./src/store"],
            "@models": ["./src/models"],
          }
        }
      ],
    ],
  };
};
