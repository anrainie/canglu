"use strict";

define(["vueLoader"], function () {
    return {
        props: {
            model: {
                type: Object,
                default: {}
            },
            save: {
                type: Function
            }
        },
        data: function data() {
            return {};
        }
    };
});