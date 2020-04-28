require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const createPlatformExtensions = (platform, extensions) => {
  return [
    ...extensions.map(extension => `.${platform}${extension}`),
    ...extensions,
  ];
};

const {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD} = require(
  'next/constants');
let nextConfig = {
  useFileSystemPublicRoutes: false,
  webpack: (config) => {
    let plugins = config.plugins || [];
    plugins = [
      ...plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];
    config.plugins = plugins;

    return config;
  },
};
module.exports = (phase, {defaultConfig}) => {
  // console.log('default config:', defaultConfig);
  // console.log('next config:', nextConfig);
  if (phase === PHASE_DEVELOPMENT_SERVER
    || phase === PHASE_PRODUCTION_BUILD) {
    const webpack = nextConfig.webpack;
    nextConfig = {
      ...nextConfig,
      sassLoaderOptions: {
        outputStyle: 'compressed',
      },
      analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../bundles/server.html',
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html',
        },
      },
      webpack: (config) => {
        if (process.env.PLATFORM) {
          let extensions = config.resolve.extensions;
          extensions = createPlatformExtensions(process.env.PLATFORM,
            extensions);
          config.resolve.extensions = extensions;
        }

        if (config.mode === 'production') {
          if (Array.isArray(config.optimization.minimizer)) {
            config.optimization.minimizer.push(
              new OptimizeCSSAssetsPlugin({}),
            );
          }
        }

        let plugins = config.plugins || [];
        plugins = [
          ...plugins,
          new MomentLocalesPlugin({
            localesToKeep: ['vi'],
          }),
        ];
        config.plugins = plugins;

        return webpack ? webpack(config) : config;
      },
    };
    const withSass = require('@zeit/next-sass');
    const withCSS = require('@zeit/next-css');
    const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
    return withSass(withCSS(withBundleAnalyzer(nextConfig)));
  }
  return nextConfig;
};
