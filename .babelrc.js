module.exports = {
  presets: [
    ['firecloud', {
      'babel-preset-env': {
        targets: {
          browsers: [
            'last 2 Chrome versions'
          ]
        }
      }
    }]
  ],
  sourceMaps: true
};
