const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: path.join(__dirname, '/app/main.js'), // 已多次提及的唯一入口文件
  output: {
    path: path.join(__dirname, '/server'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  mode: 'development', // production
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',

            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'server'),
    compress: true,
    port: 9000
  }
}
