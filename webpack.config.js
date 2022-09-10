const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
//console.log("isDev", isDev);

const optimization = () => {
  const config = { splitChunks: { chunks: "all" } };

  if (!isDev)
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ]

  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;



/////////////////////////// EXPORTS
module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: ["@babel/polyfill", "./index.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: filename(`js`),
    publicPath: "./fish-game/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  optimization: optimization(),
  devServer: {
    port: 2500,
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    //hot: isDev, - this should be disabled. Otherwise html page doesn't refresh
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html", minify: { collapseWhitespace: !isDev } }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: "./img/bubble1.png", to: "img/bubble1.png" }] }),
    new CopyWebpackPlugin({ patterns: [{ from: "./img/bubble2.png", to: "img/bubble2.png" }] }),
    new CopyWebpackPlugin({ patterns: [{ from: "./img/sweem-flipped.png", to: "img/sweem-flipped.png" }] }),
    new CopyWebpackPlugin({ patterns: [{ from: "./img/sweem.png", to: "img/sweem.png" }] }),
    new CopyWebpackPlugin({ patterns: [{ from: "./sound", to: "sound" }] }),
    new MiniCssExtractPlugin({ filename: filename(`css`) })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDev, reloadAll: true }
          }
          , 'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ttf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ],
  }
}