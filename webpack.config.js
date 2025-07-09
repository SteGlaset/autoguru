//webpack.config.js
const path = require('path');
const PugPlugin = require('pug-plugin');
const {sync} = require("glob");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, "src"),
};

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        index: './src/index.pug',
        ...sync('./src/branches/**.pug').reduce(function(obj, el){
            obj['branches/' + path.parse(el).name] = el;
            return obj
        },{})
    },
    output: {
        path: path.resolve(__dirname, 'dist', ),
        filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
        clean: true,
        assetModuleFilename: isProduction ? 'assets/[name].[contenthash][ext]' : 'assets/[name][ext]'
    },
    optimization: {
        minimize: isProduction,
        minimizer: isProduction ? [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ] : [],
        splitChunks: isProduction ? {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 10,
                },
                bootstrap: {
                    test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
                    name: 'bootstrap',
                    chunks: 'all',
                    priority: 20,
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 5,
                    reuseExistingChunk: true,
                },
            },
        } : false,
        runtimeChunk: isProduction ? 'single' : false,
    },
    plugins: [
        new PugPlugin({
            pretty: !isProduction,
            css: {
                filename: isProduction ? 'css/[name].[contenthash].css' : 'css/[name].css'
            }
        }),
        ...(isProduction ? [
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
            }),
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
        ] : []),
    ],
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            outputStyle: isProduction ? 'compressed' : 'expanded',
                        }
                    }
                }]
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.(png|jpg|jpeg|ico|webp)/,
                type: 'asset/resource',
                generator: {
                    filename: isProduction ? 'assets/images/[name].[contenthash][ext]' : 'assets/images/[name][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: isProduction ? 'assets/fonts/[name].[contenthash][ext][query]' : 'assets/fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: isProduction ? 'assets/icons/[name].[contenthash][ext][query]' : 'assets/icons/[name][ext][query]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.scss', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        hot: true,
        open: true,
        port: 8080,
        historyApiFallback: true,
    },
    stats: isProduction ? 'errors-only' : 'normal',
    performance: {
        hints: isProduction ? 'warning' : false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};
