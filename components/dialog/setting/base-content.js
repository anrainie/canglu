'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                ruler: 0,
                defwidth: true

            };
        },

        props: {
            model: {},
            config: {},
            code: {},
            base: {
                type: Function
            }

        },
        mounted: function mounted() {},

        watch: {
            config: function config(v) {
                //console.log("config:"+v)
            },
            ontab: function ontab(v) {
                //console.log("ontab:"+v) 
            }
        },
        components: {
            'base-common': loader.load('dialog/setting/base-common'),
            'base-item': loader.load('dialog/setting/base-item')
        }
    };
});