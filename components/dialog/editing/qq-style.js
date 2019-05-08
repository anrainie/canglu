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
        mounted: function mounted() {
            // console.log(this.model);
        }
    };
});