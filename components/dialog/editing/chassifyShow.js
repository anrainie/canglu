"use strict";

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
        watch: {
            "model.Expansion": {
                handler: function handler() {},

                deep: true
            }
        },
        mounted: function mounted() {}
    };
});