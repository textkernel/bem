const { baseConfig, plugins } = require('./webpack.config');

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [plugins.namedModulesPlugin]
};
