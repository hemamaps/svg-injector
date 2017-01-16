var webpack = require('webpack');
var webpackConfig = require('../webpack.config');

webpackConfig.devtool = 'eval-source-map';
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['mocha', 'chai', 'sinon', 'fixture'],
        files: [
			'test/**/*.fixture.html',
			'test/**/*.fixture.css',
            'test/**/*.spec.ts',
            {
                pattern: 'source/**/*.ts',
                watched: true,
                included: false,
                served: false
            }
        ],
        preprocessors: {
            'test/**/*.ts': ['webpack', 'sourcemap'],
			'**/*.fixture.html'   : ['html2js'],
			'**/*.json'   : ['json_fixtures']
        },
        webpackMiddleware: {
            noInfo: true
        },
        webpack: webpackConfig,
		jsonFixturesPreprocessor: {
			variableName: '__json__'
		},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
    });
};
