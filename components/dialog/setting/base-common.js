'use strict';

define(['vueLoader'], function (loader) {
    var defCommon = {
        def: false,
        value: 1200,
        canvasStyle: {
            color: '#f2f2f2',
            src: '',
            repeat: '',
            size: '',
            position: ''
        },
        config: {
            def: 0,
            bgStyle: 0
        },
        conts: {
            header: {
                name: '顶栏区',
                visible: true
            },
            banner: {
                name: '横幅区',
                visible: true
            },
            body: {
                name: '内容区',
                visible: true
            },
            bottom: {
                name: '底栏区',
                visible: true
            }
        }
    };
    return {
        data: function data() {
            return {};
        },

        computed: {
            ruler: {
                get: function get() {
                    return this.model.common.value;
                },
                set: function set(v) {
                    this.model.common.value = v;
                }
            },
            defwidth: {
                get: function get() {
                    return this.model.common.def;
                },
                set: function set(v) {
                    this.model.common.def = v;
                }
            },
            conts: function conts() {
                return this.model.common.conts;
            }
        },
        props: {
            model: {
                backgroundStyle: { useDefault: false }
            },
            config: {
                default: {
                    name: '网站背景：',
                    current_2: '',
                    selected: 0,
                    showStyle: 0,
                    radio: [{
                        name: '默认',
                        value: 0
                    }, {
                        name: '自定义',
                        value: 1
                    }],
                    showList: [{
                        name: '平铺',
                        value: 0,
                        s: {
                            repeat: 'repeat',
                            size: '',
                            position: 'unset'
                        }
                    }, {
                        name: '拉伸',
                        value: 1,
                        s: {
                            repeat: 'no-repeat',
                            size: 'auto',
                            position: 'center'
                        }
                    }, {
                        name: '填充',
                        value: 2,
                        s: {
                            repeat: 'no-repeat',
                            size: 'cover',
                            position: 'center'
                        }
                    }]
                }

            },
            code: {},
            base: {}
        },
        mounted: function mounted() {
            this.check();
        },

        methods: {
            vis: function vis(k) {
                this.conts[k].visible = !this.conts[k].visible;
                this.$forceUpdate();
            },
            toTab: function toTab(k) {
                this.base(k);
            },
            resume: function resume() {
                var v = new Object();

                return v;
            },
            check: function check() {
                var common = this.model.common;
                if (common.def === undefined) {
                    common.def = defCommon.def;
                }
                if (common.value === undefined) {
                    common.value = defCommon.value;
                }
                if (common.canvasStyle === undefined) {
                    common.canvasStyle = defCommon.canvasStyle;
                }
                if (common.config === undefined) {
                    common.config = defCommon.config;
                }
            }
        },
        components: {
            bgedit: loader.load('dialog/editing/group-bg')
        }
    };
});