'use strict';

define([], function () {
    return {
        mounted: function mounted() {
            if (!this.$refs.ph) {
                this.ref = $('.proDetailsInfo-web')[0];
            } else {
                this.ref = this.$refs.ph;
            }
            if (this.model.type >= 2) {
                this.model.type = this.model.type - 2;
            }
            this.model.removeShow = false;
            this.model.style['padding-left'] = '0px';
        },
        data: function data() {
            return {
                share: false,
                bgImg: '',
                productDetails: {},
                ref: null
            };
        },
        created: function created() {
            var self = this;
            var id = app.getRequest().detailid;
            var picsUrl = domain + 'product/' + id + '.html';
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        self.productDetails = response.data.product;
                        self.productDetails.price += '元';
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        methods: {
            getHeight: function getHeight() {
                var _this = this;

                setTimeout(function () {
                    var h = _this.ref.offsetHeight;
                    _this.model.style.height = parseInt(h + 40) + 'px';
                    app.detailHeight = _this.model.style.height;
                }, 2000);
            }
        },
        updated: function updated() {
            this.getHeight();
        },

        computed: {
            sty: function sty() {
                if (this.model.type == '0' || this.model.type == '2') return 'show-style-1';else {
                    return 'show-style-2';
                }
            }
        },
        props: {
            model: {
                type: Object,
                default: {
                    smallImg: [{
                        'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                    }, {
                        'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                    }, {
                        'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                    }, {
                        'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                    }, {
                        'bgImg': 'background:url(images/components/img_zhanwt.png) no-repeat center;background-size: cover;'
                    }],
                    nextPro: '0',
                    offers: '0',
                    customer: '0',
                    magnify: '0',
                    size: {
                        radio: '0',
                        width: '320px',
                        height: '320px'
                    },
                    border: {
                        checked: '',
                        radio: '0',
                        color: '#dddddd',
                        width: '0px',
                        style: 'sty-bd-1'
                    },
                    share: true,
                    parameter: ['0', '1', '2', '3'],
                    type: 0,
                    name: '',
                    desc: '',
                    style: {
                        height: '600px',
                        width: '100%',
                        opacity: 1,
                        'border-radius': '0px',
                        'background-color': '#fff',
                        'background-image': '',
                        'border-style': 'solid',
                        'border-color': 'black',
                        'border-width': '1px',
                        'border-bottom': 'medium none'
                    },
                    title: ''
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '编辑组件（产品详情）',
                    pages: {
                        '常规': {
                            type: {
                                config: {
                                    text: '组件样式：',
                                    style: {
                                        width: '80px',
                                        height: '50px'
                                    },
                                    options: [{
                                        channel: 2,
                                        text: '产品展示',
                                        image: './images/components/buju_b_mobile.png'
                                    }, {
                                        channel: 2,
                                        text: '无产品展示',
                                        image: './images/components/buju_a_mobile.png'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            },
                            share: {
                                component: 'dialog/editing/productDetails-share'
                            },
                            parameter: {
                                config: {
                                    text: '展示参数：',
                                    checkbox: [{
                                        name: '价格（交易价格）',
                                        value: '0'
                                    }, {
                                        name: '价格（市场价格）',
                                        value: '1'
                                    }, {
                                        name: '编号',
                                        value: '2'
                                    }, {
                                        name: '产品介绍',
                                        value: '3'
                                    }]
                                },
                                component: 'dialog/editing/productDetails-parameter'
                            }
                        }
                    }
                }

            }
        }

    };
});;