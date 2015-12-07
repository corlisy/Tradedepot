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
            },
            'bootstrap_client-to-bootstrap_clear': {
                expand: true,
                cwd: 'css/bootstrap/less/',
                src: ['**'],
                dest: 'node_modules/bootstrap/less/'
            },
            'bootstrap-client-to-css': {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/css',
                src: '*.css',
                dest: 'css/client/'
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
        },
        sprite: {
            'buttons': {
                'src': ['img/sign_in/*.jpg'],
                'dest': 'img/sprite_signin.jpg',
                'algorithmOpts': {sort: false},
                'destCss': 'img/sign_in/sign_in.css',
                'algorithm': 'left-right',
                //'imgOpts': {quality: 100},
                'engine': 'gmsmith',
                'engineOpts': {
                    timeout: 20000,
                    imagemagick: true
                }

            }
        }
    });


    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-spritesmith');

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
    grunt.registerTask('build-sprite', [
        'sprite:*'
    ]);
};