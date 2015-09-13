module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'expand',
          sourceMap: false,
          sourceComments: true
        },
        files: {
          'css/app.css': 'src/scss/app.scss'
        }
      }
    },
    
    concat: {
        dist: {
            files: {
                'js/app.js': [
                    'src/js/app.js'
                ]
            }
        }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      },
      
      js: {
          files: 'src/js/**/*.js',
          tasks: ['concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','concat','watch']);
}
