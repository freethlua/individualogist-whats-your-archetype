const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.npm_lifecycle_script.includes('webpack-dev-server');

module.exports = {
  entry: './app',
  output: {
    filename: 'build/app.js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }, {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: { modules: true },
        }, 'stylus-loader']
      })
    }, {
      test: /\.(pug|jade)$/,
      use: 'pug-loader',
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'build/styles.css',
      disable: isDev,
    }),
  ]
};
