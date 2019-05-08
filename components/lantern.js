'use strict';

define([], function () {
    return {
        data: function data() {
            return {
                visible: false,
                model: {},
                index: 0
            };
        },

        computed: {
            arrow: function arrow() {
                if (this.model.images && this.model.images.length > 1) {
                    return 'always';
                }
                return 'never';
            },
            indicator: function indicator() {
                if (this.model.images && this.model.images.length > 1) {
                    return 'outside';
                }
                return 'none';
            }
        },
        methods: {
            open: function open(model, index) {
                this.model = JSON.parse(JSON.stringify(model));
                this.visible = true;
                this.index = index;
            }
        },
        mounted: function mounted() {
            window.lantern = this;
        }
    };
});