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
            timeShow: function timeShow() {
                var x = this.model[this.key];
                if (!x) {
                    x = this.model[this.key] = {};
                }
                return x;
            },
            underline: function underline() {
                var x = this.model[this.key];
                if (!x) {
                    x = this.model[this.key] = {};
                }
                console.log(x);
                return x;
            }
        },
        methods: {
            addLink: function addLink(v) {
                this.model[this.key] = v;
            }
        },
        watch: {
            'model.underline': function modelUnderline() {}
        }

    };
});