/**
 * Project Name
 * ========================================================================
 * Gruntfile.js
 * @version   2.0 | April 28th 2013
 * @author    Beau Charman | @beaucharman | http://www.beaucharman.me
 * @link      https://github.com/beaucharman/grunt-project-kickstarter
 * @license   MIT license
 *
 * Installation
 *
 * First time instructions, uinstall Grunt globally:
 * npm uninstall -g grunt
 *
 * Then install the Grunt CLI globally:
 * npm install -g grunt-cli
 *
 * Each time a new project is started, local to the project; run:
 * npm install grunt --save-dev
 *
 * Plus install the appropriate package for each required task,
 * and uncomment the related task loader in the Load Tasks section of this file
 *
 * Further instructions: http://gruntjs.com/getting-started
 * ======================================================================== */

module.exports = function(grunt) {
  'use strict';

  /* ========================================================================
     Init configuration
     ======================================================================== */
  grunt.initConfig({

    /**
     * Package file
     * ========================================================================
     * All variable, dependency and version information for the project.
     * ======================================================================== */
    pkg: grunt.file.readJSON("package.json"),

    /**
     * Sass
     * ========================================================================
     * npm install grunt-contrib-sass --save-dev
     * https://github.com/gruntjs/grunt-contrib-sass
     * If utilising Compass, simply point to your
     * config.rb file via sass.method.options.compass:
     * ======================================================================== */
    sass:
    {
      development:
      {
        files:
        {
          "<%= pkg.path.dev %>/<%= pkg.path.lib.css %>/main.css":
            "<%= pkg.path.src.sass %>/main.scss"

          // For WordPress installations:
          //"<%= pkg.path.dev %>/style.css":
          //  "<%= pkg.path.src.sass %>/main.scss"
        },
        options:
        {
          style: "expanded",
          lineNumbers: true
        }
      },
      deploy:
      {
        files:
        {
          "<%= pkg.path.deploy %>/<%= pkg.path.lib.css %>/main.css" :
            "<%= pkg.path.src.sass %>/main.scss"

          // For WordPress installations:
          //"<%= pkg.path.deploy %>/style.css":
          //  "<%= pkg.path.src.sass %>/main.scss"
        },
        options:
        {
          style: "compressed",
          lineNumbers: false
        }
      }
    },

    /**
     * cssLint
     * ========================================================================
     * npm install grunt-contrib-csslint --save-dev
     * https://github.com/gruntjs/grunt-contrib-csslint
     * ======================================================================== */
    csslint:
    {
      all:
      {
        src:
        [
          "<%= pkg.path.dev %>/<%= pkg.path.lib.css %>/main.css"

          // For WordPress installations:
          //"<%= pkg.path.dev %>/style.css":
        ]
      }
    },

    /**
     * Coffee
     * ========================================================================
     * npm install grunt-contrib-coffee --save-dev
     * https://github.com/gruntjs/grunt-contrib-coffee
     * ======================================================================== */
    coffee:
    {
      deploy:
      {
        compile:
        {
          files:
          {
            "<%= pkg.path.dev %>/<%= pkg.path.lib.js %>/main.js" :
              "<%= pkg.path.src.coffee %>/main.coffee"
          }
        }
      }
    },

    /**
     * Concat
     * ========================================================================
     * npm install grunt-contrib-concat --save-dev
     * https://github.com/gruntjs/grunt-contrib-concat
     * ======================================================================== */
    concat:
    {
      deploy:
      {
        src:
        [
          "<%= pkg.path.dev %>/<%= pkg.path.lib.js %>/plugins.js",
          "<%= pkg.path.dev %>/<%= pkg.path.lib.js %>/main.js"
        ],
        dest: "<%= pkg.path.deploy %>/<%= pkg.path.lib.js %>/main.js"
      }
    },

    /**
     * Uglify
     * ========================================================================
     * npm install grunt-contrib-uglify --save-dev
     * https://github.com/gruntjs/grunt-contrib-uglify
     * ======================================================================== */
    uglify:
    {
      deploy:
      {
        options:
        {
          mangle: false
        },
        files:
        {
          "<%= pkg.path.deploy %>/<%= pkg.path.lib.js %>/main.js" :
          [
            "<%= pkg.path.dev %>/<%= pkg.path.lib.js %>/plugins.js",
            "<%= pkg.path.dev %>/<%= pkg.path.lib.js %>/main.js"
          ]
        }
      }
    },

    /**
     * jsHint
     * ========================================================================
     * npm install grunt-contrib-jshint --save-dev
     * https://github.com/gruntjs/grunt-contrib-jshint
     * ======================================================================== */
    jshint:
    {
      all:
      [
        "<%= pkg.path.dev %>/<%= pkg.path.lib.js %>/plugins.js",
        "<%= pkg.path.dev %>/<%= pkg.path.lib.js %>/main.js"
      ]
    },

    /**
     * Jade
     * ========================================================================
     * npm install grunt-contrib-jade --save-dev
     * https://github.com/gruntjs/grunt-contrib-jade
     * ======================================================================== */
    jade: {
      development: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: {
          "<%= pkg.path.development %>/index.html": ["<%= pkg.path.src.jade %>/index.jade"]
        }
      },
      deploy: {
        options: {
          data: {
            debug: false
          },
          pretty: false
        },
        files: {
          "<%= pkg.path.deploy %>/index.html": ["<%= pkg.path.src.jade %>/index.jade"]
        }
      }
    },

    /**
     * Jekyll
     * ========================================================================
     * npm install grunt-jekyll --save-dev
     * https://github.com/dannygarcia/grunt-jekyll
     * Requires Jekyll >= v1.0.0
     * ======================================================================== */
    jekyll:
    {
      server:
      {
        src:         "<%= pkg.path.development %>",
        dest:        "<%= pkg.path.public %>",
        auto:        false,
        server:      true,
        server_port: 4000,
        pygments:    true,
        config:      "_config.yml"
      },
      development:
      {
        src:        "<%= pkg.path.dev %>",
        dest:        "<%= pkg.path.public %>",
        pygments:    true,
        config:      "_config.yml"
      },
      deploy:
      {
        src:        "<%= pkg.path.dev %>",
        dest:        "<%= pkg.path.deploy %>",
        pygments:    true,
        config:      "_config.yml"
      }
    },

    /**
     * Clean
     * ========================================================================
     * npm install grunt-contrib-clean --save-dev
     * https://github.com/gruntjs/grunt-contrib-clean
     * ======================================================================== */
    clean:
    {
      deploy: ["<%= pkg.path.deploy %>/"],
      wordpress: ["<%= pkg.path.enviro %>"],
      jsDeploy: ["<%= pkg.path.deploy %>/<%= pkg.path.lib.js %>/"]
    },

    /**
     * Copy
     * ========================================================================
     * npm install grunt-contrib-copy --save-dev
     * https://github.com/gruntjs/grunt-contrib-copy
     * For WordPress theme development, use:
     * copy.build.files.dest:"<%= pkg.path.enviro %>"
     * ======================================================================== */
    copy:
    {
      build:
      {
        files:
        [
          {
            expand: true,
            cwd:    "<%= pkg.path.dev %>/",
            src:    ["**", "!**.DS_Store", ".gitignore"],
            dest:   "<%= pkg.path.enviro %>/",
            dot:    true
          }
        ]
      },
      deploy:
      {
        files:
        [
          {
            expand: true,
            cwd:    "<%= pkg.path.dev %>/",
            src:    ["**", "!**.DS_Store", ".gitignore"],
            dest:   "<%= pkg.path.deploy %>/",
            dot:    true
          }
        ]
      },
      testDeploy:
      {
        files:
        [
          {
            expand: true,
            cwd:    "<%= pkg.path.deploy %>/",
            src:    ["**", "!**.DS_Store", ".gitignore"],
            dest:   "<%= pkg.path.enviro %>/",
            dot:    true
          }
        ]
      }
    },

    /**
     * Text Replace
     * ========================================================================
     * npm install grunt-text-replace --save-dev
     * https://github.com/yoniholmes/grunt-text-replace
     * ======================================================================== */
    replace:
    {
      deploy:
      {
        src:  ["<%= pkg.path.dev %>/filename.html"],
        dest: "<%= pkg.path.deploy %>/filename.html",
        replacements:
        [
          {
            from: "original text",
            to:   "replacement text"
          }
        ]
      }
    },

    /**
     * Smushit
     * ========================================================================
     * npm install grunt-smushit
     * https://github.com/heldr/grunt-smushit
     * ======================================================================== */
    smushit:
    {
      deploy:
      {
        src:
        [
          '<%= pkg.path.dev %>/**/*.jpg',
          '<%= pkg.path.dev %>/**/*.png'
        ]
      }
    },

    /**
     * Watch
     * ========================================================================
     * npm install grunt-contrib-watch --save-dev
     * https://github.com/gruntjs/grunt-contrib-watch
     * ======================================================================== */
    watch:
    {
      sass:
      {
        files: ["<%= pkg.path.src.sass %>/**"],
        tasks: ["sass:development"],
        options:
        {
          nospawn: true
        }
      },
      // used with event listener
      event:
      {
        files: ["<%= pkg.path.dev %>/**"],
        tasks: ["copy:changed"],
        options:
        {
          nospawn: true
        }
      }
    },

    /**
     * Regarde
     * ========================================================================
     * Watch task alternative.
     * npm install grunt-regarde --save-dev
     * https://github.com/yeoman/grunt-regarde
     * ======================================================================== */
    regarde:
    {
      sass:
      {
        files:  "<%= pkg.path.src.sass %>/**",
        tasks:  ["sass:development"],
        events: true
      }
    }

  });

  /** Dynamic Watch task
   * ========================================================================
   * To be used with Contrib Watch Task, this event function
   * will capture the actual file changed and run run the task
   * on it, rather then the entire watched folder.
   * ======================================================================== */
  grunt.event.on("watch", function (event, file) {
    var pkg = grunt.file.readJSON("package.json");
    var cwd = pkg.path.dev + "/";
    var filepath = file.replace(cwd, "");
    grunt.config.set("copy",
    {
      changed:
      {
        expand: true,
        cwd:    cwd,
        src:    filepath,
        dest:   '<%= pkg.path.enviro %>'
      }
    });

    /* May need to use this instead of grunt.watch.event.tasks:copy:changed */
    // return grunt.task.run("copy:changed");
  });

  /* ========================================================================
     Load Tasks
     ======================================================================== */
  //grunt.loadNpmTasks("grunt-contrib-sass");
  //grunt.loadNpmTasks("grunt-contrib-csslint");
  //grunt.loadNpmTasks("grunt-contrib-coffee");
  //grunt.loadNpmTasks("grunt-contrib-concat");
  //grunt.loadNpmTasks("grunt-contrib-uglify");
  //grunt.loadNpmTasks("grunt-contrib-jshint");
  //grunt.loadNpmTasks("grunt-jekyll");
  //grunt.loadNpmTasks("grunt-contrib-jade");
  //grunt.loadNpmTasks("grunt-contrib-clean");
  //grunt.loadNpmTasks("grunt-contrib-copy");
  //grunt.loadNpmTasks("grunt-text-replace");
  //grunt.loadNpmTasks("grunt-smushit");
  //grunt.loadNpmTasks("grunt-contrib-watch");
  //grunt.loadNpmTasks("grunt-regarde");

  /* ========================================================================
     Register custom tasks aliases
     ======================================================================== */

  /**
   * The default Grunt task
   * ========================================================================
   * Tasks to run simply with the command `grunt`
   */
  grunt.registerTask("default", ["sass:development"]);

  /**
   * Watch Sass
   * ========================================================================
   * Simply watch for Sass changes, and process
   */
  grunt.registerTask("watchSass", ["watch:sass"]);

  /**
   * Build
   * ========================================================================
   * Run preprocessing and copy files
   */
  grunt.registerTask("build", ["sass:development", "copy:build"]);

  /**
   * Deploy
   * ========================================================================
   * Run preprocessing, concatenate, minify and copy files for deploment
   */
  grunt.registerTask("deploy", [
    "clean:deploy", "copy:deploy", "clean:jsDeploy", "uglify:deploy", "sass:deploy"
  ]);

  /**
   * WordPress Deploy
   * ========================================================================
   * Run preprocessing, concatenate, minify and copy files.
   * Also change any development mode options in template files to be
   * ready for deployment.
   */
  //grunt.registerTask("deploy", [
  //  "clean:deploy", "copy:deploy", "clean:js_deploy", "uglify:deploy", "sass:deploy", "replace:deploy"
  //]);

  /* Test deployment files */
  grunt.registerTask("testDeploy", ["copy:testDeploy"]);

};
