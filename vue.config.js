module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/tiny-rick/'
    : '/',

  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/styles/shared.scss";`,
      },
    },
  },

  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
