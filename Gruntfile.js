'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        lab: {
            files: ['test/app/*.test.js'],
            color: true,
            coverage: true,
            minCoverage: 90,
            parallel: true
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Load the plugin that provides the "lab" task.
    grunt.loadNpmTasks('grunt-lab');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('test', ['lab', 'karma:unit']);
};