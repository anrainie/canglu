'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {};
        },

        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                }
            },
            config: {
                type: Object,
                default: {}
            }
        },
        mounted: function mounted() {},

        components: {},
        computed: {},
        methods: {}
    };
});