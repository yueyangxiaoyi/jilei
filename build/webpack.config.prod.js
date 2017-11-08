/**
 * Created by 刘凯 on 2017/10/30.
 */

var path = require("path");
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
var projectRoot = path.resolve(__dirname, '../src/')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    devtool: 'source-map',
    entry: {
        app: ["./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "./",
        filename: "bundle.[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',  // 在babel-loader对源码进行编译前进行lint的检查
                include: projectRoot,  // src文件夹下的文件需要被lint
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true,
                        emitError: true,
                        failOnError: true,
                        formatter: require('eslint-friendly-formatter')  // 编译后错误报告格式
                    }
                }],
                exclude: /node_modules/ //可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
            },
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: 'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=8192&name=css/images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?limit=8192&name=css/images/[hash:8].[name].[ext]'
            }
        ]
    },
    plugins: [
        // 将打包环境定为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        //压缩
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false,
                drop_debugger: true, // 去掉debugger
                drop_console: true // 去掉console
            },
            comments: false
        }),
        new htmlWebpackPlugin({
            filename: './index.html',
            // 是否注入 html
            inject: true,
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        new ExtractTextPlugin("css/[name].[contenthash].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // ( 公共chunk(commnons chunk) 的名称)

            filename: "vendor.[chunkhash].js"
            // ( 公共chunk 的文件名)

            // minChunks: 3,
            // (模块必须被3个 入口chunk 共享)

            // chunks: ["pageA", "pageB"],
            // (只使用这些 入口chunk)
        })
    ]
};
