define(['vueLoader'], function(loader) {
    return {
        components: {
            himg: loader.load('widget/hover-image')
        },
        props: {
            model: {
                default: {
                    type: 0,
                    images: [],
                    imageContainerStyle: {
                        width:'200px',
                        height: '150px',
                        'margin-left': '20px',
                        'margin-top': '20px'
                    },
                    imageStyle: {
                        width: '100%',
                        height: '100%'
                    },
                    imageSetting: {
                        descVisible: true,
                        clickEffect: 0, //0无效果 1幻灯片 2图片链接
                        open: 1 //0当前窗口 1新窗口
                    },
                    style: {
                        width: '928px',
                        height: '500px'
                    },
                    title: '列表多图',
                    subtitle: '副标题',
                    hoverEffect: 1,
                    sliderEffect: 0,
                    showPage: false,
                    capacity: 4,
                    animation: 'fadeIn',
                    animateSetting: {
                        'animation-duration': '2s',
                        'animation-delay': '1s'
                    },
                    'z-index': '11'
                }
            },

            editingConfig: {
                default: {
                    title: '添加模块(列表多图)',
                    pages: {
                        '常规': {
                            images: {
                                component: 'dialog/editing/imagePanel'
                            }
                        },
                        '组件样式': {
                            type: {
                                config: {
                                    style: {
                                        width: '200px',
                                        height: '100px'
                                    },
                                    options: [{
                                        channel: 1,
                                        image: './images/components/imgs-sty1.png',
                                        text: '多行排布'
                                    }, {
                                        channel: 1,
                                        image: './images/components/imgs-sty2.png',
                                        text: '单行排布'
                                    }, {
                                        channel: 1,
                                        image: './images/components/imgs-sty3.gif',
                                        text: '左滚动排布'
                                    }, {
                                        channel: 1,
                                        image: './images/components/imgs-sty4.gif',
                                        text: '右滚动排布'
                                    }, {
                                        channel: 2,
                                        image: './images/components/mobile-imglist-1.png',
                                        text: '多行排布'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            }
                        },
                        '悬停特效': {
                            hoverEffect: {
                                component: 'dialog/editing/hover-effect'
                            }
                        },
                        '高级': {
                            showPage: {
                                component: 'dialog/editing/paginationEdit'
                            },
                            imageSetting: {
                                component: 'dialog/editing/imageSetting',
                            },
                            imageContainerStyle: {
                                config: {
                                    text: '图片大小'
                                },
                                component: 'dialog/editing/size'
                            }
                        }
                    }
                }
            },
            settingConfig: {}
        },
        data: function data() {
            return {
                currentPage: 0,
                config: ['', '', '', '', '', '', ''],
                imgbox: {
                    width: '',
                    height: '',
                    overflow: 'hidden',
                    position: 'absolute',
                    'margin-left': '0px'
                },
                timeId: 0
            };
        },

        computed: {
            carouselPosition: function carouselPosition() {
                return this.model.showPage ? 'outside' : 'none';
            },
            imageContainerStyle: function imageContainerStyle() {
                var x = {
                    'width': this.model.imageContainerStyle.width,
                    'height': this.model.imageContainerStyle.height,
                    'margin-left': this.model.imageContainerStyle['margin-left'],
                    'margin-top': this.model.imageContainerStyle['margin-top']
                };
                return x;
            },
            showDesc: function showDesc() {
                return this.model.hoverEffect < 5 && this.model.imageSetting.descVisible;
            },
            swiperId: function swiperId() {
                return this._uid + "swiper";
            },
            length: function length() {
                return Math.ceil(this.model.images.length / this.model.capacity);
            },
            clickEffect: function clickEffect() {
                return this.model.imageSetting.clickEffect;
            }
        },
        mounted: function mounted() {
            var width = this.model.imageContainerStyle.width === undefined ? '175px' : this.model.imageContainerStyle.width;
            var height = this.model.imageContainerStyle.height === undefined ? '150px' : this.model.imageContainerStyle.height;
            var marginLeft = this.model.imageContainerStyle['margin-left'] === undefined ? '5px' : this.model.imageContainerStyle['margin-left'];
            var marginTop = this.model.imageContainerStyle['margin-top'] === undefined ? '5px' : this.model.imageContainerStyle['margin-top'];
            this.model.imageContainerStyle.width = app.mobileFit(width);
            this.model.imageContainerStyle.height = app.mobileFit(height);
            this.model.imageContainerStyle['margin-left'] = app.mobileFit(marginLeft);
            this.model.imageContainerStyle['margin-top'] = app.mobileFit(marginTop);
        },
        watch: {
            'model.type':function() {
               this.adjustment();
            },
            'model.imageContainerStyle':function(){
                this.adjustment();
            }
        },
        methods: {
		   adjustment:function(){
                if (this.model.type === 2 || this.model.type === 3 || this.model.type === 5 || this.model.type === 6) {
                    this.carousel();
                } else {
                    clearInterval(this.timeId)
                }
            },
            clickImg: function clickImg(im, index) {
                if (this.clickEffect === 1) {
                    //幻灯片
                    lantern.open(this.model, index);
                    return true;
                }
                return true;
            },
            getLink: function getLink(im) {
                var x = this.clickEffect === 1 ? 'javascript:void(0);' : im.link;
                return x;
            },
            paging: function paging(i) {
                var start = this.currentPage * parseInt(this.model.capacity);
                var end = start + parseInt(this.model.capacity);
                return start <= i && end > i;
            },
            p: function p(i, n) {
                var start = (i - 1) * parseInt(this.model.capacity);
                var end = start + parseInt(this.model.capacity);
                return start <= n && end > n;
            },
            carousel: function carousel() {
                var _this = this;
                setTimeout(function () {
                    clearInterval(_this.timeId);
                    var width = parseInt(_this.model.imageContainerStyle.width);
                    var height = parseInt(_this.model.imageContainerStyle.height);
                    var mLeft = parseInt(_this.model.imageContainerStyle['margin-left']);
                    var length = _this.model.images.length;
                    var mTop = parseInt(_this.model.imageContainerStyle['margin-top']);
                    _this.imgbox.width = (width + mLeft) * length * 2 + "px";
                    _this.imgbox.height = (height +40 ) + "px";
                    var imgbox = document.getElementById('imgbox');
                    var i = 0;
                    if (_this.model.type === 3 || _this.model.type === 6) i = -(width + mLeft) * length;
                    _this.timeId = setInterval(function () {
                        if (_this.model.type === 2 || _this.model.type === 5) {
                            i--;
                            imgbox.style['margin-left'] = i + 'px';
                            if (-parseInt(_this.imgbox.width) / 2 === parseInt(imgbox.style['margin-left'])) i = 0;
                        } else if (_this.model.type === 3 || _this.model.type === 6) {
                            i++;
                            imgbox.style['margin-left'] = i + 'px';
                            if (parseInt(imgbox.style['margin-left']) === 0) i = -( width + mLeft) * length
                        }
                    }, 20);
                }, 100);
            }
        }
    };
});