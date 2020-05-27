const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      root: path.resolve(__dirname, './'),
      root2: path.resolve(__dirname, './src'),
      
    }
  }
};
