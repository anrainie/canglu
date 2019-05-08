'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {};
        },

        props: {
            model: {
                default: {
                    style: {}
                }
            },
            key: ''
        },
        methods: {
            editImage: function editImage(im) {}
        }
    };
});