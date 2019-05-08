'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                radio: '1',
                loading: false
            };
        },

        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                }
            },
            key: {
                default: 'image'
            },
            config: {
                type: Object,
                default: {
                    text: '图片样式'
                }
            }
        },
        components: {
            addlink: loader.load('dialog/editing/addlink')
        },
        watch: {
            'model': {
                handler: function handler() {
                    if (this.config.selected == 1) {
                        this.model.btnBg = 'transparent';
                    } else {
                        this.model.image.src = '';
                    }
                },
                deep: true
            }
        },
        methods: {
            getLink: function getLink(res) {
                this.model['link'] = res.link;
                this.model['open'] = res.open;
            },
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
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            },
            choose: function choose() {
                var self = this;
                var _val = self.config.showStyle;
                if (_val == '0') {
                    self.model[self.key].repeat = 'repeat';
                    self.model[self.key].size = 'contain';
                    self.model[self.key].position = 'unset';
                } else if (_val == '1') {
                    self.model[self.key].repeat = 'no-repeat';
                    self.model[self.key].size = 'auto';
                    self.model[self.key].position = 'center';
                } else if (_val == '2') {
                    self.model[self.key].repeat = 'no-repeat';
                    self.model[self.key].size = 'cover';
                    self.model[self.key].position = 'center';
                }
            },
            setLink: function setLink() {
                this.openLinkDialog();
            },
            delImg: function delImg() {
                this.model[this.key].src = '';
            }
        }
    };
});