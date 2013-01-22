module.exports = function(grunt) {

  var path       = require('path')
    , publicDir  = '../../../public/'
    , scriptsDir = '../scripts/'
    , stylesDir  = '../styles/';

  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-jst');

  grunt.initConfig({

    // Growl Notifications
    growl: {
      start: {
        title: 'Grunt',
        message: 'Build Started'
      },
      success: {
        title: 'Grunt',
        message: 'Build Successful'
      }
    },

    // Pre-proccessors
    compass: {
      sass: {
        src: stylesDir,
        dest: stylesDir + 'build',
        config: stylesDir + 'config.rb'
      }
    },

    coffee: {
      cs: {
        src: [
          scriptsDir + 'lib/**/*.coffee',
          scriptsDir + 'build/amd.coffee',
          scriptsDir + 'app.coffee'
        ],
        dest: scriptsDir + 'build',
        options: {
          bare: true
        }
      }
    },

    // JavaScript Template Complation
    jst: {
      compile: {
        options: {
          namespace: 'JST',
          templateSettings: {
            interpolate : /\{\{([\s\S]+?)\}\}/g,
            escape      : /\{\{\{([\s\S]+?)\}\}\}/g
          },
          processName: function(filename) {
            return filename.replace('../scripts/templates/', '').replace(path.extname(filename), '');
          }
        },
        files: {'../scripts/build/templates.js': [scriptsDir + 'templates/**/*.ms']}
      }
    },

    // Concatanation and Minification
    concat: {
      css: {
        src: [
          stylesDir + 'vendor/reset.css',
          stylesDir + 'build/app.css'
        ],
        dest: publicDir + 'css/all.css'
      },

      cs: {
        src: [scriptsDir + 'amd/**/*.coffee'],
        dest: scriptsDir + 'build/amd.coffee'
      },

      js: {
        src: [
          scriptsDir + 'vendor/components/jquery/jquery.js',
          scriptsDir + 'vendor/components/jquery.cookie/jquery.cookie.js',
          scriptsDir + 'vendor/components/modernizr/modernizr.js',
          scriptsDir + 'vendor/components/hammer/hammer.js',
          scriptsDir + 'lib/InfiniteSlider.js',
          scriptsDir + 'vendor/fitvids.js',
          scriptsDir + 'build/app.js'
        ],
        dest: publicDir + 'js/all.js'
      }
    },

    cssmin: {
      css: {
        src: [publicDir + 'css/all.css'],
        dest: publicDir + 'css/all.min.css'
      }
    },

    min: {
      js: {
        src: [publicDir + 'js//all.js'],
        dest: publicDir + 'js/all.min.js'
      }
    },

    // Watch Process
    watch: {
      grunt: {
        files: ['grunt.js'],
        tasks: 'growl:start compass:sass concat:css cssmin:css concat:cs coffee:cs jst concat:js min:js growl:success'
      },

      js: {
        files: [scriptsDir + '**/*.js'],
        tasks: 'growl:start concat:js min:js growl:success'
      },

      coffee: {
        files: [scriptsDir + '**/*.coffee'],
        tasks: 'growl:start concat:cs coffee:cs concat:js min:js growl:success'
      },

      css: {
        files: [stylesDir + '**/*.css'],
        tasks: 'growl:start concat:css cssmin:css growl:success'
      },

      sass: {
        files: [stylesDir + '**/*.scss', stylesDir + 'config.rb'],
        tasks: 'growl:start compass:sass concat:css cssmin:css growl:success'
      },

      jst: {
        files: [scriptsDir + '**/*.ms'],
        tasks: 'growl:start jst concat:js min:js growl:success'
      }
    }

  });

  grunt.registerTask('default', 'growl:start compass:sass concat:css cssmin:css concat:cs coffee:cs jst concat:js min:js growl:success');

};
