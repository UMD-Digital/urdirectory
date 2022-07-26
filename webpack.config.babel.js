import path from 'path';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin-next';

module.exports = env => {
  const devMode = env && env.NODE_ENV ? env.NODE_ENV : 'none';
  const devtool = devMode === 'production' ? 'nosources-source-map' : 'eval';
  const isProduction = devMode === 'production';
  const optimization = {};

  const entry = {
    main: path.resolve('/source/scripts/main'),
  };

  const stats = {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    errors: true,
    errorDetails: true,
    errorStack: false,
    source: true,
    timings: true,
    warnings: true,
  };

  const modules = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  };

  const plugins = [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static/',
          to: '[path][name][ext]',
          context: 'source/assets',
        },
        {
          from: 'craft/',
          to: '[path][name][ext]',
          context: 'source/assets',
        },
        {
          from: 'source/templates',
          to: '../templates',
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: [
          'cp -R source/assets/uploads craft/web',
          'rm -rf craft/web/cpresources',
          'mkdir craft/web/cpresources',
          'chmod -R 777 craft/web/cpresources',
        ],
      },
    }),
  ];

  const output = {
    path: path.resolve('craft/web'),
    filename: '[name].js',
  };

  if (isProduction) {
    optimization.minimize = true;
    optimization.minimizer = [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ];
  }

  return {
    entry: entry,
    mode: devMode,
    devtool: devtool,
    stats: stats,
    module: modules,
    plugins: plugins,
    output: output,
    optimization: optimization,
  };
};
