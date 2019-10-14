import path from 'path';
import webpack from 'webpack'; // eslint-disable-line
import { buildParams } from '../../package.json';

const PROJECT_ROOT_PATH = path.resolve(__dirname, '../../');
const SOURCE_PATH = path.resolve(PROJECT_ROOT_PATH, 'src');
const DIST_PATH = path.resolve(PROJECT_ROOT_PATH, 'dist');
const { libraryName: LIBRARY_NAME } = buildParams;

export default {
    mode: 'production',
    context: SOURCE_PATH,
    entry: './index.ts',
    output: {
        filename: `${LIBRARY_NAME}.js`,
        path: DIST_PATH,
        library: LIBRARY_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin({
            hashDigestLength: 6,
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.json'],
    },
    optimization: {
        minimize: true,
    },
    performance: {
        hints: 'error',
        maxEntrypointSize: 10_000,
    },
};
