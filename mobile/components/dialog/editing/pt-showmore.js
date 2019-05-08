'use strict';

define(['vueLoader'], function (loader) {
    return {

        components: {
            addlink: loader.load('dialog/editing/addlink')
        },
        props: {
            model: {
                default: {}
            },
            key: {
                default: ''
            },
            config: {
                default: []
            }
        },
        computed: {
            showMore: function showMore() {
                var x = this.model[this.key];
                if (!x) {
                    x = this.model[this.key] = {};
                }
                return x;
            }
        },
        methods: {
            addLink: function addLink(v) {
                this.model[this.key] = v;
            }
        }

    };
});