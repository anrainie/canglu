'use strict';

require.config({
    paths: {
        "text": 'https://image-clwebsite.cangluxmt.com/reference/clTx',
        'vueLoader': 'componentLoader',
        'article': '../components/article',
        'color': '../components/dialog/color',
        'util': './common/util',
        'app': './workspace/vueSet',
        'zero': '../ueditor/third-party/zeroclipboard/ZeroClipboard',
        'BMap': 'http://api.map.baidu.com/api?v=2.0&ak=Ua9wlu6LbqmNKVbMEGtkgSxvljqZC5fc',
        'sortablejs': './lib/Sortable.min',
        'vuedraggable': './lib/vuedraggable.min',
        'qrcode': './lib/jquery.qrcode.min',
        'imageLoader': 'imageLoader',
        'swiper': 'https://image-clwebsite.cangluxmt.com/reference/clSw'
    },
    shim: {
        'BMap': {
            exports: 'BMap'
        }
    },
    waitSeconds: 0
});

require(['vueLoader', 'componentConfig', 'app', 'zero'], function (CptLoader, commCpt, app, zero) {
    window.ZeroClipboard = zero;
    window.app = app;

    CptLoader.config(commCpt).then(function () {
        setTimeout(function () {
            app.$mount('#app');
        });
    });
});