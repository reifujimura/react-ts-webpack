const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SourceDirectory = path.resolve(__dirname, "src");
const DistDirectory = path.resolve(__dirname, "dist");

module.exports = [
  {
    entry: path.resolve(SourceDirectory, "index.tsx"),
    output: {
      path: DistDirectory,
      publicPath: "/",
      filename: "bundle.[hash].js"
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            compilerOptions: {
              sourceMap: process.env.NODE_ENV === "development"
            }
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(SourceDirectory, "index.html")
      })
    ],
    devServer: {
      hot: true,
      open: true,
      historyApiFallback: true
    }
  }
];
