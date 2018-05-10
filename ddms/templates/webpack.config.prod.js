const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isNotStyleModule = ({ resource }) => {
  return resource ? resource.indexOf('.scss') === -1 : true;
};

const isVendor = ({ context }) => {
  return context && context.indexOf('node_modules') !== -1;
};

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader'
];

const config = {
  'devtool': 'source-map',
  'entry': [
    './src/index.js'
  ],
  'module': {
    'loaders': [
      {
        'test': /\.(scss|css)$/,
        'loader': ExtractTextPlugin.extract({
          'fallback': 'style-loader',
          'use': sassLoaders.join('!')
        })
      },
      {
        'test': /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        'loader': 'file-loader?name=fonts/[name].[hash].[ext]&publicPath=./../'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          "presets": [
            "es2015",
            "react",
            "stage-2"
          ],
          plugins: [
            [
              "transform-imports",
              {
                "react-bootstrap": {
                  "transform": "react-bootstrap/lib/${member}",
                  "preventFullImport": true
                }
              }
            ]
          ],
          compact: false
        }
      }, {
      'test': /\.(jpe?g|png|gif|svg)$/i,
      'loaders': [
        'file-loader?name=images/[name].[hash].[ext]',
        {
          'loader': 'image-webpack-loader',
          'query': {
            'gifiscle': {
              'interlaced': false
            },
            'optipng': {
              'optimizationLevel': 7
            },
            'bypassOnDebug': true
          }
        }
      ]
    }]
  },
  'resolve': {
    'extensions': ['*', '.js', '.jsx', '.scss', '.json']
  },
  'output': {
    'path': path.resolve(__dirname, './../static'),
    'filename': 'scripts/[name].[chunkhash].js',
    'chunkFilename': 'scripts/[name].[chunkhash].js',
    'publicPath': '/static/'
  },
  'plugins': [
    new webpack.optimize.CommonsChunkPlugin({
      'name': 'vendor',
      minChunks(module) {
        return isNotStyleModule(module) && isVendor(module);
      }
     }),
     new webpack.optimize.CommonsChunkPlugin({
       'name': 'manifest',
     }),
    new HtmlWebpackPlugin({
      'template': './src/index.html'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('styles/[name].[hash].css'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('production'),
     'process.env.IS_PRODUCTION': process.env.NODE_ENV === 'production'
    }),
    new webpack.optimize.UglifyJsPlugin({
      'compress': {
        'warnings': false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      'options': {
        'context': __dirname,
        'postcss': [autoprefixer({
          'browsers': [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
          ]
        })]
      }
    })
  ]
};

if (process.env.ANALYZE === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
