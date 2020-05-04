// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

var testSettings = require('./testSettings') ;

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-parallel')
        ],
        parallelOptions: {
            executors: testSettings.executors(),
            shardStrategy: 'round-robin'
            // shardStrategy: 'description-length'
        },
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../coverage'),
            reports: ['html', 'lcovonly', 'json'],
            fixWebpackSourcePaths: true,
            thresholds: {
                statements: 100,
                lines: 100,
                branches: 100,
                functions: 100
            }
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadlessCI'],
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--disable-gpu']
            }
        },
        browserNoActivityTimeout: 180000,
        singleRun: true
  });
};