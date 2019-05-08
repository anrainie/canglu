"use strict";

define([], function () {
    return {
        props: {
            model: {
                default: {}
            },
            key: {},
            config: {}
        },
        mounted: function mounted() {
            window.kw = this;
        }
    };
});