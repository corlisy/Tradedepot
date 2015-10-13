module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            'bootstrap_custom-to-bootstrap_clear': {
                expand: true,
                cwd: 'bootstrap/less/',
                src: ['**'],
                dest: 'node_modules/bootstrap/less/'
            },
            'bootstrap-to-css': {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/css',
                src: '*.css',
                dest: 'css/'
            }
        },
        exec: {
            'bootstrap-build': {
                cmd: 'grunt dist',
                cwd: 'node_modules/bootstrap/'
            },
            'admin-build': {
                cmd: 'grunt',
                cwd: 'admin/'
            }
        }
    });


    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build-bootstrap', [
        'copy:bootstrap_custom-to-bootstrap_clear',
        'exec:bootstrap-build',
        'copy:bootstrap-to-css'
    ]);

    grunt.registerTask('default', [
        'build-bootstrap'
    ]);
    grunt.registerTask('admin', [
        'exec:admin-build'
    ]);
};