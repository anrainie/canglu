"use strict";

define([], function () {
    return {
        props: {
            model: {
                default: {}
            }
        },
        data: function data() {
            return {
                hover: false
            };
        },

        computed: {
            menuStyle: function menuStyle() {
                var x = {
                    color: this.model.color2
                };

                return x;
            }
        }
    };
});