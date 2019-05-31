/// <reference types="./typings" />
import path from 'path';
import webpack from 'webpack';
import FileManagerPlugin from 'filemanager-webpack-plugin';
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
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin({
            hashDigestLength: 6
        }),
        new FileManagerPlugin({
            onStart: {
                delete: [`${DIST_PATH}/`],
            },
            onEnd: {
                move: [{
                    source: `${DIST_PATH}/dts/bem/bem.d.ts`,
                    destination: `${DIST_PATH}/bem.d.ts`
                }],
                delete: [`${DIST_PATH}/dts/`]
            }
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.json']
    },
    optimization: {
        minimize: true,
    },
    performance: {
        hints: 'error',
        maxEntrypointSize: 3_000,
    }
};
