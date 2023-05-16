//webpack.config.js
const path = require('path');
const PugPlugin = require('pug-plugin');

const PATHS = {
    src: path.join(__dirname, "src"),
};

module.exports = {
    entry: {
        index: './src/index.pug',
        'branches/arbat': './src/branches/arbat.pug',
        'branches/dostoevskaya': './src/branches/dostoevskaya.pug',
        'branches/dostoevskaya2': './src/branches/dostoevskaya2.pug',
        'branches/lubyanka': './src/branches/lubyanka.pug',
        'branches/maryina-rosha': './src/branches/maryina-rosha.pug',
        'branches/mayakovksaya': './src/branches/mayakovksaya.pug',
        'branches/mendeleevskaya': './src/branches/mendeleevskaya.pug',
        'branches/noviy-arbat': './src/branches/noviy-arbat.pug',
        'branches/pushkinskaya': './src/branches/pushkinskaya.pug',
        'branches/rijskaya': './src/branches/rijskaya.pug',
        'branches/teatralnaya': './src/branches/teatralnaya.pug',
        'branches/voikovskaya': './src/branches/voikovskaya.pug',
    },
    output: {
        path: path.resolve(__dirname, 'dist', ),
        filename: 'js/[name].js'
    },
    plugins: [
        new PugPlugin({
            pretty: true,
            css: {
                filename: 'css/[name].css'
            }
        })
    ],
    mode: 'production',
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
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.css$/,
                use:  'css-loader'
            },
            {
                test: /\.(png|jpg|jpeg|ico|webp)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext][query]'
                }
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/icons/[name][ext][query]'
                }
            }
        ]
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        }
    },
    stats: 'errors-only'
};