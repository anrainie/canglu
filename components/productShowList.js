'use strict';

define([], function () {
    return {
        props: {
            model: {
                default: {
                    currentPage: 0,
                    title: '商品列表',
                    subtitle: '副标题',
                    type: 0,
                    hoverEffect: 0,
                    catesIds: [],
                    productIds: [],
                    style: {
                        width: '1200px',
                        height: '552px',
                        'overflow-x': 'hidden',
                        iMRight: '10px'
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
                            key: 'name1',
                            visible: true,
                            fixed: true,
                            prefix: '',
                            style: {
                                'display': '-webkit-box',
                                '-webkit-line-clamp': '2',
                                '-webkit-box-orient': 'vertical',
                                'white-space': 'normal',
                                'overflow': 'hidden',
                                'color': '#000',
                                'line-height': '21px'
                            },
                            label: '商品名称'
                        }, {
                            key: 'mallPcPrice',
                            visible: true,
                            fixed: true,
                            prefix: '¥',
                            style: {
                                'font-size': '14px',
                                'color': 'red',
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
                            key: 'productCode',
                            visible: true,
                            fixed: false,
                            prefix: '编号:',
                            style: {
                                'font-size': '12px',
                                'line-height': '20px',
                                'color': '#ccc'
                            },
                            label: '编号'
                        }]
                    },
                    //展示设置
                    showConfig: {
                        showPage: true, //是否分页
                        capacity: 10, //产品个数
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
                                        image: './images/components/product-style3.png'
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
                                    }, {
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
                                component: 'dialog/editing/goods-category-list'
                            }
                        },
                        '悬停特效': {
                            hoverEffect: {
                                config: {
                                    style: {
                                        width: '200px',
                                        height: '100px',
                                        border: '1px solid #cccccc'
                                    },
                                    options: [{
                                        channel: 1,
                                        src: './images/components/1.png',
                                        desc: '无效果'

                                    }, {
                                        channel: 1,
                                        src: './images/components/2.png',
                                        desc: '出现边框'
                                    }, {
                                        channel: 1,
                                        src: './images/components/7.png',
                                        desc: '悬浮移动'
                                    }, {
                                        channel: 1,
                                        src: './images/components/6.png',
                                        desc: '悬浮放大'
                                    }, {
                                        channel: 1,
                                        src: './images/components/3.png',
                                        desc: '出现放大器'
                                    }, {
                                        channel: 1,
                                        src: './images/components/4.png',
                                        desc: '图片描述蒙层'
                                    }, {
                                        channel: 1,
                                        src: './images/components/5.png',
                                        desc: '图片底部表述'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            }
                        },
                        '展示设置': {
                            showConfig: {
                                component: 'dialog/editing/show-product-config'
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
            selectedPro: function selectedPro() {
                if (this.selectedProduct == null && this.products.length > 0) {
                    this.selectedProduct = this.products[0];
                }
                return this.selectedProduct;
            },
            total: function total() {
                if (this.model.showConfig.showPage === false) return 1;
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
                    if (this.products[start] !== undefined && this.products[start] != null) {
                        var oldImg = this.products[start].masterImg;
                        if (oldImg.indexOf('middle') === -1) {
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
            }
        },
        watch: {
            'model.productIds': function modelProductIds() {
                var self = this;
                if (self.model.productIds.length) self.getData();else {
                    self.selectedProduct = null;
                    self.products = [];
                }
            },
            'model.imageStyle': function modelImageStyle() {
                var widths = this.model.imageContainerStyle.width === undefined ? '180px' : this.model.imageStyle.width;
                this.model.imageContainerStyle.width = app.mobileFit(widths);
            }
        },
        methods: {
            getData: function getData() {
                var _this = this;

                var ids = '';
                this.products = [];
                this.model.productIds.forEach(function (e) {
                    ids += e + ',';
                });
                ids = ids.substring(0, ids.length - 1);
                app.loadB2CProductAll(ids, function (data) {
                    _this.products = data;
                });
            },
            clickClumn: function clickClumn(row) {
                window.open("http://" + app.saveParams.domainUrl + "/product/" + row.id + ".html");
            },
            showDetail: function showDetail(p) {
                // app.savePage();
                window.open("http://" + app.saveParams.domainUrl + "/product/" + p.id + ".html");
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
            paging: function paging(i, n) {
                var capa = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.capacity;

                var start = (i - 1) * parseInt(capa);
                var end = start + parseInt(capa);
                return start <= n && end > n;
            },
            customTotal: function customTotal(capa) {
                return Math.ceil(this.products.length / capa);
            }
        },
        mounted: function mounted() {
            if (!this.model.style.iMRight) this.model.style.iMRight = '10px';
            //图片大小
            if (!this.model.imageStyle) this.model.imageStyle = { 'width': undefined, 'height': undefined };
            var width = this.model.imageStyle.width === undefined ? '180px' : this.model.imageStyle.width;
            var height = this.model.imageStyle.height === undefined ? '180px' : this.model.imageStyle.height;
            this.model.imageStyle.width = app.mobileFit(width);
            this.model.imageStyle.height = app.mobileFit(height);
            //盒子的边距
            if (!this.model.imageContainerStyle) {
                this.model.imageContainerStyle = {
                    'width': undefined,
                    'height': undefined,
                    'margin-left': undefined,
                    'margin-top': undefined
                };
            }
            var widths = this.model.imageContainerStyle.width === undefined ? '180px' : this.model.imageStyle.width;
            // let heights = this.model.imageContainerStyle.height==undefined?'150px':this.model.imageContainerStyle.height;
            var marginLeft = this.model.imageContainerStyle['margin-left'] === undefined ? '5px' : this.model.imageContainerStyle['margin-left'];
            // let marginTop = this.model.imageContainerStyle['margin-top']==undefined?'5px':this.model.imageContainerStyle['margin-top'];
            this.model.imageContainerStyle.width = app.mobileFit(widths);
            this.model.imageContainerStyle['margin-left'] = app.mobileFit(marginLeft);
            // this.model.imageContainerStyle['margin-top'] = app.mobileFit(marginTop);
        }
    };
});