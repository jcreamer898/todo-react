import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

/**
 * Webpack configuration
 * @type {import("webpack").Configuration}
 */
export default {
  mode: "development",
  context: path.resolve("src"),
  entry: {
    main: "./main.jsx",
  },

  output: {
    path: path.resolve("dist"),
  },
  
  module: {
    rules: [
      // swc-loader
      {
        test: /\.jsx?$/,
        use: {
          loader: "swc-loader",
        }
      },
      // css loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("index.webpack.html")
    }),
  ]
};