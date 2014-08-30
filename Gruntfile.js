module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: ['src/js/jquery.js', 'src/js/site.js'],
                dest: 'src/js/global.js',
            }
        },

        uglify: {
            build: {
                src: 'src/js/global.js',
                dest: 'js/global.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    spawn: false,
                },
                files: {
                    'css/global.css': 'src/scss/global.scss'
                }
            } 
        },

        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },

            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);

};