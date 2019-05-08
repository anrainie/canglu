'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['vueLoader'], function (loader) {
    var _default;

    return {
        props: {
            model: {
                default: (_default = {
                    title: '商城分类',
                    subtitle: '副标题'
                }, _defineProperty(_default, 'subtitle', ''), _defineProperty(_default, 'style', {
                    width: '180px',
                    height: '50px',
                    overflow: 'none'
                }), _defineProperty(_default, 'color1', 'rgba(255, 0, 0, 1)'), _defineProperty(_default, 'color2', '#ccc'), _defineProperty(_default, 'color3', '#999'), _defineProperty(_default, 'iconShow', false), _defineProperty(_default, 'color1hover', '#AAA'), _defineProperty(_default, 'lineHeight', '50px'), _defineProperty(_default, 'itemWidth', '180px'), _defineProperty(_default, 'type', 0), _defineProperty(_default, 'cates', []), _defineProperty(_default, 'backgroundStyle', {
                    useDefault: true,
                    'background-color': '#ddd',
                    'background-image': ''
                }), _defineProperty(_default, 'titleBarStyle', {
                    show: false
                }), _defineProperty(_default, 'openMod', '_blank'), _default)
            },
            editingConfig: {
                default: {
                    title: '编辑组件（商城分类）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题'
                                },
                                component: 'dialog/text'
                            },
                            type: {
                                config: {
                                    text: '组件样式',
                                    style: {
                                        width: '80px',
                                        height: '50px'
                                    },
                                    options: [{
                                        channel: 1,
                                        image: 'images/components/scfl1.png',
                                        text: '0'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/scfl2.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/scfl3.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/scfl4.png',
                                        text: '1'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            },
                            cates: {
                                component: 'dialog/editing/mall-cates'
                            }
                        },
                        '展示设置': {
                            lineHeight: {
                                config: {
                                    text: '分类行高：'
                                },
                                component: 'dialog/text'
                            },
                            itemWidth: {
                                config: {
                                    text: '分类宽度：'
                                },
                                component: 'dialog/text'
                            },
                            iconShow: {
                                config: {
                                    text: '图标'
                                },
                                component: 'dialog/editing/iconShow'
                            },
                            color1: {
                                config: {
                                    text: '主题色'
                                },
                                component: 'dialog/color-picker'
                            },
                            openMod: {
                                component: 'dialog/editing/openMod'
                            }
                        }
                    }
                }

            },
            settingConfig: {
                default: {
                    visible: false
                }
            }
        },
        data: function data() {
            return {
                hoverList: {},
                activeIndex: '1',
                allCates: []
            };
        },

        watch: {
            'model.allCates': {
                deep: true,
                handler: function handler(v) {
                    var _this = this;

                    // 未编辑时通过接口取到所以
                    if (this.model.allCates) this.allCates = app.mallTreefy(this.model.allCates);else {
                        app.loadB2CProductCate(-1, function (r) {
                            _this.allCates = app.mallTreefy(r);
                        });
                    }
                }
            }
        },
        computed: {
            openMod: function openMod() {
                return this.model.openMod;
            }
        },
        mounted: function mounted() {
            if (!this.model.iconShow) this.model.iconShow = false;
            this.checkUpConfig();
        },

        methods: {
            handleSelect: function handleSelect() {},
            handleOpen: function handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            linkHover: function linkHover($event, hover) {
                $event.target.style.color = hover ? this.model.color1 : 'black';
            },
            handleClose: function handleClose(key, keyPath) {
                //console.log(key, keyPath);
            },
            checkUpConfig: function checkUpConfig() {
                if (!this.model.color3) {
                    this.model.color3 = '999';
                }
            }
        }
    };
});