'use strict';

define(['vueLoader'], function (loader) {
    return {

        components: {
            addlink: loader.load('dialog/editing/addlink')
        },
        props: {
            model: {
                default: {}
            },
            key: {
                default: ''
            },
            config: {
                default: []
            }
        }
    };
});