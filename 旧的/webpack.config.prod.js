/**
 * Created by 刘凯 on 2017/10/30.
 */

var path = require("path");
const webpack = require('webpack');
module.exports = {
    // devtool: 'source-map',
    entry: {
        app: ["./main.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.[chunkhash].js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new htmlWebpackPlugin({
            template: './index.html'
        })
    ]
};