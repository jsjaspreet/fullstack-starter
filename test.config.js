const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const webpack = require('webpack')
const path = require('path')
// local imports
var projectPaths = require('./config/projectPaths')

module.exports = {
  entry: {
    main: './src/client/index.js',
    vendor: ['react', 'react-redux',
             'redux', 'redux-thunk',
             'redux-promise', 'react-dom']
  },
  output: {
    path: './build',
    filename: '[chunkhash].[id].[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // Specify the common bundle's name.
    }),
    new HtmlWebpackPlugin({
      template: path.join(projectPaths.sourceDir, 'server/views/template.html'),
      filename: path.join(projectPaths.buildDir, 'index.html'),
    }),
    new WebpackMd5Hash(),
    new BellOnBundlerErrorPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
}