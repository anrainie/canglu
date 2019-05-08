'use strict';

define([], function () {
    return {
        props: {
            model: {
                default: {
                    currentPage: 0,
                    title: '产品展示',
                    titleBarStyle: {
                        show: false
                    },
                    subtitle: '副标题',
                    type: 0,
                    hoverEffect: 0,
                    productIds: [],
                    style: {
                        width: '1200px',
                        height: '552px',
                        'overflow-x': 'hidden'
                    },
                    imageContainerStyle: {
                        width: '200px',
                        'margin-left': '20px',
                        'margin-top': '20px'
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
                                'display': '-webkit-box',
                                '-webkit-line-clamp': '1',
                                '-webkit-box-orient': 'vertical',
                                'white-space': 'normal',
                                'overflow': 'hidden',
                                'font-size': '14px',
                                'color': '#000',
                                'line-height': '20px'
                            },
                            label: '产品名字'
                        }, {
                            key: 'price',
                            visible: true,
                            fixed: true,
                            prefix: '¥',
                            style: {
                                'font-size': '14px',
                                'color': '#f12305',
                                'line-height': '20px'
                            },
                            label: '价格(交易价格)'
                        }, {
                            key: 'marketPrice',
                            visible: true,
                            fixed: false,
                            prefix: '¥',
                            style: {
                                'font-size': '12px',
                                'line-height': '20px',
                                'color': '#ccc',
                                'text-decoration': 'line-through'
                            },
                            label: '价格(市场价格)'
                        }, {
                            key: 'spu',
                            visible: true,
                            fixed: false,
                            prefix: '编号:',
                            style: {
                                'font-size': '14px',
                                'color': '#ccc',
                                'line-height': '20px'
                            },
                            label: '编号'
                        }]
                    },
                    showConfig: {
                        showPage: true, //是否分页
                        capacity: 10, //产品个数
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
                                        channel: 1,
                                        text: '纯文本展示',
                                        image: './images/components/product-style1.png'
                                    }, {
                                        channel: 1,
                                        text: '横向平铺样式',
                                        image: './images/components/product-style2.png'
                                    }, {
                                        channel: 1,
                                        text: '走马灯展示',
                                        image: './images/components/imgs-sty4.gif'
                                    }, {
                                        channel: 1,
                                        text: '箭头滚动展示',
                                        image: './images/components/product-style4.png'
                                    }, {
                                        channel: 1,
                                        text: '两列图文展示',
                                        image: './images/components/product-style5.png'
                                    }, {
                                        channel: 1,
                                        text: '首图全文展示',
                                        image: './images/components/product-style6.png'
                                    }, {
                                        channel: 1,
                                        text: '单列图文展示',
                                        image: './images/components/product-style7.png'
                                    }, {
                                        channel: 2,
                                        text: '纯文本展示',
                                        image: './images/components/img_cpzs_zj_a.png'
                                    }, {
                                        channel: 2,
                                        text: '纯文本展示',
                                        image: './images/components/img_cpzs_zj_b.png'
                                    }, {
                                        channel: 2,
                                        text: '横向平铺样式',
                                        image: './images/components/img_cpzs_zj_c.png'
                                    },
                                    /*,
                                     {
                                     channel:2,
                                     text: '走马灯展示',
                                     image: './images/components/img_cpzs_zj_d.png',
                                     },*/
                                    {
                                        channel: 2,
                                        text: '箭头滚动展示',
                                        image: './images/components/img_cpzs_zj_e.png'
                                    }, {
                                        channel: 2,
                                        text: '两列图文展示',
                                        image: './images/components/img_cpzs_zj_f.png'
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
                                component: 'dialog/editing/size'
                            },
                            productIds: {
                                component: 'dialog/editing/product-category-list'
                            }
                        },
                        '悬停特效': {
                            hoverEffect: {
                                config: {
                                    data: [{
                                        src: './images/components/1.png',
                                        desc: '无效果',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '0px'
                                        }
                                    }, {
                                        src: './images/components/2.png',
                                        desc: '出现边框',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }, {
                                        src: './images/components/7.png',
                                        desc: '悬浮移动',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }, {
                                        src: './images/components/6.png',
                                        desc: '悬浮放大',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }, {
                                        src: './images/components/3.png',
                                        desc: '出现放大器',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '0px'
                                        }
                                    }, {
                                        src: './images/components/4.png',
                                        desc: '图片描述蒙层',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }, {
                                        src: './images/components/5.png',
                                        desc: '图片底部表述',
                                        style: {
                                            width: '200px',
                                            height: '100px',
                                            border: '1px solid #cccccc',
                                            'margin-left': '10px'
                                        }
                                    }]

                                },
                                component: 'dialog/editing/hover-effect'
                            }
                        },
                        '展示设置': {
                            showMore: {
                                component: 'dialog/editing/pt-showmore'
                            },

                            showConfig: {
                                component: 'dialog/editing/show-product-config'
                            }
                        },
                        '展示参数': {
                            // type: {
                            //     config: {
                            //         title: '参数布局样式:',
                            //         style: {
                            //             width: '100px',
                            //             height: '70px'
                            //         },
                            //         data: [
                            //             {
                            //                 src: './images/components/product-param1.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param2.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param3.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param4.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param5.png',
                            //                 desc: '无效果',
                            //             },
                            //             {
                            //                 src: './images/components/product-param6.png',
                            //                 desc: '无效果',
                            //             },
                            //         ]
                            //     },
                            //     component: 'dialog/editing/pickrect'
                            // },
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
                timeId: -1,
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
                if (i === -1) {
                    return '300px';
                }
                return parseInt(h1.substr(0, i)) - parseInt(h2) + 'px';
            },
            wid: function wid() {
                return "width:calc(100% - " + this.model.imageStyle.width + " - 15px)";
            },
            selectedPro: function selectedPro() {
                if (this.selectedProduct == null && this.products.length > 0) {
                    this.selectedProduct = this.products[0];
                }
                return this.selectedProduct;
            },

            // argShowConfig(){
            //     return this.model.argShowConfig;
            // },
            total: function total() {
                return Math.ceil(this.products.length / this.capacity);
            },
            productList: function productList() {
                if (this.model.showConfig.showPage === false) return this.products;
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
            }
        },
        watch: {
            'model.productIds': function modelProductIds() {
                var _this = this;

                var ids = '';
                this.products = [];
                this.selectedProduct = null;
                if (!this.model.productIds.length) return;
                this.model.productIds.forEach(function (e) {
                    ids += e + ',';
                });
                ids = ids.substring(0, ids.length - 1);
                app.loadProductDetailAll(ids, function (data) {
                    _this.loading = false;
                    _this.products = data;
                });
            },
            'model.type': function modelType() {
                if (this.model.type === 2) {
                    this.carousel();
                } else {
                    clearInterval(this.timeId);
                }
            },
            'model.imageStyle': function modelImageStyle() {
                var widths = this.model.imageContainerStyle.width === undefined ? '180px' : this.model.imageStyle.width;
                this.model.imageContainerStyle.width = app.mobileFit(widths);
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
                if (this.selectedProduct === p) return {
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

            // paging(i)
            // {
            //     let end = this.start + this.capacity;
            //     return this.start <= i && end > i;
            // }
            paging: function paging(i, n) {
                var capa = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.capacity;

                var start = (i - 1) * parseInt(capa);
                var end = start + parseInt(capa);
                return start <= n && end > n;
            },
            customTotal: function customTotal(capa) {
                return Math.ceil(this.products.length / capa);
            },
            carousel: function carousel() {
                var _this2 = this;

                setTimeout(function () {
                    clearInterval(_this2.timeId);
                    var w = _this2.model.imageStyle.width;
                    var l = _this2.model.imageStyle['margin-left'];
                    var t = _this2.model.imageStyle['margin-top'];
                    if (w.indexOf('rem') > -1) {
                        w = w.replace(/rem/, '') * 16;
                    }
                    if (l && l.indexOf('rem') > -1) {
                        l = l.replace(/rem/, '') * 16;
                    }
                    if (t && t.indexOf('rem') > -1) {
                        t = t.replace(/rem/, '') * 16;
                    }
                    l = l || 0;
                    t = t || 0;

                    var width = parseInt(w);
                    var mLeft = parseInt(l);
                    var length = _this2.products.length;
                    var mTop = parseInt(t);

                    _this2.imgbox.width = (width + mLeft) * length * 2 + "px";
                    _this2.imgbox.height = width + mTop + "px";
                    var imgbox = _this2.$refs.imgbox;
                    var i = 0;
                    if (_this2.model.type === 3 || _this2.model.type === 6) i = -(width + mLeft) * length;
                    _this2.timeId = setInterval(function () {
                        // if(this.model.type==2 || this.model.type==5){
                        i--;
                        imgbox.style['margin-left'] = i + 'px';
                        if (-parseInt(_this2.imgbox.width) / 2 == parseInt(imgbox.style['margin-left'])) i = 0;
                        // } else if(this.model.type==3 || this.model.type==6){
                        //     i++;
                        //     imgbox.style['margin-left'] = i + 'px';
                        //     if(parseInt(imgbox.style['margin-left'])==0)  i=-( width+ mLeft) * length
                        // }
                    }, 20);
                }, 100);
            }
        },
        mounted: function mounted() {
            //图片大小
            if (!this.model.imageStyle) {
                this.model.imageStyle = { 'width': undefined, 'height': undefined };
            }
            var width = this.model.imageStyle.width === undefined ? '180px' : this.model.imageStyle.width;
            var height = this.model.imageStyle.height === undefined ? '180px' : this.model.imageStyle.height;
            this.model.imageStyle.width = app.mobileFit(width);
            this.model.imageStyle.height = app.mobileFit(height);
            //盒子的边距
            if (!this.model.imageContainerStyle) {
                this.model.imageContainerStyle = { 'width': undefined, 'height': undefined, 'margin-left': undefined, 'marfin-top': undefined };
            }
            var widths = this.model.imageContainerStyle.width === undefined ? '180px' : this.model.imageStyle.width;
            var marginLeft = this.model.imageContainerStyle['margin-left'] === undefined ? '5px' : this.model.imageContainerStyle['margin-left'];
            var marginTop = this.model.imageContainerStyle['margin-top'] === undefined ? '5px' : this.model.imageContainerStyle['margin-top'];
            this.model.imageContainerStyle.width = app.mobileFit(widths);
            this.model.imageContainerStyle['margin-left'] = app.mobileFit(marginLeft);
            this.model.imageContainerStyle['margin-top'] = app.mobileFit(marginTop);
        }
    };
});