const path = require('path');

module.exports = {
  entry: {

    index: './src/index.js',

    loginRegister: './src/loginRegister.js',

    routine: './src/routine.js',

    gallery: './src/gallery.js',

    frames: './src/frames.js',

    diplayFrame: './src/diplayFrame.js',




  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [{
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },],
  },
};