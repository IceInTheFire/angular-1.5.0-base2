const gulp = require("gulp");
const concat = require("gulp-concat");  //文件合并
const clean = require("gulp-clean");    //清除
/*
 * https://juejin.im/entry/55c8dbb160b22a3ebdf34d57
 * 用法
 * */
const merge = require("merge-stream");
const rev = require("gulp-rev");        //生成md5文件
const revReplace = require("gulp-rev-replace"); //替换.html下的文件
const less = require("gulp-less");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");   //css前缀
const cleanCSS = require("gulp-clean-css");
const htmlmin = require('gulp-htmlmin');  //html压缩


var apps = ['hello', 'welcome','baseFirst','baseSecond'];

gulp.task('build-clean-template-js', function () {
    return gulp.src('js/app/**/template.min.js', {read: false})
        .pipe(clean());
});
gulp.task('build-template-js', ['build-clean-template-js'], function() {
    var tasks = [];
    for(var i in apps) {
        var task = gulp.src(['js/app/'+apps[i]+'/*.js'])
            .pipe(uglify())
            .pipe(concat('template.min.js'))
            .pipe(gulp.dest('js/app/'+apps[i]));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});
gulp.task('build-clean-template-css', function () {
    return gulp.src('css/app/**/template.min.css', {read: false})
        .pipe(clean());
});
gulp.task('build-template-css', ['build-clean-template-css'], function() {
    var tasks = [];
    for(var i in apps) {
        var task = gulp.src(['css/app/'+apps[i]+'/*.less'])
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cleanCSS())
            .pipe(concat('template.min.css'))
            .pipe(gulp.dest('css/app/'+apps[i]));
        tasks.push(task);
    }
    return merge.apply(null, tasks);
});
gulp.task('build-template', ['build-template-css','build-template-js'],function(){
    console.log("template   over");
});


gulp.task("build-clean-css", function() {
    return gulp.src('css/all.min.css', {read: false})
        .pipe(clean());
});
gulp.task("build-core-less", function() {
    gulp.src(['css/**/**.less','!css/app/**/**.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('css'));
});
gulp.task("build-css", ["build-clean-css",'build-core-less'], function() {
    return gulp.src([
        // './node_modules/angular-ui-notification/dist/angular-ui-notification.min.css',
        // './node_modules/video.js/dist/video-js.min.css',
        // './node_modules/cropper/dist/cropper.min.css'


        './lib/bootstrap/css/bootstrap.css',
        // './lib/angular-ui-grid/ui-grid.min.css',
        // './lib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
        './css/all.min.css',
    ])
        .pipe(cleanCSS())
        .pipe(concat('all.min.css', {newLine: '\r\n'}))
        // .pipe(concat('all.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task("build-clean-js", function() {
    return gulp.src('js/all.min.js', {read: false})
        .pipe(clean());
});
gulp.task("build-js", ["build-clean-js"], function() {
    return gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/jquery/dist/jquery.min.js',

        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        // './node_modules/angular-route/angular-route.min.js',
        './node_modules/oclazyload/dist/ocLazyLoad.min.js',
        // './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        // './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        // './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.js',
        // './node_modules/angular-sortable-view/src/angular-sortable-view.min.js',
        './node_modules/angular-ui-notification/dist/angular-ui-notification.min.js',
        // './node_modules/video.js/dist/video.min.js',
        // './node_modules/flv.js/dist/flv.min.js',
        // './node_modules/cropper/dist/cropper.min.js',
        //
        // './lib/bootstrap/js/bootstrap.min.js',
        // './lib/angular-ui-grid/ui-grid.js',
        // './lib/jqueryform/jquery.form.min.js',
        // './lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
        // './lib/bootstrap-datetimepicker/sample in bootstrap v3/bootstrap/js/bootstrap.min.js',
        // './lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.fr.js',
        // './lib/angular-sortable-view/angular-sortable-view.js',
        'js/**/**.js', '!js/app/**/**.js',
        // '!js/holder/**/**.js',
        // 'js/core/0.js',
        // 'js/holder/app.js',
        // 'js/holder/config.js',
    ])
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        // .pipe(concat('all.min.css'))
        .pipe(gulp.dest('js'));
});


gulp.task("build-rev", ['clean-md5'],  function() {
    var bundle1 = gulp.src(['css/all.min.css'])
        .pipe(rev())
        .pipe(gulp.dest('css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('css'));

    var bundle2 = gulp.src(['js/all.min.js'])
        .pipe(rev())
        .pipe(gulp.dest('js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('js'));

    var bundle3 = gulp.src(['css/app/**/template.css'])
        .pipe(rev())
        .pipe(gulp.dest('css/module'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('module/css'));

    var bundle4 = gulp.src(['js/app/**/template.js'])
        .pipe(rev())
        .pipe(gulp.dest('js/module'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('module/js'));

    return merge(bundle1,bundle2,bundle3,bundle4);
});

gulp.task('rev-replace', ['build-rev'], function(){
    var manifest = gulp.src(['js/rev-manifest.json','css/rev-manifest.json']);
    var bundle = gulp.src(['app/index.html'])
        .pipe(htmlmin(
            {
                collapseWhitespace: true,    //去掉空格
                removeComments:true,    //删除html里的注释
                minifyCSS:true,    //压缩html里的style里的css样式
                minifyJS:true,    //压缩html里的script里的js代码
            }
        ))
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('./'));

    return merge(bundle);
});

gulp.task('clean-md5',function() {
    return gulp.src(['js/all-*.min.js','js/app/**/template-*.js','css/app/**/template-*.css','css/all-*.min.css','js/rev-manifest.json','css/rev-manifest.json','css/module','js/module'], {read: false})
        .pipe(clean());
})

gulp.task("default",['clean-md5','build-js','build-css','build-template'],function() {
    gulp.src("app/index.html")
        .pipe(htmlmin(
            {
                collapseWhitespace: true,    //去掉空格
                removeComments:true,    //删除html里的注释
                minifyCSS:true,    //压缩html里的style里的css样式
                minifyJS:true,    //压缩html里的script里的js代码
            }
        ))
        .pipe(gulp.dest('./'));
});

gulp.task("release", ['rev-replace']);