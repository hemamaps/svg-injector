var webpack = require('webpack');

module.exports = {
    watch: false,
    devtool: 'source-map',
    entry: {
        'js/scripts': [
            './source/demo/demo.ts'
        ],
    },

    resolve: {
        extensions: ['', '.js', '.ts'],
        modulesDirectories: [
            'node_modules',
        ]
    },

    output: {
        path: './demo/assets/',
        filename: '[name].js',
        libraryTarget: 'var'
    },

    externals: {
        'window': 'window',
        'document': 'document'
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components|\.tmp|build)/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        },{
            test: /\.ts?$/,
            loader: 'ts-loader'
        }]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
    ],

    node: {
        console: false
    }
};
