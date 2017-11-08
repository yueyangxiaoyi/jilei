/**
 * Created by 刘凯 on 2017/10/31.
 */
var WebpackDevServer=require('webpack-dev-server');
var webpack=require('webpack');
var config=require('./webpack.config');
var path=require('path');
var opn = require('opn');
var compiler=webpack(config);
var server=new WebpackDevServer(compiler,{//创建服务器实例
    inline: true,
    port: 8082,
    publicPath: config.output.publicPath,
    contentBase: path.resolve(__dirname,'../'),
    watchContentBase: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout : 300,
        poll             : 1000
    },
    stats: {
        colors: true,
        chunks: false,
        errors: true,
        errorDetails: true
    },
    proxy: {
        "/api": "http://localhost:3000"
    }
});
server.listen(8082,'localhost',function(err){
    var uri = 'http://localhost:8082'
    opn(uri)
});
