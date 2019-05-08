'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            'model': {},
            'config': {
                default: [true, true]
            }
        },
        mounted: function mounted() {
            if ('inherit' == this.model['background-color']) {
                this.model['background-color'] = '';
            }
        },

        watch: {},
        methods: {}
    };
});