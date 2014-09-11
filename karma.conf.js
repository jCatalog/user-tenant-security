'use strict';

/**
 * Module dependencies.
 */

// Karma configuration
module.exports = function(config) {
    config.set({
        // Frameworks to use
        frameworks: ['jasmine'],

        // List of files / patterns to load in the browser
        files: [
            'test/web/**/*js'
        ],

        // Test results reporter to use
        // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        //reporters: ['progress'],
        reporters: ['progress'],

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // Possible values: settings.LOG_DISABLE || settings.LOG_ERROR || settings.LOG_WARN || settings.LOG_INFO || settings.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing test whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // If true, it capture browsers, run test and exit
        singleRun: true
    });
};