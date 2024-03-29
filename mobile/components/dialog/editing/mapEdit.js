'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                default: {}
            },
            config: {
                default: {}
            },
            key: {}
        },
        methods: {
            mark: function mark() {
                this.$refs.map.paint = true;
            }
        },
        components: {
            bmap: loader.load('dialog/bmap')
        }
    };
});