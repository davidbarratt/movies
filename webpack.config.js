require('dotenv').config();
const path = require('path');
const { EnvironmentPlugin } = require('webpack');

let exposedVars = [];

if (process.env.TMDB_DIRECT) {
  exposedVars = [
    'TMDB_API_KEY',
  ];
}

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].css',
            },
          },
          'extract-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin(exposedVars),
  ],
};
