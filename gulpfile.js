const {src, dest, parallel, series, watch} = require('gulp');
const webpack = require("webpack-stream");
const browserSync = require('browser-sync').create();
const jsonServer = require('json-server');

function jsonServ() {
    const server = jsonServer.create();
    const router = jsonServer.router('db.json');
    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use(router);
    server.listen(3003, () => {
        console.log('JSON Server is running');
    });
}

const dist = "./dist";

function htmlCopy(){
    return src("./src/index.html")
            .pipe( dest(dist))
            .pipe( browserSync.stream());
}


function devBuildJs(){
    return src('./src/js/main.js')
    .pipe( webpack({
        mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                      
    }))
    .pipe( dest(dist))
    .on("end", browserSync.reload);
}

function copyAssets(){
    return src("./src/assets/**/*.*")
    .pipe( dest(dist + "/assets"));
}


function startWatch(){    
    browserSync.init({   
        server: dist
    });
    watch(['src/js/**/*.js', '!src/**/*.min.js'], devBuildJs); 
    watch(['src/**/*.html'], htmlCopy);
}

exports.copy = copyAssets;
exports.buildjs = devBuildJs;
exports.watch = startWatch;
exports.htmlcopy = htmlCopy;
exports.jsonserver = jsonServ;

exports.build = parallel(devBuildJs, htmlCopy, startWatch);