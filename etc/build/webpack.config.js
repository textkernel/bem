const path = require('path');
const webpack = require('webpack');
const { buildParams } = require('../../package.json');

const PROJECT_ROOT_PATH = path.resolve(__dirname, '../../');
const SOURCE_PATH = path.resolve(PROJECT_ROOT_PATH, 'src');
const DIST_PATH = path.resolve(PROJECT_ROOT_PATH, 'dist');
const NODE_MODULES_PATH = path.resolve(SOURCE_PATH, '../node_modules');
const { libraryName: LIBRARY_NAME } = buildParams;

const plugins = {
    namedModulesPlugin: new webpack.NamedModulesPlugin(),
    hashedModuleIdsPlugin: new webpack.HashedModuleIdsPlugin({
        hashDigestLength: 6
    })
};

const baseConfig = {
    context: SOURCE_PATH,

    entry: {
        main: './index.js'
    },

    output: {
        filename: `${LIBRARY_NAME}.min.js`,
        path: DIST_PATH,
        library: LIBRARY_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [SOURCE_PATH],
                use: ['babel-loader']
            }
        ]
    },

    resolve: {
        modules: [NODE_MODULES_PATH],
        extensions: ['.js']
    }
};

module.exports = {
    baseConfig,
    plugins,
    PROJECT_ROOT_PATH,
    SOURCE_PATH,
    DIST_PATH,
    NODE_MODULES_PATH
};
