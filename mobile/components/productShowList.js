'use strict';

define(['swiper'], function (Swiper) {
    return {
        props: {
            model: {
                default: {
                    currentPage: 0,
                    title: '商品列表',
                    subtitle: '副标题',
                    titlePadding: {
                        'padding-left': '5px',
                        'padding-top': '5px'
                    },
                    type: 0,
                    hoverEffect: 0,
                    catesIds: [],
                    productIds: [],
                    style: {
                        width: '100%',
                        height: '552px',
                        'overflow-x': 'hidden'
                    },
                    imageStyle: {
                        width: '180px',
                        height: '180px'
                    },
                    argShowConfig: {
                        type: 0,
                        columns: [{
                            key: 'name1',
                            visible: true,
                            fixed: true,
                            prefix: '',
                            style: {
                                'font-size': '15px',
                                'color': '#666',
                                'min-height': '40px',
                                'line-height': '20px',
                                'margin-bottom': '10px',
                                'display': '-webkit-box',
                                '-webkit-line-clamp': '2',
                                '-webkit-box-orient': 'vertical',
                                'white-space': 'normal',
                                'overflow': 'hidden'
                            },
                            label: '商品名称'
                        }, {
                            key: 'mallPcPrice',
                            visible: true,
                            fixed: true,
                            prefix: '¥',
                            style: {
                                'font-size': '13px',
                                'color': '#4c4c4c',
                                'line-height': '20px'
                            },
                            label: '价格(交易价格)'
                        }, {
                            key: 'marketPrice',
                            visible: false,
                            fixed: false,
                            prefix: '¥',
                            style: {
                                'font-size': '13px',
                                'line-height': '20px',
                                'color': '#4c4c4c',
                                'text-decoration': 'line-through'
                            },
                            label: '价格(市场价格)'
                        }, {
                            key: 'productCode',
                            visible: false,
                            fixed: false,
                            prefix: '',
                            style: {
                                'font-size': '13px',
                                'color': '#666',
                                'line-height': '20px'
                            },
                            label: '编号'
                        }]
                    },

                    //展示设置
                    showConfig: {
                        showPage: true, //是否分页
                        capacity: 4, //产品个数

                        //显示更多
                        showMore: {
                            visible: 0, //0-默认,1-隐藏,2-自定义
                            link: {
                                type: 0,
                                local: '',
                                net: '',
                                open: ''
                            }
                        },
                        useSlide: false, //支持幻灯片

                        //点击产品
                        clickConfig: {
                            showType: true, // 0-产品详情页 ,1-幻灯片
                            detailShowType: 0 //详情打开方式  0-当前窗口,1-新窗口
                        }
                    },
                    effectBorder: 0,
                    effectColor: '',
                    effectWidth: '10px',
                    effectStyle: 0
                }
            },
            settingConfig: ['常规', '标题', '动画', '样式'],
            editingConfig: {
                default: {
                    title: '编辑组件(商品展示)',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题',
                                    placeholder: '请填写页面名称/导航名称'
                                },
                                component: 'dialog/text'
                            },
                            type: {
                                config: {
                                    text: '组件样式：',
                                    options: [{
                                        text: '纯文本展示',
                                        image: './images/components/img_cpzs_zj_a.png'
                                    }, {
                                        text: '纯文本展示',
                                        image: './images/components/img_cpzs_zj_b.png'
                                    }, {
                                        text: '横向平铺样式',
                                        image: './images/components/img_cpzs_zj_c.png'
                                    }, {
                                        text: '箭头滚动展示',
                                        image: './images/components/img_cpzs_zj_e.png'
                                    }, {
                                        text: '两列图文展示',
                                        image: './images/components/img_cpzs_zj_f.png'
                                    }, {
                                        text: '两列图文展示',
                                        image: './images/components/img_cpzs_zj_d.png'
                                    }],
                                    style: {
                                        width: '70px',
                                        height: '48px'
                                    }
                                },
                                component: 'dialog/editing/style-list'
                            },
                            imageStyle: {
                                config: {
                                    text: '图片大小'
                                },
                                component: 'dialog/editing/imgSize'
                            },
                            productIds: {
                                component: 'dialog/editing/goods-category-list'
                            }
                        },
                        '展示设置': {
                            showConfig: {
                                component: 'dialog/editing/show-product-config'
                            },
                            titlePadding: {
                                component: 'dialog/editing/titlePadding'
                            }
                        },
                        '展示参数': {
                            argShowConfig: {
                                component: 'dialog/editing/product-arg-config'
                            }
                        }
                    }
                }
            }
        },
        data: function data() {
            return {
                currentPage: 0,
                moduleConfig: {},
                products: [],
                loadedImage: {},
                selectedProduct: null
            };
        },

        computed: {
            wid: function wid() {
                var sty = {
                    'width': "calc(100% - " + this.model.imageStyle.width + " - 15px)"
                };
                if (this.model.titlePadding) {
                    sty['padding-left'] = this.model.titlePadding['padding-left'];
                    sty['padding-top'] = this.model.titlePadding['padding-top'];
                } else {
                    this.model.titlePadding = {
                        'padding-left': '5px',
                        'padding-top': '5px'
                    };
                    sty['padding-left'] = this.model.titlePadding['padding-left'];
                    sty['padding-top'] = this.model.titlePadding['padding-top'];
                }
                return sty;
            },
            selectedPro: function selectedPro() {
                if (this.selectedProduct == null && this.products.length > 0) {
                    this.selectedProduct = this.products[0];
                }
                return this.selectedProduct;
            },
            total: function total() {
                return Math.ceil(this.products.length / this.capacity);
            },
            productList: function productList() {
                if (this.model.showConfig.showPage === false) {
                    return this.products;
                }
                var capacity = this.capacity <= 0 ? 1 : this.capacity;
                capacity = parseInt(capacity);

                var total = this.products.length,
                    start = capacity * this.currentPage,
                    end = start + capacity;
                var ps = [];
                for (; start < end && start < total;) {
                    if (this.products[start] != undefined && this.products[start] != null) {
                        var oldImg = this.products[start].masterImg;
                        if (oldImg.indexOf('middle') == -1) {
                            var length = oldImg.lastIndexOf('/');
                            var rightHref = oldImg.substr(length, oldImg.length);
                            var leftHref = oldImg.substr(0, length);
                            var imgSrc = leftHref + '/middle' + rightHref;
                            this.products[start].masterImg = imgSrc;
                        }
                    }
                    ps.push(this.products[start++]);
                }
                return ps;
            },
            start: function start() {
                return this.currentPage * this.capacity;
            },
            capacity: function capacity() {
                if (this.model.showConfig.capacity) return this.model.showConfig.capacity;
                return 1;
            },
            titlePadding: function titlePadding() {
                if (this.model.titlePadding) {
                    return this.model.titlePadding;
                } else {
                    this.model.titlePadding = {
                        'padding-left': '5px',
                        'padding-top': '5px'
                    };
                    return this.model.titlePadding;
                }
            }
        },
        mounted: function mounted() {
            if (this.model.type >= 5) {
                this.model.type = this.model.type - 5;
            }
            if (this.model.imageStyle == undefined) {
                var imageStyle = {
                    width: '180px',
                    height: '180px'
                };
                this.model.imageStyle = imageStyle;
            }

            if (this.model.titlePadding == undefined) {
                var titlePadding = {
                    'padding-left': '5px',
                    'padding-top': '5px'
                };
                this.model.titlePadding = titlePadding;
            }

            var width = this.model.imageStyle.width == undefined ? '180px' : this.model.imageStyle.width;
            var height = this.model.imageStyle.height == undefined ? '180px' : this.model.imageStyle.height;
            this.model.imageStyle.width = app.mobileFit(width);
            this.model.imageStyle.height = app.mobileFit(height);
        },
        created: function created() {
            if (this.model.type == 4 || this.model.type == 5) {
                this.slide();
            }
        },

        watch: {
            'model': {
                handler: function handler() {
                    if (this.model.type == 4 || this.model.type == 5) {
                        this.slide();
                    }
                },
                deep: true
            },
            'model.productIds': function modelProductIds() {
                var _this = this;

                var ids = '';
                this.products = [];
                this.model.productIds.forEach(function (e) {
                    ids += e + ',';
                });
                ids = ids.substring(0, ids.length - 1);
                app.loadB2CProductAll(ids, function (data) {
                    _this.loading = false;
                    _this.products = data;
                });
            }
        },
        methods: {
            clickClumn: function clickClumn(row) {
                app.savePage();
                window.location.href = "http://" + app.saveParams.domainUrl + "/product/" + row.id + ".html";
            },
            showDetail: function showDetail(p) {
                app.savePage();
                window.location.href = "http://" + app.saveParams.domainUrl + "/product/" + p.id + ".html";
            },
            setSelectedProduct: function setSelectedProduct(p) {
                this.selectedProduct = p;
            },
            selectedClass: function selectedClass(p) {
                if (this.selectedProduct == p) return {
                    'border': '2px solid red'
                };
                return {
                    'border': '1px solid #ccc'
                };
            },
            pictureClick: function pictureClick() {},
            imgLoad: function imgLoad($event) {},
            loading: function loading(k) {
                if (this.loadedImage[k]) this.loadedImage[k] = false;
                return !this.loadedImage[k];
            },
            loaded: function loaded(k) {
                this.loadedImage[k] = true;
            },
            paging: function paging(i, n) {
                var capa = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.capacity;

                var start = (i - 1) * parseInt(capa);
                var end = start + parseInt(capa);
                return start <= n && end > n;
            },
            customTotal: function customTotal(capa) {
                return Math.ceil(this.products.length / capa);
            },
            slide: function slide() {
                setTimeout(function () {
                    var swiper = new Swiper('.swiperContainer6', {
                        slidesPerView: 2.3,
                        spaceBetween: 10
                    });
                }, 300);
                setTimeout(function () {
                    var swiper = new Swiper('.swiperContainer7', {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        slidesPerGroup: 2,
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet',
                            bulletActiveClass: 'swiper-pagination-bullet-active my-bullet-type1-active'
                        }
                    });
                }, 300);
            }
        }
    };
});