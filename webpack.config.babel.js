import webpack from 'webpack';
import clean from 'clean-webpack-plugin';
import copy from 'copy-webpack-plugin';
import extract from 'extract-text-webpack-plugin';
import analyze from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';
import html from 'html-webpack-plugin';
import 'pathify-string';

const isDev = process.env.npm_lifecycle_script.includes('webpack-dev-server');

export default {
  context: __dirname.join('src'),
  entry: {
    app: [
      './before',
      'whatwg-fetch',
      'babel-polyfill',
      './app'
    ]
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: 'chunks/[name].[chunkhash].js',
    path: __dirname.join('build'),
    sourceMapFilename: '[file].map',
    hashDigestLength: 5
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      include: __dirname.join('src'),
      use: [ //
        isDev && 'webpack-module-hot-accept',
        //
        !isDev && 'babel-loader',
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
      test: /\.(png|jpe?g|woff|woff2|eot|ttf|svg|pdf|mp3|docx|txt)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: isDev ?
            '[path][name].[ext]' :
            'assets/[name]-[hash:base64:5].[ext]'
        }
      }
    }, {
      test: /\.(pug|jade)$/,
      use: 'pug-loader'
    }]
  },
  plugins: [
    //
    !isDev && new clean(['build']),
    //
    new extract({
      filename: '[name].[chunkhash].css',
      // disable: isDev,
      disable: true,
    }),
    isDev && new webpack.NamedModulesPlugin() || new webpack.HashedModuleIdsPlugin(),
    // //
    // !isDev && new webpack.optimize.CommonsChunkPlugin({
    //   name: 'node_modules',
    //   minChunks: module => module.context.includes('node_modules')
    // }), !isDev && new webpack.optimize.CommonsChunkPlugin({
    //   name: 'webpack'
    // }),
    //
    !isDev && new html({
      template: 'shell.html',
      inject: false
    }),
    // //
    // copy([{}]),
    // //
    // !isDev && new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   mangle: false,
    //   comments: false,
    //   output: {
    //     ascii_only: true
    //   }
    // }),
    // //
    // !isDev && new analyze({
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    //   generateStatsFile: true
    // }),
  ].filter(Boolean),
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
  }
};
