const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const webpackConfig = merge(baseConfig, {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASEURL': JSON.stringify("https://jcapi.inypc.com")
        })
    ],
    optimization: {
        chunkIds: 'named',
        runtimeChunk: 'single',
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: false,
                        dead_code: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false,
                        beautify: false
                    },
                    mangle: true
                },
                parallel: true, // 使用多进程并行运行可提高构建速度，默认的并发运行数量 os.cpus().length - 1
            })
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                styles: {
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                },
                common: {
                    chunks: 'all',
                    minChunks: 1,
                    minSize: 1000,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    chunks: 'all',
                    priority: 2,
                    reuseExistingChunk: true,
                }
            }
        }
    }
})

module.exports = webpackConfig