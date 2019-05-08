'use strict';

define(['vueLoader', 'swiper'], function (loader, Swiper) {
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
                        height: '150px',
                        'margin-left': '5px',
                        'margin-top': '5px'
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
                        width: '100%',
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
                                        image: './images/components/mobile-imglist-1.png',
                                        text: '多行排布'
                                    }, {
                                        image: './images/components/mobile-imglist-2.png',
                                        text: '单列排布'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            }
                        },
                        '高级': {
                            imageContainerStyle: {
                                config: {
                                    text: '图片大小'
                                },
                                component: 'dialog/editing/imgListSize'
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
        created: function created() {
            this.slide();
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
            if (this.model.type == 4) {
                this.model.type = 0;
            }

            var height = this.model.imageContainerStyle.height == undefined ? '150px' : this.model.imageContainerStyle.height;
            var marginLeft = this.model.imageContainerStyle['margin-left'] == undefined ? '5px' : this.model.imageContainerStyle['margin-left'];
            var marginTop = this.model.imageContainerStyle['margin-top'] == undefined ? '5px' : this.model.imageContainerStyle['margin-top'];
            this.model.imageContainerStyle.height = app.mobileFit(height);
            this.model.imageContainerStyle['margin-left'] = app.mobileFit(marginLeft);
            this.model.imageContainerStyle['margin-top'] = app.mobileFit(marginTop);
        },

        watch: {
            'model': {
                handler: function handler() {
                    this.slide();
                },
                deep: true
            },
            'model.type': function modelType() {
                clearInterval(this.timeId);
            }
        },
        methods: {
            slide: function slide() {
                setTimeout(function () {
                    var swiper = new Swiper('.swiperContainer2', {
                        slidesPerView: 2.3,
                        spaceBetween: 10
                    });
                }, 300);
                setTimeout(function () {
                    var wiper = new Swiper('.swiperContainer3', {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        loop: true,
                        loopFillGroupWithBlank: true
                    });
                }, 300);
            },
            clickImg: function clickImg(im, index) {
                if (this.clickEffect == 1) {
                    //幻灯片
                    lantern.open(this.model, index);
                    return true;
                }
                return true;
            },
            getLink: function getLink(im) {
                if (app.isPreview) {
                    var x = im.link;
                    var u = '';
                    if (x != '' || x != null) {
                        if (x.type == 2) {
                            u = x.domain + x.net;
                        } else if (x.type == 1) {
                            if (x.local.indexOf('.html') > -1) {
                                if (x.local.indexOf('.html') > -1) {
                                    u = 'http://' + app.toSessionStorage('domainUrl') + '/' + x.local;
                                } else if (x.local.indexOf('http') > -1) {
                                    u = x.local;
                                } else {
                                    u = app.toSessionStorage('domainUrl') + '?pageid=' + x.local;
                                }
                            } else if (x.local.indexOf('http') > -1) {
                                u = x.local;
                            } else {
                                if (window.location.href.indexOf('.html') > -1) {
                                    u = 'http://' + app.toSessionStorage('domainUrl') + '/' + '?pageid=' + x.local;
                                } else {
                                    u = '?pageid=' + x.local;
                                }
                            }
                        } else if (x.type == 0) {
                            u = 'javascript:void(0)';
                        }
                    }
                    window.location.href = u;
                }
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
            }
        }
    };
});