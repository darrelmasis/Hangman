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

// Contiene las rutas de los archivos y el destino
const path = {
  styles: {
    src: './dev/scss/styles.scss',
    dest: './dist/css/'
  },
  scripts: {
    src: './src/js/index.js',
    dest: './dist/js/'
  }
}

// Compila Sass minificado
const styles = done => {
  gulp.src(path.styles.src)
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(postcss([autoprefixer()]))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.styles.dest))
  .pipe(server.stream())
  done()
}

// Compila Javascripts para producción
const scripts = done => {
  browserify(path.scripts.src)
    .transform(babelify, {
      global: true
    })
    .bundle()
    .on('error', function (err) {
      console.log(err)
      this.emit('end')
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(minify({
      ext: {
        src: '-bundle.js',
        min: '-min.js'
      }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.scripts.dest))
    done()
}

const serverUp = done => {
  server.init({
    server: {
      baseDir: './'
    },
    open: false
  })
  gulp.watch(path.styles.src, styles, server.reload)
  gulp.watch(path.scripts.src, scripts, server.reload)
  gulp.watch('./*.html').on('change', server.reload)
  done()
}

gulp.task('default', serverUp)

