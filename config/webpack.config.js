
var path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname,'../server/web'),
		filename: 'demo.album.js',
		library: 'Demo',
		libraryTarget: 'window',
		globalObject: 'window'
	}
};
