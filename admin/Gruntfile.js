module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        watch: {
            files: ["build/*.less"],
            tasks: ["less"]
        },
        less: {
            development: {
                options: {
                    compress: true
                },
                files: {
                    "css/main.css": "build/admin.less"
                }
            }
        }
    });

    // LESS Compiler
    grunt.loadNpmTasks('grunt-contrib-less');
    // Watch File Changes
    grunt.loadNpmTasks('grunt-contrib-watch');
    // The default task (running "grunt" in console) is "watch"
    grunt.registerTask('default', ['watch']);

};