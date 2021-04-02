import gulp from 'gulp'
import minify from 'gulp-minify'
import postcss from 'gulp-postcss'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import babelify from 'babelify'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import autoprefixer from 'autoprefixer'
import browsersync from 'browser-sync'

const server = browsersync.create()

const serverUp = done => {
  server.init({
    server: {
      baseDir: './'
    },
    open: false
  })
  gulp.watch('./*.html').on('change', server.reload)
  done()
}

gulp.task('default', serverUp)

