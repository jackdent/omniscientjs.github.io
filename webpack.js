var webpack = require('webpack');

module.exports = function (options) {
  return {
    plugins: options.watch ? [] : [ new webpack.optimize.UglifyJsPlugin() ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            // 'react-hot',
            '6to5-loader'
            //'6to5-loader?experimental&optional=selfContained' // http://6to5.org/docs/usage/experimental/
          ]
        },
        {
          test: /\.less$/,
          loaders: [
            "style-loader",
            "css-loader",
            "autoprefixer-loader?browsers=last 2 version",
            "less-loader?strictMath&cleancss"
          ]
        }
      ]
    }
  };
};