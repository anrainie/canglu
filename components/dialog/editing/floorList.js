'use strict';

define([], function () {
    return {
        props: {
            model: {
                default: {}
            },
            pages: {
                default: {}
            },
            config: {},
            key: ''
        },
        data: function data() {
            return {
                floorListIds: []
            };
        },
        mounted: function mounted() {
            var _this = this;

            app.loadFloorCate({}, function (art) {
                _this.floorListIds = art;
                _this.model.floorListIds = art;
            });
        },


        methods: {}
    };
});