'use strict';

define([], function () {
    return {
        props: {
            model: {
                defaulte: {}
            }
        },
        computed: {
            mw: function mw() {
                var v = this.model.value;
                if (this.model.def) v = 1200;
                return v;
            },
            leftLine: function leftLine() {
                return {
                    'margin-left': -this.mw / 2 - 1 + 'px'
                };
            },
            rightLine: function rightLine() {
                return {
                    'margin-left': this.mw / 2 + 'px'
                };
            },
            centerLine: function centerLine() {
                return {
                    'border-color': '#ff3aff'
                };
            }
        }
    };
});