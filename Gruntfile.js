/**
 * Gruntfile.js
 * Copyright (c) 2016. Collin Haines.
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
      options: {
        jshintrc: 'client/.jshintrc'
      },

      js: {
        files: {
          src: ['imports/**/*.js', '!imports/library/*.js']
        }
      },

      self: {
        files: {
          src: 'Gruntfile.js'
        }
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
