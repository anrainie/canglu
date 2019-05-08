'use strict';

define(['vueLoader'], function (loader) {
    return {
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
        data: {
            checked: []
        },
        mounted: function mounted() {}
    };
});