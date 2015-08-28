module.exports = {
  entry: {
    main: './main.js'
  },
  output: {
    filename: 'build.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  }
};
