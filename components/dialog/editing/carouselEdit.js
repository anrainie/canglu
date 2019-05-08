"use strict";

define([], function () {
    return {
        props: {
            model: {
                default: {}
            },
            key: {}
        },
        methods: {
            intervalTime: function intervalTime() {
                if (this.model.carousel.interval < 500) {
                    this.model.carousel.interval = 500;
                }
            }
        }
    };
});