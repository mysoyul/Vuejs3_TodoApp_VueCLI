// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

/*
  브라우저 콘솔에 아래와 같은 오류가 발생하면 webpack 설정을  추가해야 합니다.
  main.js:4 Feature flag __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ is not explicitly defined. 
  You are running the esm-bundler build of Vue, 
  which expects these compile-time feature flags to be globally injected via the bundler config in order 
  to get better tree-shaking in the production bundle.
*/
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Vue CLI is in maintenance mode, and probably won't merge my PR to fix this in their tooling
        // https://github.com/vuejs/vue-cli/pull/7443
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },
})