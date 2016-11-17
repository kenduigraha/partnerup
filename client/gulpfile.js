const gulp = require('gulp')
const browserSync = require('browser-sync');


gulp.task("default", function(){
  browserSync.init({
    server:{
      baseDir: "./"
    },
    port: 8080
  })

  gulp.watch("script/*.js").on("change", browserSync.reload)
  gulp.watch("*.html").on("change", browserSync.reload)
})
