const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const ENV = process.env.NODE_ENV;
const name = process.env.APPNAME;
const VUE_APP_MAIN_SHARE_HOST = process.env.VUE_APP_MAIN_SHARE_HOST;

const path = require("path");
const cdnBaseUrl = process.env.VUE_APP_OSS_DOMAIN;
const externalConfig = [
  {
    name: "vue",
    scope: "Vue",
    usePrefetch: false,
    js: cdnBaseUrl + "/designer/plugin/vue/3.3.4/vue.global.js",
  },
  {
    name: "vue-router",
    scope: "VueRouter",
    usePrefetch: false,
    js: cdnBaseUrl + "/designer/plugin/vue-router/4.2.5/vue-router.global.js",
  },
  {
    name: "element-plus",
    scope: "ElementPlus",
    usePrefetch: false,
    js: cdnBaseUrl + "/designer/plugin/element-plus/2.4.0/index.full.js",
    // js: cdnBaseUrl + "/designer/plugin/element-plus/2.4.0/index.full.min.js",
  },
];
console.log("🚀 - APPNAME:", process.env.APPNAME);
// 子应用访问的绝对路径
const publicPath = process.env.VUE_APP_SUB_APP_NAME_ADDRESS;
const REPORT = process.env.REPORT;

module.exports = defineConfig({
  transpileDependencies: ["common"],
  publicPath,
  configureWebpack: (config) => {
    if (!["production", "prod"].includes(ENV)) {
      // 非生产环境下开启缓存
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
      };
    } else {
      // 生产环境
      // CDN配置
      const externals = {};
      externalConfig.forEach((item) => (externals[item.name] = item.scope));
      config.externals = externals;
    }
    Object.assign(config.output, {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    });
    config.plugins.push(
      ...(REPORT ? [new BundleAnalyzerPlugin()] : []), // 使用默认配置
      new ModuleFederationPlugin({
        name: "subapp-foo",
        filename: "remote.js",
        remotes: {
          main_share: `main_share@${VUE_APP_MAIN_SHARE_HOST}/static/js/remoteEntry.js`,
        },
        // shared: [],
      })
    );
  },
  chainWebpack(config) {
    config
      .plugin("html")
      .tap((args) => {
        //  如果是开发环境则不载入cdn
        args[0].cdnConfig = externalConfig;
        args[0].cdnBaseUrl = cdnBaseUrl;
        return args;
      })
      .end();
    config.resolve.symlinks(false);
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
