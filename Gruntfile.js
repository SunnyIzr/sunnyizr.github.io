module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  
  watch: {
    sass: {
      files: 'styles/*.scss',
      tasks: ['sass','cssmin']
    },
    scripts: {
      files: 'scripts/*',
      tasks: ['uglify']
    },
    includes: {
      files: ['pages/*','include/*'],
      tasks: ['includes']
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
  }
});

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-includes');
  
  grunt.registerTask('build', [
    'sass',
    'cssmin',
    'uglify',
    'includes'
    ]);
  
  grunt.registerTask('default', ['sass']);

};