'use strict';

define([], function () {

    return {
        data: function data() {
            return {
                visible: true
            };
        },

        props: {
            model: {
                type: Object,
                default: {}
            },
            key: {},
            config: {
                type: String,
                default: '名称'
            }
        },
        computed: function computed() {
            return this.visible ? 'arrow-right' : 'arrow-down';
        },
        mounted: function mounted() {
            console.log('imagesetting mounted');
            window.ims = this;
        }
    };
});