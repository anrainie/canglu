'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                type: Object,
                default: {
                    type: 0
                }
            },
            key: {
                default: "type"
            },
            config: {},
            props: {
                type: String,
                default: '名称'
            }
        },
        mounted: function mounted() {
            // console.log(this.model[this.key])
        },

        methods: {
            del: function del(index) {
                var index = index;
                this.model[this.key].splice(index, 1);
            },
            addTime: function addTime() {
                this.model[this.key].unshift({
                    checkedsWeek: '0',
                    checkedeWeek: '6',
                    checkedsTime: '16',
                    checkedeTime: '35'
                });
            }
        }

    };
});