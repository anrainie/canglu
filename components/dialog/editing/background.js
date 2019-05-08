'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                default: {
                    style: {},
                    def: {}
                }
            }
        },
        watch: {},
        methods: {
            clearImage: function clearImage() {
                this.model.bgStyle['background-image'] = undefined;
            },
            selectImage: function selectImage() {
                var self = this;
                loader.loadImageDialog({
                    model: {},
                    callback: function callback(model) {
                        self.model.bgStyle['background-image'] = 'url(' + model.src + ')';
                        self.$forceUpdate();
                    },
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            },
            resume: function resume(keys) {
                for (k in keys) {
                    keys[k] = app.bgStyle[k];
                }
            }
        }
    };
});