"use strict";
const webpack = require("webpack")
const { resolve } = require("path");

module.exports = {
  entry: ["babel-polyfill", "./client/main"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  mode: "development",
  context: __dirname,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: { os: require.resolve("os-browserify/browser") },
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, "./client"),
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};
