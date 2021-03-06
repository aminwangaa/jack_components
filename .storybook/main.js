const path = require("path")

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (baseConfig, options) => {
    // Modify or replace config. Mutating the original reference object can cause unexpected bugs.
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // TypeScript with Next.js
    // newConfig.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   include: [
    //     path.resolve(__dirname, '../src/*')
    //   ],
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env'],
    //         plugins: ['react-docgen'],
    //       },
    //     },
    //   ],
    // });
    newConfig.resolve.extensions.push('.ts', '.tsx');

    // Less
    // Remove original less loader
    // newConfig.module.rules = baseConfig.module.rules.filter(
    //   (f) => f.test.toString() !== '/\\.less$/'
    // );
    newConfig.module.rules.push({
      test: /\.less$/,
      include: [
        // Include antd to rebuild
        /[\\/]node_modules[\\/].*antd/,
        path.resolve(__dirname, '../src/*'),
      ],
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    });

    //
    // CSS Modules
    // Many thanks to https://github.com/storybookjs/storybook/issues/6055#issuecomment-521046352
    //

    // First we prevent webpack from using Storybook CSS rules to process CSS modules
    // newConfig.module.rules.find(
    //   (rule) => rule.test.toString() === '/\\.css$/'
    // ).exclude = /\.module\.css$/;

    // Then we tell webpack what to do with CSS modules
    newConfig.module.rules.push({
      test: /\.module\.css$/,
      include: [
        /[\\/]node_modules[\\/].*antd/,
        path.resolve(__dirname, '../src/*'),
      ],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ],
    });

    newConfig.resolve.alias['/images'] = path.resolve(
      __dirname,
      '../public/images'
    );

    return newConfig;
  },
}