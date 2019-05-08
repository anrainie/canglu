"use strict";

define(["vueLoader"], function () {
    return {
        props: {
            model: {
                type: Object,
                default: {}
            }
        },
        data: function data() {
            return {
                isAlone: false
            };
        },
        mounted: function mounted() {
            if (this.model.isAlone == 1) this.isAlone = true;
        },

        watch: {
            'isAlone': {
                handler: function handler(val) {
                    if (val == true) this.model.isAlone = 1;else {
                        this.model.isAlone = 2;
                    }
                },

                deep: true
            }
        }
    };
});