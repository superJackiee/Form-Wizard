const webpack = require('webpack')
const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_BASE_URL
    : '/',

  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.common.js'
      }
    }
  },
  chainWebpack: config=>{
    config.module.rules.delete('eslint');
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  // outputDir: path.resolve(__dirname, "dist"),
  // assetsDir: "../dist/frontend"
}
  