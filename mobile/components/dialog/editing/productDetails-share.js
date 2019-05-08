"use strict";

define([], function () {
    return {
        props: {
            model: {
                type: Object,
                default: {
                    type: 0
                }
            },
            key: {
                default: "type"
            },
            config: {}

        }
    };
});