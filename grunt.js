/*global module:false*/
module.exports = function(grunt) {

  // load shell
  grunt.loadNpmTasks('grunt-shell');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        ' * Licensed <%= _.map(pkg.licenses, function(license) { return license.type + " <" + license.url + ">" }).join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:dist/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
      options: '<json:.jshintrc>',
      globals: {}
    },
    uglify: {},
    shell: {
      webmake: {
        command: 'webmake index.js dist/xcssmatrix.js',
        stdout: false
      },
      doc: {
          command: 'makedoc index.js lib/*.js',
          stdout: false
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint test shell:webmake concat min shell:doc');

};
