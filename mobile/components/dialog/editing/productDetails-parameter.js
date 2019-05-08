'use strict';

define([], function () {
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