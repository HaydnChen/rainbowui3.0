function MyPlugin (options) {
    this.options = options;
}

MyPlugin.prototype.apply = function (compiler) {
    let env = this.options.env;
    let config = this.options.config;

    compiler.plugin('compilation', function (compilation, options) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
            if (env && 'production' == env || 'local-production' == env) {
                let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                let res = '';
                for (let i = 0; i < 10; i++) {
                    let id = Math.ceil(Math.random() * 35);
                    res += chars[id];
                }
                if ('production' == env) {
                    let regExp = new RegExp('@UI_API_GATEWAY_PROXY', 'g');
                    htmlPluginData.html = htmlPluginData.html.replace(regExp, '');
                } else {
                    let regExp = new RegExp('@UI_API_GATEWAY_PROXY/', 'g');
                    htmlPluginData.html = htmlPluginData.html.replace(regExp, config.UI_API_GATEWAY_PROXY);
                }
                htmlPluginData.html = htmlPluginData.html.replace('vendor.min.css', 'vendor.min.css?v=' + res)
                    .replace('core,min.css', 'core.min.css?v=' + res)
                    .replace('ajax.min.js', 'ajax.min.js?v=' + res)
                    .replace('vendor.min.js', 'vendor.min.js?v=' + res)
                    .replace('foundation.min.js', 'foundation.min.js?v=' + res);
            }
        });
    });

};

module.exports = MyPlugin;