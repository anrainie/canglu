'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: ['model', 'parent'],
        data: function data() {
            return {};
        },

        components: {
            bgedit: loader.load('dialog/setting/background-edit'),
            hcolor: loader.load('dialog/setting/hoverColor')
        },
        methods: {
            restore: function restore(keys) {
                var _this = this;

                for (k in keys) {
                    keys[k].forEach(function (e) {
                        _this.model[k][e] = app.tabsConfig[k][e];
                    });
                }
            }
        },
        mounted: function mounted() {},

        watch: {}
    };
});