'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                radio: '1',
                loading: false
            };
        },

        props: {
            model: {
                type: Object,
                default: {
                    image: {}
                }
            },
            key: {
                default: 'canvasStyle'
            },
            config: {
                type: Object,
                default: {}
            }
        },
        mounted: function mounted() {},

        components: {},
        computed: {
            canvasStyle: function canvasStyle() {
                var cs = this.model.canvasStyle;
                return {
                    'background-image': 'url("' + cs.src + '")',
                    'background-repeat': cs.repeat,
                    'background-size': cs.size,
                    'background-position': cs.position
                };
            },

            def: {
                get: function get() {
                    return this.model.config.def;
                },
                set: function set(v) {
                    this.model.config.def = v;
                }
            },
            bgStyle: {
                get: function get() {
                    return this.model.config.bgStyle;
                },
                set: function set(v) {
                    this.model.config.bgStyle = v;
                }
            },
            color: {
                get: function get() {
                    return app.recoverSymbol(this.model.canvasStyle.color);
                },
                set: function set(v) {
                    this.model.canvasStyle.color = v;
                }
            }
        },
        methods: {
            selectImage: function selectImage() {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src
                    },
                    callback: function callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model.canvasStyle.src = model.src;
                        setTimeout(function () {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            },
            choose: function choose(s) {
                this.model.canvasStyle.repeat = s.repeat;
                this.model.canvasStyle.size = s.size;
                this.model.canvasStyle.position = s.position;
            },
            delImg: function delImg() {
                this.model.canvasStyle.src = '';
            }
        }
    };
});