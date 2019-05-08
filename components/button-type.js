'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                type: Object,
                default: {
                    text: '按钮',
                    subtitle: '副标题',
                    image: {
                        src: '',
                        hoverSrc: '',
                        style: {
                            width: '100px',
                            height: '200px'
                        },
                        margin: '0px',
                        link: 'www.baidu.com',
                        useDefaultMargin: true,
                        desc: '图片描述',
                        repeat: 'no-repeat',
                        size: 'cover',
                        position: 'center'
                    },
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: ''
                    },
                    btnStatus: 'btn-type-1',
                    btnBg: '',
                    btnBgImg: '',
                    title: '',
                    hoverColor: '',
                    'font-size': 14,
                    color: '',
                    style: {
                        width: '280px',
                        height: '100px',
                        opacity: 1,
                        'border-radius': '0px',
                        'background-image': '',
                        'border-style': 'solid',
                        'border-color': 'black',
                        'border-width': '1px',
                        'border-bottom': 'medium none'
                    },
                    titleBarStyle: {
                        show: false
                    },
                    container: {
                        common: {}
                    },
                    def: {},
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': 'inherit',
                        'background-image': ''
                    },
                    current_1: 0,
                    current_2: 0
                }
            },
            editingConfig: {
                default: {
                    color1: '#cccccc',
                    title: '按钮组件',
                    pages: {
                        "常规": {
                            text: {
                                config: {
                                    text: '按钮名称',
                                    placeholder: '请输入按钮名称'
                                },
                                component: 'dialog/text'
                            },
                            fontSize: {
                                config: {
                                    text: '文字大小'
                                },
                                component: 'dialog/setting/btn-font-size'
                            },
                            fontColor: {
                                config: {
                                    text: '文字颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            fontHoverColor: {
                                config: {
                                    text: '文字悬浮颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            btnHoverColor: {
                                config: {
                                    text: '按钮悬浮颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            image: {
                                config: {
                                    name: '样式:',
                                    current_1: 0,
                                    current_2: 99,
                                    selected: '0',
                                    showStyle: '2',
                                    radio: [{
                                        name: '默认',
                                        value: '0'
                                    }],
                                    showList: [{
                                        name: '平铺',
                                        value: '0'
                                    }, {
                                        name: '拉伸',
                                        value: '1'
                                    }, {
                                        name: '填充',
                                        value: '2'
                                    }],
                                    text: '按钮样式:',
                                    cellList: [{
                                        imgSrc: 'images/components/1-0.png',
                                        value: 'btn-type-1'
                                    }, {
                                        imgSrc: 'images/components/1-2.png',
                                        value: 'btn-type-3'
                                    }, {
                                        imgSrc: 'images/components/1-3.png',
                                        value: 'btn-type-4'
                                    }],
                                    colorSize: '按钮颜色:',
                                    colorList: [{
                                        color: '#FF3B30'
                                    }, {
                                        color: '#FF9500'
                                    }, {
                                        color: '#FFCC00'
                                    }, {
                                        color: '#4CD964'
                                    }, {
                                        color: '#007AFF'
                                    }, {
                                        color: '#5856D6'
                                    }]
                                },
                                component: 'dialog/editing/button-style'
                            }
                        }
                    }
                }
            },
            //设置属性对话框的配置
            settingConfig: {
                "set": {
                    test: {
                        component: 'dialog/setting/article-set-area'
                    }
                }
            }
        },
        data: function data() {
            return {
                style: {},
                BC: ''
            };
        },

        methods: {
            hover: function hover(event) {
                if (this.model.btnStatus == 'btn-type-1') {
                    if (this.model.fontHoverColor) this.style['color'] = this.model.fontHoverColor;
                    if (this.model.btnHoverColor) this.style['background-color'] = this.model.btnHoverColor;
                    if (this.model.image.hoverSrc) this.style['background-image'] = 'url(' + this.model.image.hoverSrc + ')';
                } else if (this.model.btnStatus == 'btn-type-3') {
                    if (this.model.fontHoverColor) this.style['color'] = this.model.fontHoverColor;
                    if (this.model.btnHoverColor) this.style['border-color'] = this.model.btnHoverColor;
                    if (this.model.image.hoverSrc) this.style['background-image'] = 'url(' + this.model.image.hoverSrc + ')';
                } else if (this.model.btnStatus == 'btn-type-4') {
                    if (this.model.fontHoverColor) this.style['color'] = this.model.fontHoverColor;
                    if (this.model.btnHoverColor) this.style['background-color'] = this.model.btnHoverColor;
                    if (this.model.image.hoverSrc) this.style['background-image'] = 'url(' + this.model.image.hoverSrc + ')';
                }
                event.stopPropagation();
            },
            out: function out(event) {
                if (this.model.btnStatus == 'btn-type-1') {
                    this.style['color'] = this.model.fontColor ? this.model.fontColor : '#fff';
                    this.style['background-color'] = this.model.btnBg ? this.model.btnBg : '#0094ff';
                    this.style['background-image'] = this.model.image.src ? 'url(' + this.model.image.src + ')' : undefined;
                } else if (this.model.btnStatus == 'btn-type-3') {
                    if (this.model.fontHoverColor) this.style['color'] = this.model.fontColor ? this.model.fontColor : this.BC;
                    if (this.model.btnHoverColor) this.style['border-color'] = this.BC;
                    if (this.model.image.hoverSrc) this.style['background-image'] = 'url(' + this.model.image.src + ')';
                } else if (this.model.btnStatus == 'btn-type-4') {
                    this.style['color'] = this.model.fontColor ? this.model.fontColor : '#fff';
                    this.style['background-color'] = this.model.btnBg ? this.model.btnBg : '#0094ff';
                    this.style['background-image'] = this.model.image.src ? 'url(' + this.model.image.src + ')' : undefined;
                }
                event.stopPropagation();
            }
        },
        watch: {
            model: {
                handler: function handler() {
                    if (this.model.btnStatus == 'btn-type-1') {
                        this.style = {
                            'color': this.model.fontColor ? this.model.fontColor : '#fff',
                            'border-radius': '5px',
                            'background-color': this.model.btnBg ? this.model.btnBg : '#0094ff',
                            'background-image': this.model.image.src ? 'url(' + this.model.image.src + ')' : undefined,
                            'background-position': this.model.image.position,
                            'background-repeat': this.model.image.repeat,
                            'background-size': this.model.image.size
                        };
                    } else if (this.model.btnStatus == 'btn-type-3') {
                        this.BC = this.model.btnBg ? this.model.btnBg : '#0094ff';
                        this.style = {
                            'color': this.model.fontColor && this.model.fontColor != '' ? this.model.fontColor : this.BC,
                            'border': '1px solid ' + this.BC,
                            'background-color': 'transparent',
                            'background-image': this.model.image.src ? 'url(' + this.model.image.src + ')' : undefined,
                            'background-position': this.model.image.position,
                            'background-repeat': this.model.image.repeat,
                            'background-size': this.model.image.size
                        };
                    } else if (this.model.btnStatus == 'btn-type-4') {
                        this.style = {
                            'color': this.model.fontColor ? this.model.fontColor : '#fff',
                            'border-radius': this.model.style.height,
                            'background-color': this.model.btnBg ? this.model.btnBg : '#0094ff',
                            'background-image': this.model.image.src ? 'url(' + this.model.image.src + ')' : undefined,
                            'background-position': this.model.image.position,
                            'background-repeat': this.model.image.repeat,
                            'background-size': this.model.image.size
                        };
                    }
                    this.style['font-size'] = this.model['font-size'] + "px";
                },

                deep: true
            }
        }
    };
});