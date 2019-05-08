'use strict';

define([], function () {
    return {
        props: {
            model: {
                type: Object,
                default: {}
            },
            save: {
                type: Function
            }
        },
        data: function data() {
            return {
                sizes: ['12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px', '21px', '22px', '26px', '28px', '36px', '48px']
            };
        }
    };
});