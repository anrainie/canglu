'use strict';

define([], function () {
    return {
        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                }
            },
            key: {
                default: ''
            },
            config: {
                type: Object,
                default: {}
            }
        },
        computed: {
            showSelect: {
                get: function get() {
                    return this.model.config.showSelect;
                },
                set: function set(v) {
                    this.model.config.showSelect = v;
                }
            },
            showStyle: {
                get: function get() {
                    return this.model.config.showStyle;
                },
                set: function set(v) {
                    this.model.config.showStyle = v;
                }
            }
        }
    };
});