const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpackConfig = {
    entry: path.join(__dirname, 'src', 'main.tsx'),
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        path: path.join(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
            ignoreOrder: true
        }),
        new CssMinimizerPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            inject: true,
            hash: true,
            minify: {
                removeComments: true, //去除HTML注释
                collapseWhitespace: true, //去掉空格
                minifyJS: true, // 压缩html里的js（使用uglify-js进行的压缩）
                minifyCSS: true, // 压缩html里的css（使用clean-css进行的压缩）
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'), // 复制public下文件
                    to: path.resolve(__dirname, 'dist'), // 复制到dist目录中
                    filter: source => {
                        return !source.includes('index.html') // 忽略index.html
                    }
                },
            ],
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                include: path.join(__dirname, 'src'),
                exclude: /(node_modules)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: /(node_modules)/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1 * 1024 // 1kb以下小文件打入js中
                    }
                },
                generator: {
                    filename: 'static/[hash][ext][query]'
                }
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name][ext]', // 文件输出目录和命名
                },
            }
        ]
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions: [".js", ".ts", ".tsx", ".less", ".png", ".jpg"],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    }
}
module.exports = webpackConfig