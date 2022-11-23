const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias');
const theme = require('./src/app/config/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true,
          },
        },
      },
    }, {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: './tsconfig.extend.json'
      }
    }
  ],
};