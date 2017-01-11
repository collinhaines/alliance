/**
 * Gruntfile.js
 * Copyright (c) 2017. Collin Haines.
 * Licensed under MIT (https://github.com/collinhaines/alliance/blob/master/LICENSE)
 */

'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    concurrent: {
      default: {
        options: {
          logConcurrentOutput: true
        },

        tasks: ['watch', 'exec']
      }
    },

    exec: {
      default: {
        command: 'meteor run'
      }
    },

    jshint: {
      default: {
        files: {
          src: ['imports/**/*.js', '!imports/library/*.js']
        },

        options: {
          jshintrc: 'client/.jshintrc'
        },
      }
    },

    watch: {
      default: {
        files: ['imports/**/*.js', '!imports/library/*.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.registerTask('lint', [
    'jshint',
    'lesslint'
  ]);

  grunt.registerTask('dev', 'concurrent');
};
