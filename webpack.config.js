module.exports = {
  entry: {
    main: './main.js'
  },
  output: {
    filename: 'build.js'
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules)/},
      {test: /\.js$/, loader: 'eslint-loader', exclude: /(node_modules)/}
    ]
  },

  resolve: {
    extensions: ['', '.js']
  },

  eslint: {
    configFile: '.eslintrc'
  }
};
