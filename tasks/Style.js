const { src, dest } = require("gulp");
const { paths } = require("./helpers/PathHelper");
// Preprocessor
const scss = require("gulp-sass")(require("sass"));
// PostCSS
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const purge = require("postcss-purgecss");
// Gulp plugins
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const sourcemap = require("gulp-sourcemaps");
const identifyMap = require("@gulp-sourcemaps/identity-map");
// Browser-sync
// const browserSync = require("browser-sync").create();

let styles = () => {
    return src(paths.styles.src)
        .pipe(sourcemap.init())
        .pipe(identifyMap())
        .pipe(scss())
        .pipe(postcss([autoprefixer()]))
        .pipe(cleancss())
        .pipe(concat(paths.cssOutputName))
        .pipe(sourcemap.write("./maps"))
        .pipe(dest(paths.styles.dest));
    // .pipe(browserSync.stream());
};

let unusable = () => {
    return src(`${paths.styles.dest}/app.min.css`)
        .pipe(postcss([purge({ content: ["src/index.html"] })]))
        .pipe(dest("src/css/"));
};

exports.unusable = unusable;
exports.styles = styles;
