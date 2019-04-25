
var path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname,'../docs/script'),
		filename: 'demo.album.js',
		library: 'Demo',
		libraryTarget: 'window',
		globalObject: 'window'
	}
};
