module.exports = function(grunt){

    // Load Plugin
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('connect-livereload');

    // Project Configuration
    grunt.initConfig({
        options: {
          livereload: true  // Enable livereload for HTML changes
        },

        sass: {
            options: {
              // Sass options here
            },
            build: {
              files: {
                'dist/css/styles.css': 'src/scss/styles.scss'
              }
            }
        },

        cssmin: {
            target: {
                files: {
                'dist/css/styles.min.css': ['dist/css/styles.css']  // Assuming Autoprefixer output
                }
            }
        },

        uglify: {
            options: {
                // Uglify options here
            },
            build: {
                src: 'src/js/*.js',
                dest: 'dist/js/scripts.min.js'
            }
        },

        watch: {
            scripts: {
              files: ['src/js/*.js'],
              tasks: ['uglify']
            },
            styles: {
              files: ['src/scss/**/*.scss'],
              tasks: ['sass', 'cssmin']
            },
            html: {
              files: ['src/*.html'],
              tasks: ['copy:html'],  // No tasks specified, as we only want to trigger reload       
            }
        },

        image: {
            static: {
              options: {
                optipng: false,
                pngquant: true,
                zopflipng: true,
                jpegRecompress: false,
                mozjpeg: true,
                gifsicle: true,
                svgo: true
              },
              files: {
                'dist/images/image.jpeg': 'src/images/image.jpeg',
              }
            },
            dynamic: {
              files: [{
                expand: true,
                cwd: 'src/images',
                src: ['**/*.{png,jpg,gif,svg,jpeg}'],
                dest: 'dist/images'
              }]
            }
        },

        copy: {
            fonts: {
              expand: true,
              cwd: 'src/fonts',
              src: ['**/*'],
              dest: 'dist/fonts'
            },
            html:{
              expand: true,
              cwd: 'src/',
              src: ['*.html'],
              dest: 'dist/',
              tasks: ['copy:html'],
              options: {
                livereload: true  // Enable livereload for HTML changes
              }
            }
        },

    })

    // Default
    grunt.registerTask('default', ['sass','cssmin','uglify','copy','watch']);
}