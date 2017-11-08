/**
 * Created by 刘凯 on 2017/6/8.
 */
// var path = require('path')
// var webpack = require("webpack");
// // var WebpackDevServer = require("webpack-dev-server");
// var htmlPlugin=require('html-webpack-plugin');
// var ROOT_PATH = path.resolve(__dirname);
// var APP_PATH = path.resolve(ROOT_PATH, 'app');
// module.exports = {
//     //配置项
//     entry:{
//         app:APP_PATH
//     },
//     output:{
//         path:path.resolve(__dirname,"build"),
//         publicPath:"/assets/",
//         filename:"bundle.js"
//     },
//     devServer: {
//         inline:true,
//         hot:true
//         // historyApiFallback: true,
//         // inline: true//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
//     },
//     plugins:[
//         new htmlPlugin({
//             title:'1222',
//             filename: 'index.html',
//             template: 'index.html',
//             inject: true
//         })
//     ]
// };
var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件
var projectRoot = path.resolve(__dirname, './')
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    // parser: 'babel-eslint',
    entry: {
        app: ["./app/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "./",
        filename: "[name].[chunkhash].js"
    },
    // eslint: {
    //     // eslint 代码检查配置工具
    //     formatter: require('eslint-friendly-formatter')
    // },
    module: {
        // preLoaders: [{
        //     test: /\.js$/,
        //     loader: 'eslint',
        //     include: projectRoot,
        //     exclude: /node_modules/
        // }],
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loaders: [
            //         'babel-loader',
            //         'eslint-loader'
            //     ],
            //     query: {
            //         cacheDirectory: true
            //     }
            // },
            {
                test: /\.js$/,
                enforce: 'pre',  // 在babel-loader对源码进行编译前进行lint的检查
                include: /app/,  // src文件夹下的文件需要被lint
                // loader: 'eslint-loader',
                // options: {
                //     emitWarning: true,
                //     emitError: true,
                //     failOnError: true,
                //     format: require('eslint-friendly-formatter')
                // },
                // options: {
                //     formatter: require('eslint-friendly-formatter')
                // },
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
                include: /app/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8081,
        publicPath: "/",
        contentBase: path.resolve(__dirname),
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        stats: {
            colors: true,
            chunks: false
        },
        proxy: {
            "/api": "http://localhost:3000"
        }
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './index.html'})
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         eslint: {
        //             formatter: require('eslint-formatter-pretty')
        //         }
        //     }
        // })
    ]
};