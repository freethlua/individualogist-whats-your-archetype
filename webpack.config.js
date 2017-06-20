const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isDev = process.env.npm_lifecycle_script.includes('webpack-dev-server');

module.exports = {
  entry: './app',
  output: {
    filename: 'build/app.js',
    sourceMapFilename: '[file].map',
    publicPath: isDev ? '' : '/wp-content/themes/individualogist/whats-your-archetype/'
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  module: {
    // isDev && {test:/\.js$/,use:'webpack-module-hot-accept'},
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
      test: /\.(png|jpe?g|woff|woff2|eot|ttf|svg|pdf|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'build/assets/[name].[ext]',
        },
      },
    }, {
      test: /\.(pug|jade)$/,
      use: 'pug-loader',
    }],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'build/styles.css',
      disable: isDev,
    }),
    new CompressionPlugin({
      // asset: '[path].gz[query]',
      asset: '[path]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true,
    }),
  ],
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
};
