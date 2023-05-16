const { merge } = require('webpack-merge')
const path = require('path');
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const baseUrl = "/api"
const webpackConfig = merge(baseConfig, {
    mode: "development",
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASEURL': JSON.stringify(baseUrl)
        })
    ],
    devServer: {
        port: 4000, // 服务端口号
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新，后面会讲react模块热替换具体配置
        // historyApiFallback: true, // 解决history路由404问题
        static: {
            directory: path.join(__dirname, "public"), //托管静态资源public文件夹
        },
        proxy: { // 配置代理（只在本地开发有效，上线无效）
            '/api': {
                // target: 'http://192.168.0.16:3000/',
                target: 'https://jcapi.inypc.com/',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,     // target是域名的话，需要这个参数，
                secure: false,         // 设置支持https协议的代理
            }
        }
    }
})

module.exports = webpackConfig