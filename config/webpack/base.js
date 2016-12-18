// webpack imports
var webpack = require('webpack')
// local imports
var projectPaths = require('../projectPaths')


// default to using development configuration
// var devtool = 'source-map'
var devtool = ''
var plugins = []

// export webpack configuration object
module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: projectPaths.sourceDir,
        query: {
          extends: projectPaths.babelConfig,
        }
      }, {
        test: /\.css$/,
        loaders: ['style', 'css'],
      }, {
        test: /\.(png|jpg|ttf)$/,
        loader: 'url',
        query: { limit: 10000000 },
      }, {
        test: /\.json/,
        loader: 'json',
      }, {
        test: /\.styl/,
        loaders: ['style', 'css', 'stylus'],
      }, {
        test: /\.svg/,
        loaders: ['svg-url-loader?noquotes'],
      }
    ],
  },
  resolve: {
    extensions: ['', '.js'],
    root: [
      projectPaths.sourceDir,
      projectPaths.rootDir,
    ],
  },
  devtool: devtool,
}


// end of file
