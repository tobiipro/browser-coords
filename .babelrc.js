module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['firecloud', {
      '@babel/preset-env': {
        targets: {
          browsers: [
            'last 2 Chrome versions'
          ]
        }
      }
    }]
  ],

  sourceMaps: true,

  retainLines: true
};
