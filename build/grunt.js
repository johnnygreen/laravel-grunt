module.exports = function(grunt) {

  var path = require('path');

  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-jst');

  grunt.initConfig({
    growl: {
      start: {
        title: 'Grunt',
        message: 'Build Started'
      },
      done: {
        title: 'Grunt',
        message: 'Build Successful'
      }
    },

    compass: {
      all: {
        src:  '../sass',
        dest: '../css'
      }
    },

    coffee: {
      all: {
        src: ['../coffee/**/*.coffee'],
        dest: '../js',
        options: {bare: true}
      }
    },

    concat: {
      css: {
        src: ['../css/app.css'],
        dest: '../../public/css/all.css'
      },

      js: {
        // These need to be in the right order
        src: [
          '../js/vendor/components/jquery/jquery.js',
          '../js/vendor/components/lodash/lodash.js',
          '../js/vendor/components/backbone/backbone.js',
          '../js/templates.js',
          '../js/app.js'
        ],
        dest: '../../public/js/all.js'
      }
    },

    cssmin: {
      all: {
        src: ['../../public/css/all.css'],
        dest: '../../public/css/all.min.css'
      }
    },

    min: {
      all: {
        src: ['../../public/js/all.js'],
        dest: '../../public/js/all.min.js'
      }
    },

    jst: {
      compile: {
        options: {
          namespace: 'JST',
          templateSettings: {interpolate : /\{\{(.+?)\}\}/g},
          processName: function(filename) { return path.basename(filename, '.mustache'); }
        },
        files: {'../js/templates.js': ['../templates/**/*.mustache']}
      }
    },

    watch: {
      app: {
        files: ['../sass/**/*.scss', '../coffee/**/*.coffee', '../templates/**/*.mustache'], //'../css/**/*.css' '../js/**/*.js'
        tasks:  'growl:start compass:all coffee:all jst concat cssmin:all min:all growl:done'
      }
    }
  });

  grunt.registerTask('default', 'growl:start compass:all coffee:all jst concat cssmin:all min:all growl:done');

};
