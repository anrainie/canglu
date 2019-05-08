'use strict';

define(['swiper'], function (Swiper) {
    return {
        props: {
            model: {
                default: {
                    currentPage: 0,
                    title: '产品展示',
                    titleBarStyle: {
                        show: false
                    },
                    titlePadding: {
                        'padding-left': '5px',
                        'padding-top': '5px'
                    },
                    subtitle: '副标题',
                    type: 0,
                    hoverEffect: 0,
                    productIds: [],
                    style: {
                        width: '100%',
                        height: '612px',
                        'overflow-x': 'hidden'
                    },
                    imageStyle: {
                        width: '180px',
                        height: '180px'
                    },
                    argShowConfig: {
                        type: 0,
                        columns: [{
                            key: 'name',
                            visible: true,
                            fixed: true,
                            prefix: '',
                            style: {
                                'font-size': '15px',
                                'color': '#666',
                                'line-height': '20px',
                                'margin-bottom': '10px'
                            },
                            label: '产品名字'
                        }, {
                            key: 'price',
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
                            key: 'spu',
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
                    //显示更多
                    //展示设置
                    showConfig: {
                        showPage: true, //是否分页
                        capacity: 4, //产品个数


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
                    title: '编辑组件(产品展示)',
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
                                        text: '箭头滚动展示',
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
                                component: 'dialog/editing/product-category-list'
                            }
                        },
                        '展示设置': {
                            showMore: {
                                component: 'dialog/editing/pt-showmore'
                            },
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
                selectedProduct: null,
                imgbox: {
                    width: '',
                    height: '',
                    overflow: 'hidden',
                    position: 'absolute',
                    'margin-left': '0px'
                }
            };
        },

        computed: {
            carouselHeight: function carouselHeight() {
                var h1 = this.model.style.height;
                var h2 = this.model.titleBarStyle.height;
                var i = h1.indexOf('px');
                if (i == -1) {
                    return '300px';
                }
                return parseInt(h1.substr(0, i)) - parseInt(h2) + 'px';
            },
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
        watch: {
            'model.productIds': function modelProductIds() {
                var _this = this;

                var ids = '';
                this.products = [];
                this.model.productIds.forEach(function (e) {
                    ids += e + ',';
                });
                ids = ids.substring(0, ids.length - 1);
                app.loadProductDetailAll(ids, function (data) {
                    _this.loading = false;
                    _this.products = data;
                });
            },


            'model': {
                handler: function handler() {
                    if (this.model.type == 4 || this.model.type == 5) {
                        this.slide();
                    }
                },
                deep: true
            }
        },
        methods: {
            clickClumn: function clickClumn(row) {
                var self = this;
                self.showDetail(row.id);
            },
            showDetail: function showDetail(p) {
                if (this.model.showConfig.clickConfig.showType) app.changePage(app.toWebsessionStorage('pdId'), p, '', this.model.showConfig.clickConfig.detailShowType);else {
                    lantern.open({
                        images: [{
                            src: p.image,
                            desc: p.name
                        }]

                    }, 0);
                }
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
                    var swiper = new Swiper('.swiperContainer4', {
                        slidesPerView: 2.3,
                        spaceBetween: 10
                    });
                }, 300);
                setTimeout(function () {
                    var swiper = new Swiper('.swiperContainer5', {
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
        },
        mounted: function mounted() {
            if (this.model.type >= 7) {
                this.model.type = this.model.type - 7;
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
        }
    };
});