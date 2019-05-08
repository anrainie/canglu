'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {},
            webcode: {}

        },
        data: function data() {
            return {
                setStyle: false,
                setting: {
                    barlist: {
                        'common': {
                            id: 'common',
                            name: '常规',
                            config: {
                                tyep: 'common'
                            }
                        },
                        'header': {
                            id: 'header',
                            name: '顶栏'
                        },
                        'banner': {
                            id: 'banner',
                            name: '横幅'
                        },
                        'body': {
                            id: 'body',
                            name: '内容'
                        },
                        'bottom': {
                            id: 'bottom',
                            name: '底栏'
                        }
                    }
                }
            };
        },

        methods: {
            toggleIcon: function toggleIcon() {
                var body = document.getElementsByTagName("body")[0];
                body.style.overflow = body.style.overflow ? body.style.overflow : 'visible';
                if (body.style.overflow == 'hidden') {
                    body.style.overflow = 'visible';
                } else {
                    body.style.overflow = 'hidden';
                }
                app.iconName = app.iconName == 'tpl' ? "" : 'tpl';
            },

            //去到小后台
            gotoNewPage: function gotoNewPage(shref) {
                window.location.href = shref;
            },
            baseConfig: function baseConfig() {
                var self = this;
                loader.createVue('dialog/setting/base-area', function (dialogVue) {
                    dialogVue.getModel(self.model);
                    dialogVue.setting(self.setting);
                    loader.fill("#tempdialog", dialogVue);
                    dialogVue.open(function (callback) {});
                });
            }
        }
    };
});