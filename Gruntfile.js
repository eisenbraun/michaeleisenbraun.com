module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
          // define the files to lint
          files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
          // configure JSHint (documented at http://www.jshint.com/docs/)
          options: {
              // more options here if you want to override JSHint defaults
            globals: {
              jQuery: true,
              console: true,
              module: true
            }
          }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    spawn: false,
                },
                files: {
                    'css/main.css': 'src/scss/app.scss'
                }
            } 
        },

        concat: {
            dist: {
                src: [
                    'src/js/app.js',
                ],
                dest: 'js/main.js'
            },
        },

        /*uglify: {
            dist: { 
                files: { 
                    'js/main.js': 'src/js/app.js'
                }
            }
        },*/

        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint','concat'],
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

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'concat', 'sass', 'watch']);

};