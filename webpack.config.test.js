const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      include: [path.join(__dirname, './components'), path.join(__dirname, './spec')],
      loader: 'babel'
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      include: [path.join(__dirname, './components'), path.join(__dirname, './spec')],
      loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap'
    }, {
      test: /\.css$/,
      include: [path.join(__dirname, './components'), path.join(__dirname, './spec')],
      loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
    }]
  },
  resolve: {
    extensions: ['', '.css', '.scss', '.js', '.json'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style']
  },
  watch: true,
  postcss (webpackInstance) {
    return [
      require('postcss-import')({
        addDependencyTo: webpackInstance,
        root: __dirname,
        path: [path.join(__dirname, './components')]
      }),
      require('postcss-cssnext')(),
      require('postcss-reporter')({ clearMessages: true })
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test')
    })
  ]
};
