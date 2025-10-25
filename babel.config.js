module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@src': './src',
            '@config': './src/config',
            '@data': './src/data',
            '@screens': './src/screens',
            '@login': './src/login',
            '@service': './src/service',
            '@style': './src/style',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
