'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                default: {
                    title: '我的购物车',
                    type: 0,
                    bgStyle: {
                        'background-color': '#424242'
                    },
                    titleBarStyle: {
                        show: false
                    },
                    style: {
                        width: '160px',
                        height: '45px',
                        overflow: 'none'
                    },
                    titleStyle: {
                        color: '#fff',
                        'font-size': 18
                    },
                    items: []
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '添加模块(购物车)',
                    subtitle: '副标题',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '文本内容',
                                    placeholder: '请填写购物车描述'
                                },
                                component: 'dialog/text'
                            },
                            style: {
                                component: 'dialog/editing/cart-style'
                            }
                        }
                    }
                }
            }
        },
        methods: {
            mouseEnter: function mouseEnter() {
                this.menuVisible = true;
                clearTimeout(this.timeout);
            },
            mouseLeave: function mouseLeave() {
                var _this = this;

                this.timeout = setTimeout(function () {
                    _this.menuVisible = false;
                }, 300);
            }
        },
        data: function data() {
            return {
                timeout: -1,
                menuVisible: false,
                loading: false,
                items: [],
                scrollTop: 0,
                argShowConfig: {
                    type: 0,
                    columns: [{
                        key: 'name',
                        visible: true,
                        fixed: true,
                        prefix: '',
                        style: {},
                        label: '产品名字'
                    }, {
                        key: 'price',
                        visible: true,
                        fixed: true,
                        prefix: '¥',
                        style: {
                            'font-size': '14px',
                            'color': '#9DCAEE',
                            'line-height': '20px'
                        },
                        label: '价格(交易价格)'
                    }]
                }

            };
        },

        computed: {
            totalPrice: function totalPrice() {
                var x = 0;
                if (this.items) {
                    this.items.forEach(function (item) {
                        x += parseInt(item['price']);
                    });
                }
                return x;
            },
            menuStyle: function menuStyle() {
                var x = {
                    'transform': 'translateY( -' + this.scrollTop + 'px)'
                };
                return x;
            }
        },
        watch: function watch() {},
        created: function created() {
            //临时代码

            this.model.items = [683, 684, 685];
            this.loading = true;
            var i = 0;
            var self = this;
            self.loading = true;
            this.model.items.forEach(function (id) {
                app.loadProductSummary({
                    id: id
                }, function (result) {
                    if (result) {
                        self.items.push(result);
                    }
                    if (++i == self.model.items.length) {
                        self.loading = false;
                    }
                });
            });
        },
        mounted: function mounted() {
            var _this2 = this;

            this.scrollTop = app.getScrollTop();
            window.addEventListener('scroll', function (v) {
                _this2.scrollTop = app.getScrollTop();
            });
        }
    };
});