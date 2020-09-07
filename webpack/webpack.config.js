const webpack = require('webpack')

const path = require('path') // 获取路径参数
    // const plugin1 = require('plugin1') // 插件
const Happypack = require('happypack')
const os = require('os');
const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length })
const HtmlWebpackPlugin = require('html-webpack-plugin') // 创建html模板并自动插入srcipt标签
const CleanWebpackPlugin = require('clean-webpack-plugin') // 每次打包前清理dist目录

// 分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
console.log('%c 🍯 MiniCssExtractPlugin: ', 'font-size:20px;background-color: #FCA650;color:#fff;', MiniCssExtractPlugin);
// 压缩js
const TerserJSPlugin = require('terser-webpack-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 优化打包
// 开启多线程打包 -- 优化 ： 小项目增加耗时，大项目反而好用


module.exports = { // 导出一个对象
    // 设置开发模式
    mode: 'development',
    // 指定入口文件
    // -- 单文件入口 可以简写成 --> entry:'./app/src/index.js'
    entry: {
        main: './app/src/index.js'
    },
    // 多文件入口
    // entry: {
    //     one: './app/src/one/index.js',
    //     two: './app/src/two/index.js',
    //     three: './app/src/three/index.js'
    // },



    // 指定输出文件bundle.js
    // 单文件入口的输出
    // output: {
    //     path: path.resolve(__dirname, 'dist'), // 输出文件路径
    //     filename: 'bundle.js' // 输出文件名称
    // },
    // 多文件入口的输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 此处与开启热更新冲突，需要去掉
        // filename: '[name].[contenthash].js', // 使用name占位符，自动识别入口文件，从而区分打包文件名
        // 改写为
        filename: '[name].js',
        publicPath: '/'
    },
    // PS：即使存在多入口，也只能存在一个output
    devServer: {
        port: 3000,
        open: true,
        contentBase: path.resolve(__dirname, 'dist'),
        progress: true,
        inline: true,
        hot: true
    },

    // 模块转换器 -- 模块==>规则
    module: {
        // noParse: /模块名称/, // 例如：JQuery本身无依赖，可以不解析其依赖关系 优化二:"取消解析依赖关系"
        rules: [
            // 加载js
            {
                test: /\.js$/,
                use: 'Happypack/loader?id=js',
                include: path.resolve(__dirname, '/app') // 只在src目录下面查找  优化四：缩小模块查找范围
                    // 或者exclude: /node_modules/ // 不在node_module 目录查找
            },
            // 加载css
            {
                test: /\.css$/, // /\.后缀名$ /
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: MiniCssExtractPlugin.loader, // 使用的转换器
                        options: {
                            publicPath: (resourcePath, context) => {
                                // publicPath is the relative path of the resource to the context
                                // e.g. for ./css/admin/main.css the publicPath will be ../../
                                // while for ./css/main.css the publicPath will be ../
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        },
                    },
                    'css-loader'
                ]
            },
            // 加载图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // 加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },


    // 使用source map
    devtool: 'source-map',
    //  插件

    plugins: [
        new Happypack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        // 使用压缩css插件
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new webpack.ProgressPlugin(), // webpack 自带一系列的插件
        //开发模式
        //生产模式
        new webpack.HashedModuleIdsPlugin(),
        // new plugin1({
        //     // 插件配置
        // }),
        new CleanWebpackPlugin.CleanWebpackPlugin(), // 每次打包前清理dist目录
        new HtmlWebpackPlugin({
            title: 'webpackdemo',
            hash: true,
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联css
            },
            filename: 'index.html',
            template: 'index.html'
        }), //创建html模板
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), // 热更新模块 HRM

        // 打包忽略本地     优化三：不引入指定文件
        //以moment时间库为例，locale目录中包含大量的语言包，取消引入该部分，另外手动引入指定语言包（中文）
        // new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 
        // new webpack.DllPlugin() // 性能优化五 ，使用Dll插件提高构建速度
    ],
    // 提取引导模板
    optimization: { // 压缩代码
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all', // 表示哪些需要优化
            minSize: 30000, //  表示在压缩前的最小模块大小，默认为30000
            minChunks: 1, // 表示被引用次数，默认为1
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数，默认为5
            maxInitialRequests: 3, // 一个入口最大的并行请求数，默认为3
            automaticNameDelimiter: '~', // 命名连接符
            name: true, // 拆分出来块的名字，默认由块名和hash值自动生成
            cacheGroups: {} // 缓存组。缓存组的属性除上面所有属性外，还有test, priority,
        },
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    }


}