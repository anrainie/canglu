'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                loading: false
            };
        },

        props: {
            model: {
                type: String,
                default: ''
            },
            config: {},
            key: {
                type: String
            }
        },
        methods: {
            selectImage: function selectImage() {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key]['backgroundImage']
                    },
                    callback: function callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model[self.key]['backgroundImage'] = model.src;
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
                    self.model[self.key]['background-repeat'] = 'repeat';
                    self.model[self.key]['background-size'] = 'contain';
                    self.model[self.key]['background-position'] = 'unset';
                } else if (_val == '1') {
                    self.model[self.key]['background-repeat'] = 'no-repeat';
                    self.model[self.key]['background-size'] = 'auto';
                    self.model[self.key]['background-position'] = 'center';
                } else if (_val == '2') {
                    self.model[self.key]['background-repeat'] = 'no-repeat';
                    self.model[self.key]['background-size'] = 'cover';
                    self.model[self.key]['background-position'] = 'center';
                }
            },
            delImg: function delImg() {
                this.model[this.key]['backgroundImage'] = '';
            }
        }
    };
});