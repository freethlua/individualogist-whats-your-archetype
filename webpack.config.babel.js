const path = require('path');
const webpack = require('webpack');
const clean = require('clean-webpack-plugin');
const copy = require('copy-webpack-plugin');
const analyze = require('webpack-bundle-analyzer/lib/BundleAnalyzerPlugin');
const extract = require('extract-text-webpack-plugin');
const html = require('html-webpack-plugin');
const minify = require('uglifyjs-webpack-plugin');
const dotenv = require('dotenv');
const _ = require('lodash');
const pkg = require('./package');

dotenv.load();

const isDev = (process.env.npm_lifecycle_script || process.argv.join()).includes('webpack-dev-server');
const isProd = !isDev;

const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');

export default {
  context: srcPath,
  entry: {
    app: [
      'whatwg-fetch',
      'babel-polyfill',
      '.'
    ]
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: 'chunks/[name].[chunkhash].js',
    path: buildPath,
    sourceMapFilename: '[file].map',
    hashDigestLength: 5
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      include: srcPath,
      use: [
        isDev && 'webpack-module-hot-accept',
        { loader: 'babel-loader', options: { retainLines: true } },
      ].filter(Boolean)
    }, {
      test: /\.css$/,
      // use: ['style-loader', 'css-loader'],
      use: extract.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true
          }
        }]
      })
    }, {
      test: /\.styl$/,
      use: extract.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:5]',
            camelCase: true,
            minimize: true,
            sourceMap: true
          }
        }, 'stylus-loader']
      })
    }, {
      test: /\.(png|jpe?g|woff|woff2|eot|ttf|svg|pdf|mp3|docx)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: isDev
            ? '[path][name].[ext]'
            : 'assets/[name]-[hash:base64:5].[ext]'
        }
      }
    }, {
      test: /\.(pug|jade)$/,
      use: 'pug-loader'
    }, {
      test: /\.(txt)$/,
      use: 'text-loader'
    }]
  },
  plugins: [
    isProd && new clean(['build']),
    new extract({
      filename: '[name].[chunkhash].css',
      disable: isDev,
      // disable: true,
    }),
    isDev && new webpack.NamedModulesPlugin() || new webpack.HashedModuleIdsPlugin(),
    isProd && new webpack.optimize.CommonsChunkPlugin({
      name: 'node_modules',
      minChunks: module => module.context.includes('node_modules')
    }),
    isProd && new webpack.optimize.CommonsChunkPlugin({
      name: 'webpack'
    }),
    new html({
      template: 'index.html',
      inject: false
    }),
    // //
    // copy([{}]),
    //
    isProd && new minify({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        ecma: 6,
        sourceMap: true,
        mangle: false,
        comments: false,
        output: {
          ascii_only: true
        }
      },
    }),
    isProd && new analyze({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
  stats: 'errors-only',
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT,
    disableHostCheck: true,
    historyApiFallback: true,
    stats: 'errors-only',
  }
};
