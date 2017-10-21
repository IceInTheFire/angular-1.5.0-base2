const gulp = require("gulp");
const concat = require("gulp-concat");  //文件合并
const clean = require("gulp-clean");    //清除
/*
 * https://juejin.im/entry/55c8dbb160b22a3ebdf34d57
 * 用法
 * */
const merge = require("merge-stream");
// const rev = require("gulp-rev");        //生成md5文件
const rev = require('./libDev/gulp-rev/index.js');
const revReplace = require("gulp-rev-replace"); //替换.html下的文件
// const revCollector = require('gulp-rev-collectors');  //html替换。js替换
const revCollector = require('./libDev/gulp-rev-collector/index.js');  //html替换。js替换
const less = require("gulp-less");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");   //css前缀
const cleanCSS = require("gulp-clean-css");
const htmlmin = require('gulp-htmlmin');  //html压缩


var apps = ['hello', 'welcome','baseFirst','baseSecond'];


/*
* template打包
* */
gulp.task('clean-template-css', function () {
    return
    gulp.src(['css/app/*/template.min.css','css/app/*/template.css'], {read: false})
        .pipe(clean());
});
gulp.task('build-template-css',['clean-template-css'], function() {
    var tasks = [];
    for(var i in apps) {
        var task = gulp.src(['css/app/'+apps[i]+'/*.less'])
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            // .pipe(cleanCSS())
            .pipe(concat('template.css'))
            .pipe(gulp.dest('css/app/'+apps[i]));
        tasks.push(task);
    }
    return merge.apply(null, tasks);
});
gulp.task('build-template-min-css', ['build-template-css'], function() {
    var tasks = [];
    for(var i in apps) {
        var task = gulp.src(['css/app/'+apps[i]+'/template.css'])
            // .pipe(less())
            // .pipe(autoprefixer({
            //     browsers: ['last 2 versions'],
            //     cascade: false
            // }))
            .pipe(cleanCSS())
            .pipe(concat('template.min.css'))
            .pipe(gulp.dest('css/app/'+apps[i]));
        tasks.push(task);
    }
    return merge.apply(null, tasks);
});
gulp.task('clean-template-js', function () {
    return gulp.src(['js/app/*/template.min.js', 'js/app/*/template.js'], {read: false})
        .pipe(clean());
});
gulp.task('build-template-js', ['clean-template-js'], function() {
    var tasks = [];
    for(var i in apps) {
        var task = gulp.src(['js/app/'+apps[i]+'/*.js'])
            // .pipe(uglify())
            .pipe(concat('template.js'))
            .pipe(gulp.dest('js/app/'+apps[i]));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});
gulp.task('build-template-min-js', ['build-template-js'], function() {
    var tasks = [];
    for(var i in apps) {
        var task = gulp.src(['js/app/'+apps[i]+'/template.js'])
            .pipe(uglify())
            .pipe(concat('template.min.js'))
            .pipe(gulp.dest('js/app/'+apps[i]));
        tasks.push(task);
    }

    return merge.apply(null, tasks);
});

gulp.task('build-template',['build-template-min-css','build-template-min-js'],function() {
    return;
});


/*
* css打包
* */
gulp.task("build-clean-css", function() {
    // return
    gulp.src(['css/all.min.css','css/node.css','css/lib.css','css/core.css'], {read: false})
        .pipe(clean());
});
gulp.task("build-node-css", function() {
    return gulp.src([
        './node_modules/angular-ui-notification/dist/angular-ui-notification.min.css',
        // './node_modules/video.js/dist/video-js.min.css',
        // './node_modules/cropper/dist/cropper.min.css'
    ])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(cleanCSS())
        // .pipe(concat('node.min.css', {newLine: '\r\n'}))//换行
        .pipe(concat('node.css'))
        .pipe(gulp.dest('css'));
});
gulp.task("build-core-css", function() {
    gulp.src([
        'css/*/**.less',
        '!css/app/*/**.less'
    ])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(cleanCSS())
        // .pipe(concat('core.min.css', {newLine: '\r\n'}))//换行
        // .pipe(concat('core.min.css', {newLine: ''}))
        .pipe(concat('core.css'))
        .pipe(gulp.dest('css'));
});
gulp.task("build-lib-css", function() {
    return gulp.src([
        './lib/bootstrap/css/bootstrap.css',
        // './lib/angular-ui-grid/ui-grid.min.css',
        // './lib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
    ])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(cleanCSS())
        // .pipe(concat('lib.min.css', {newLine: '\r\n'}))//换行
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('css'));
});
// gulp.task("build-all-css", ["build-clean-css",'build-core-css','build-node-css','build-lib-css'], function() {
gulp.task("build-all-css", ['build-core-css','build-node-css','build-lib-css'], function() {
    return gulp.src([
        'css/node.css',
        'css/lib.css',
        'css/core.css'
    ])
        .pipe(cleanCSS())
        .pipe(concat('all.min.css', {newLine: '\r\n'}))
        // .pipe(concat('all.min.css'))
        .pipe(gulp.dest('css'));
});

/*
* js打包
* */
gulp.task("build-clean-js", function() {
    // return
    gulp.src(['js/all.min.js','js/node.js','js/lib.js','js/core.js'], {read: false})
        .pipe(clean());
});
gulp.task("build-node-js", function() {
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
    ])
        // .pipe(uglify())
        .pipe(concat('node.js'))
        // .pipe(concat('all.min.css'))
        .pipe(gulp.dest('js'));
});
gulp.task("build-core-js", function(){
    return gulp.src([
        'js/*/**.js', '!js/app/*/**.js',
    ])
        // .pipe(uglify())
        .pipe(concat('core.js'))
        // .pipe(concat('all.min.css'))
        .pipe(gulp.dest('js'));
});
gulp.task("build-lib-js", function() {
    return gulp.src([
        // './lib/bootstrap/js/bootstrap.min.js',
        // './lib/angular-ui-grid/ui-grid.js',
        // './lib/jqueryform/jquery.form.min.js',
        './lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
        // './lib/bootstrap-datetimepicker/sample in bootstrap v3/bootstrap/js/bootstrap.min.js',
        // './lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.fr.js',
        // './lib/angular-sortable-view/angular-sortable-view.js',
        // 'js/**/**.js', '!js/app/**/**.js',
        // '!js/holder/**/**.js',
        // 'js/core/0.js',
        // 'js/holder/app.js',
        // 'js/holder/config.js',
    ])
        // .pipe(uglify())
        .pipe(concat('lib.js'))
        // .pipe(concat('all.min.css'))
        .pipe(gulp.dest('js'));
});
gulp.task("build-all-js", ["build-clean-js",'build-node-js','build-core-js','build-lib-js'], function() {
    return gulp.src([
        'js/node.js',
        'js/lib.js',
        'js/core.js'
    ])
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        // .pipe(concat('all.min.css'))
        .pipe(gulp.dest('js'));
});





gulp.task("clean",["build-clean-js","build-clean-css","clean-template-js","clean-template-css"]);

gulp.task("default",["build-all-js","build-all-css","build-template"]);

gulp.task("build-config", function() {
    return gulp.src('./config/config-build.js')
        .pipe(concat('config.js'))
        .pipe(gulp.dest('js/holder'));
});
gulp.task("build", ["build-config"], function(){
    return gulp.src("app-build/index.html")
        .pipe(gulp.dest('./'));
});


gulp.task("release-config", function() {
    // return
    gulp.src('./config/config-release.js')
        .pipe(concat('config.js'))
        .pipe(gulp.dest('js/holder'));
});
gulp.task("create", ["release-config","build-all-js","build-all-css","build-template"]);
gulp.task('clean-rev',["create"],function() {
    return gulp.src("rev", {read: false})
        .pipe(clean());
});
gulp.task("build-rev",["clean-rev"], function() {
    var bundle1 = gulp.src(['css/all.min.css'])
        .pipe(rev())
        .pipe(gulp.dest('css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));

    var bundle2 = gulp.src(['js/all.min.js'])
        .pipe(rev())
        .pipe(gulp.dest('js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));

    var bundle3 = gulp.src(['css/app/*/template.min.css'])
        .pipe(rev())
        .pipe(gulp.dest('css/module'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/module/css'));

    var bundle4 = gulp.src(['js/app/*/template.min.js'])
        .pipe(rev())
        .pipe(gulp.dest('js/module'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/module/js'));

    return merge(bundle1,bundle2,bundle3,bundle4);
});

gulp.task('rev-replace', ['build-rev'], function(){
    var manifest = gulp.src(['rev/js/rev-manifest.json','rev/css/rev-manifest.json']);
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

    //JS里更新引入文件版本号
    var revCollectorJs = gulp.src(['rev/module/*/*.json', 'js/all.min.js'])
        .pipe(revCollector())
        .pipe(gulp.dest('js'));;

    return merge(bundle, revCollectorJs);
    // return merge(bundle);
});
gulp.task("release", ["rev-replace"], function() {
    // gulp.src("app/index.html")
    //     .pipe(htmlmin(
    //         {
    //             collapseWhitespace: true,    //去掉空格
    //             removeComments:true,    //删除html里的注释
    //             minifyCSS:true,    //压缩html里的style里的css样式
    //             minifyJS:true,    //压缩html里的script里的js代码
    //         }
    //     ))
    //     .pipe(gulp.dest('./'));
});