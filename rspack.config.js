import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const prod = process.env.NODE_ENV === "production";

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
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: "css", // this is enabled by default for .css, so you don't need to specify it
      },
      {
        test: /\.(j|t)s$/,
        exclude: [/[\\/]node_modules[\\/]/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
            externalHelpers: true,
            transform: {
              react: {
                runtime: "automatic",
                development: !prod,
                refresh: !prod,
              },
            },
          },
          env: {
            targets: "Chrome >= 48",
          },
        },
      },
      {
        test: /\.(j|t)sx$/,
        loader: "builtin:swc-loader",
        exclude: [/[\\/]node_modules[\\/]/],
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
                development: !prod,
                refresh: !prod,
              },
            },
            externalHelpers: true,
          },
          env: {
            targets: "Chrome >= 48", // browser compatibility
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("./index.webpack.html")
    }),
  ]
};
