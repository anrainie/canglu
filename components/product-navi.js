'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
    var _default;

    return {
        props: {
            model: {
                default: (_default = {
                    title: '产品导航',
                    subtitle: '副标题'
                }, _defineProperty(_default, 'subtitle', ''), _defineProperty(_default, 'type', 0), _defineProperty(_default, 'cates', []), _defineProperty(_default, 'titleStyle', {
                    height: '50px',
                    'line-height': '50px',
                    'margin-left': '20px'
                }), _defineProperty(_default, 'titleInner', {
                    display: 'inline-block',
                    width: '100px',
                    height: '50px',
                    'line-height': '50px',
                    'background-color': '#5ca6e2'
                }), _defineProperty(_default, 'style', {
                    width: app.channel == 2 ? '100%' : '988px',
                    height: '400px'
                }), _default)
            },
            editingConfig: {
                default: {
                    title: '编辑组件（产品导航）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题'
                                },
                                component: 'dialog/text'
                            },
                            canvasStyle: {
                                config: {
                                    text: '背景颜色'
                                },
                                component: 'dialog/editing/blackground-color'
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
                                        image: 'images/components/pro-nav1.png',
                                        text: '0'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/pro-nav2.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/pro-nav1.png',
                                        text: '0'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/pro-nav2.png',
                                        text: '1'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            },
                            cates: {
                                component: 'dialog/editing/product-cates'
                            }
                        }
                    }
                }
            },
            settingConfig: {
                default: {}
            }
        },
        data: function data() {
            return {
                allCates: [],
                liStyle: ''
            };
        },

        watch: {
            'model.allCates': {
                deep: true,
                handler: function handler(v) {
                    var _this = this;

                    // 未编辑时通过接口取到所以
                    if (this.model.allCates) this.allCates = app.treefy(this.model.allCates);else {
                        app.loadProductCate(-1, function (r) {
                            _this.allCates = app.treefy(r);
                        });
                    }
                }
            }
        },

        mounted: function mounted() {
            //console.log(this)
            // this.allCates;
            // this.model.cates.forEach(e => {
            //
            // });
        },

        methods: {
            goInfo: function goInfo() {
                var pageid = app.toWebsessionStorage('proId');
                if (pageid != undefined) {
                    if (app.channel == 1) {
                        window.open('http://' + app.toWebsessionStorage('domainUrl') + '/preview.html?pageid=' + pageid);
                    }
                } else {
                    this.$message({
                        message: '暂无内容！',
                        type: 'warning'
                    });
                }
            }
        }
    };
});