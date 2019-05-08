'use strict';

define(['vueLoader'], function () {
    return {
        data: function data() {
            return {};
        },

        components: {},
        props: {
            model: {
                default: {
                    style: {},
                    def: {}
                }
            },
            parent: {},
            defaultStyles: {}
        },
        watch: {},
        methods: {
            resume: function resume(keys) {
                for (k in keys) {
                    keys[k] = app.paddingStyle[k];
                }
            }
        },
        mounted: function mounted() {}
    };
});