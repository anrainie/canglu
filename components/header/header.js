'use strict';

define([], function () {
    return {
        props: ['webcode'],
        data: function data() {
            return {
                saveLoading: false,
                guide: false,
                guides: false,
                channelflag: [{ name: '移动', img: 'images/mobile/mob.png', src: '../mobile/mobileIndex.html' }, { name: 'PC', img: 'images/mobile/pc.png', src: '../clauthweb/index.html' }]
            };
        },

        methods: {
            savePage: function savePage() {
                var _this = this;

                this.saveLoading = true;
                app.savePage(function (res) {
                    if (res.success) _this.saveLoading = false;else {
                        setTimeout(function () {
                            _this.saveLoading = false;
                        }, 3000);
                    }
                });
            },
            guideShow: function guideShow() {
                this.guide = true;
                $('body').css({ 'overflow-y': 'hidden' });
                $('.header').css({ 'z-index': '99' });
            }
        }
    };
});