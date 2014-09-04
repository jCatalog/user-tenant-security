// This is the assets controller. Goal is to serve css, js, partials, images, or bower package libs.
module.exports = {
    partials: {
        handler: {
            directory: { path: './public/views/partials' }
        },
        app: {
            name: 'partials'
        }
    },
    images: {
        handler: {
            directory: { path: './public/img' }
        },
        app: {
            name: 'images'
        }
    },
    css: {
        handler: {
            directory: { path: './public/css' }
        },
        app: {
            name: 'css'
        }
    },
    fonts: {
        handler: {
            directory: { path: './public/fonts' }
        },
        app: {
            name: 'fonts'
        }
    },
    js: {
        handler: {
            directory: { path: './public/js' }
        },
        app: {
            name: 'js'
        }
    },
    lib: {
        handler: {
            directory: { path: './public/lib' }
        },
        app: {
            name: 'lib'
        }
    }
}