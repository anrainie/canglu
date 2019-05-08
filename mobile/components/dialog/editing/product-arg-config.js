'use strict';

/**
 * Created by zcn on 2018/3/18.
 */
define([], function () {
    return {
        props: {
            model: {
                default: {}
            },
            config: {},
            key: ''
        },
        data: function data() {
            return {};
        },
        mounted: function mounted() {
            this.model.argShowConfig.columns[1].label = app.recoverSymbol(this.model.argShowConfig.columns[1].label);
            this.model.argShowConfig.columns[2].label = app.recoverSymbol(this.model.argShowConfig.columns[2].label);
        },

        methods: {
            up: function up(index, row) {
                var target = this.model[this.key].columns;
                var curr = target[index];
                var prev = target[index - 1];

                this.$set(target, index - 1, curr);
                this.$set(target, index, prev);
            },
            down: function down(index, row) {
                var target = this.model[this.key].columns;
                var curr = target[index];
                var next = target[index + 1];

                this.$set(target, index, next);
                this.$set(target, index + 1, curr);
            }
        }

    };
});