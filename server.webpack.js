// node imports
var fs = require('fs')
var path = require('path')
// third party imports
var webpack = require('webpack')
// export webpack configuration object
const baseConfig = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      }
    ],
  }
}

// dict of node modules to treat as externals
// reference: http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeModules = fs.readdirSync('node_modules')
                    // filter out the .bin dir
                    .filter(function(dir) {
                      return dir !== '.bin'
                    })
                    // create the data structure desired by webpack
                    .reduce(function(state, dir) {
                      var dummy = {}
                      dummy[dir] = 'commonjs ' + dir

                      return Object.assign({}, state, dummy)
                    }, {})

module.exports = Object.assign({}, baseConfig, {
  // additional client configuration goes here
  entry: './src/server/index.js',
  output: {
    path: './build',
    filename: 'server.js'
  },
  // node config
  target: 'node',
  // don't bundle node modules
  externals: nodeModules,
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __dirname: true,
    __filename: true,
    path: true,
    fs: true,
    net: true
  },
})


// end of file
