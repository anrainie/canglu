'use strict';

define([], function () {
    return {
        props: ['model', 'key'],
        methods: {
            moveUp: function moveUp(index, rows) {
                var arr = this.model[this.key];

                if (index > 0) {
                    var t = arr[index - 1];
                    arr.splice(index - 1, 1);
                    arr.splice(index, 0, t);
                }
            },
            moveDown: function moveDown(index, row) {
                var arr = this.model[this.key];
                if (index < arr.length - 1) {
                    var t = arr[index];
                    arr.splice(index, 1);
                    arr.splice(index + 1, 0, t);
                }
            },
            handleDelete: function handleDelete(index, row) {
                var arr = this.model[this.key];
                arr.splice(index, 1);
            }
        }
    };
});