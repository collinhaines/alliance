/*!
 * alliance
 *
 * Copyright 2016 Collin Haines
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %>\n' +
            ' *\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license.\n' +
            ' */\n',

    // Tasks
    jshint: {
      files: ['Gruntfile.js', 'client/js/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    lesslint: {
      src: ['client/less/*.less'],
      options: {
        imports: ['client/less/**/*.import.less'],
        csslint: {
          csslintrc: 'client/less/.csslintrc'
        },
        failOnError: false
      }
    },
    usebanner: {
      taskName: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: ['Gruntfile.js', 'client/js/*.js']
        }
      }
    },

    // Watch
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['watch:LESS', 'watch:JavaScript', 'exec:meteor-start']
      }
    },

    watch: {
      LESS: {
        files: 'client/less/**/*.import.less',
        tasks: ['lesslint']
      },
      JavaScript: {
        files: 'client/js/*.js',
        tasks: ['jshint']
      }
    },

    exec: {
      'meteor-start': {
        command: 'meteor run'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-banner');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('lint', ['jshint', 'lesslint']);
  grunt.registerTask('dev', ['concurrent:dev']);
};
