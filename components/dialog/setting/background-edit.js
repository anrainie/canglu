'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            'model': {},
            'config': {
                default: [true, true]
            }
        },
        mounted: function mounted() {
            if ('inherit' == this.model['background-color']) {
                this.model['background-color'] = '';
            }
        },

        methods: {
            clearImage: function clearImage() {
                this.model['background-image'] = null;
            },
            selectImage: function selectImage() {
                var self = this;
                loader.loadImageDialog({
                    model: {},
                    callback: function callback(model) {
                        self.model['background-image'] = 'url(' + model.src + ')';
                        self.$forceUpdate();
                    },
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            }
        }
    };
});