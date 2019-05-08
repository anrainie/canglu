'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                loading: false,
                clearBg: false
            };
        },

        props: {
            model: {
                default: {
                    style: {}
                }
            },
            config: {
                type: Object,
                default: {
                    text: '名称'
                }
            },
            key: ''
        },
        watch: {
            'model.activeColor.src': {
                handler: function handler() {
                    if (this.model.activeColor.src != '' && this.model.activeColor.src != 'http://0.ss.faisys.com/image/default/demo.png') {
                        this.clearBg = true;
                    }
                },

                deep: true
            }
        },
        methods: {
            selectImage: function selectImage() {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src
                    },
                    callback: function callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model[self.key].src = model.src;
                        setTimeout(function () {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged: function selectChanged(selected, item, index) {}
                });
            },
            clearBgImg: function clearBgImg() {
                this.clearBg = false;
                this.model.activeColor.src = 'http://0.ss.faisys.com/image/default/demo.png';
            }
        }
    };
});