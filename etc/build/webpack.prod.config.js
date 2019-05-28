const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const { baseConfig, plugins } = require('./webpack.config');

module.exports = {
    ...baseConfig,
    mode: 'production',
    plugins: [plugins.hashedModuleIdsPlugin],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false
                }
            })
        ]
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM'
        }
    }
};
