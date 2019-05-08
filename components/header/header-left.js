'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: ['model', 'webcode'],
        data: function data() {
            return {
                showMenus: false,
                logo: 'images/logo.png'
            };
        },

        methods: {
            pageflag: function pageflag() {
                // 开关页面管理弹窗
                this.showMenus = !this.showMenus;
            },
            closeMenu: function closeMenu() {
                this.showMenus = false;
            }
        },
        components: {
            'page-menus': loader.load('header/page-menus')
        }
    };
});