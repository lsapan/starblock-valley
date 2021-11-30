const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    configureWebpack: {
        plugins: (process.env.NODE_ENV === 'production' ? [
            new CompressionPlugin(),
        ] : []),
    },

    chainWebpack: (config) => {
        config.module.rule('eslint').use('eslint-loader').options({
            fix: true,
        })
    },
}
