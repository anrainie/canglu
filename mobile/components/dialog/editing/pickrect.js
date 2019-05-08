'use strict';

define([], function () {
    return {
        props: ['model', 'store', 'config'],
        mounted: function mounted() {
            console.log('pick rect ', this);
        }
    };
});