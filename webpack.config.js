const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // watch: false,
    mode: 'development',
    entry: {
		app: './src/index.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
    module: {
        rules: [
            {
                test: [/\.(js|jsx)$/],
                exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react']
					}
				},
            },
            {
				test: [/\.(css)$/],
				use: ['style-loader', 'css-loader']
            }
        ]   
    },
    // resolve: {
	// 	extensions: ['.js', '.jsx', '.json']
	// },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './dist/index.html',
            inject: false //https://stackoverflow.com/questions/37081559/all-my-code-runs-twice-when-compiled-by-webpack
        })
    ]
}