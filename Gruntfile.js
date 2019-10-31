module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({

  env: {
    dev: {
      mixpanelKey: '6dafb8fe83375b0d33e8abeae5036ac8',
      apiUrl: 'https://morning-tor-82718.herokuapp.com',
      emailUrl: 'https://morning-tor-82718.herokuapp.com/website_submissions'
      // emailUrl: 'https://httpstat.us/400'
    },
    prod: {
      mixpanelKey: '3c4e2180eea88822aa5664dfd53a162d',
      apiUrl: 'https://clasp-subs.herokuapp.com',
      emailUrl: 'https://clasp-subs.herokuapp.com/website_submissions'
    }
  },
  watch: {
    sass: {
      files: 'styles/*.scss',
      tasks: ['sass','cssmin']
    },
    scripts: {
      files: 'scripts/*',
      tasks: ['env:dev', 'loadconst', 'uglify', 'replace', 'move']
    },
    includes: {
      files: ['pages/*','include/*'],
      tasks: ['env:dev', 'loadconst', 'includes' , 'replace', 'move']
    }
  },
  sass: {
      dist:{                       
        options: {
          style: 'expanded'
        },
      files: {
        'styles/style.css' : 'styles/style.scss'
      }
    }
  },
  cssmin: {
    minify: {
      files: {
        'deploy/style.min.css' : 'styles/style.css' 
      }
    }
  },
  uglify: {
     my_target: {
      files: {
        'deploy/script.min.js': 'scripts/*'
      }
    }
  },
  includes: {
    files:{
      cwd: 'pages',
      src: '*.html',
      dest: 'deploy/',
      options: {
        flatten: true,
        includePath: 'include'
      }
    }
  },
  replace: {
    dist: {
      options: {
          patterns: [
            {
              match: 'mixpanelKey',
              replacement: '<%= mixpanelKey %>'
            },
            {
              match: 'apiUrl',
              replacement: '<%= apiUrl %>'
            },
            {
              match: 'emailUrl',
              replacement: '<%= emailUrl %>'
            }
          ]
        },
      files: [
        {expand: true, flatten: true, src: ['deploy/*.html', ], dest: 'tmp/'},
        {expand: true, flatten: true, src: ['deploy/*.min.js', ], dest: 'tmp/'}
      ]
    }
  },
  move: {
    test: {
      src: 'tmp/*',
      dest: 'deploy/'
    }
  }
});

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-move');
  grunt.loadNpmTasks('grunt-env');
  
  grunt.registerTask('loadconst', 'Load constants', function() {
    grunt.config('mixpanelKey', process.env.mixpanelKey);
    grunt.config('apiUrl', process.env.apiUrl);
    grunt.config('emailUrl', process.env.emailUrl);
  });


  grunt.registerTask('build', [
    'env:dev',
    'loadconst',
    'sass',
    'cssmin',
    'uglify',
    'includes',
    'replace',
    'move'
  ]);

  grunt.registerTask('buildprod', [
    'env:prod',
    'loadconst',
    'sass',
    'cssmin',
    'uglify',
    'includes',
    'replace',
    'move'
  ]);

  
  grunt.registerTask('default', ['sass']);

};