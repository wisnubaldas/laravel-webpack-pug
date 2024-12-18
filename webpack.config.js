const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  output: {
    path: path.resolve(__dirname, 'public/build'),
    clean: true,
    filename: 'index.jing',
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "resources/assets/img/corporate", to: "img/corporate" },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$':'jquery',
      'window.jQuery':'jquery',
    }),
    new HtmlBundlerPlugin({
      entry: {
        // define templates here
        index: 'resources/views/index.pug',
      },
      js: {
        // output filename of compiled JavaScript
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // output filename of extracted CSS
        filename: 'css/[name].[contenthash:8].css',
      },
      // define the preprocessor for compile Pug templates
      preprocessor: 'pug',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css)$/,
        use:['css-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(ico|png|jp?g|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
    ],
  },
  resolve: {
    // use aliases used in sources instead of relative paths like ../../
    alias: {
      '@views': path.join(__dirname, './resources/views/'),
      '@parsial': path.join(__dirname, './resources/views/parsial/'),
      '@images': path.join(__dirname, './resources/assets/img/'),
      '@plugin': path.join(__dirname, './resources/assets/plugins/'),
      '@css': path.join(__dirname, './resources/assets/css/'),
      '@js': path.join(__dirname, './resources/assets/js/'),
      '@font': path.join(__dirname, './resources/assets/css/corporate/fonts/'),
    },
  },
  // enable live reload
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};
