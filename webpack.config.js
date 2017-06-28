const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.npm_lifecycle_script.includes('webpack-dev-server');

module.exports = {
  entry: ['./__webpack_public_path__', 'whatwg-fetch', './app'],
  output: {
    filename: 'build/app.js',
    sourceMapFilename: '[file].map',
    hashDigestLength: 5,
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      use: isDev ? 'webpack-module-hot-accept' : []
    }, {
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
      test: /\.(png|jpe?g|woff|woff2|eot|ttf|svg|pdf|mp3|docx|txt)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'build/[path][name].[ext]',
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
    !isDev && new CleanWebpackPlugin(['build']),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
};
