module.exports = {
	presets: [
		'module:metro-react-native-babel-preset',
		'module:react-native-dotenv',
	],
	plugins: [
		['@babel/plugin-proposal-decorators', { legacy: true }],
		[
			'module-resolver',
			{
				root: ['./'],
				alias: {
					src: './src',
					assets: './assets',
				},
				extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json'],
			},
		],
	],
};
