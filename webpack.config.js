const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    'index': './src/index.js',
    'service_worker': './src/service_worker.js'
  },

	output: {
		path: path.join(__dirname, 'docs'),
		filename: '[name].js'
	},

  watchOptions: {
    ignored: [
      '/node_modules/',
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    disableHostCheck: true
  }
};
