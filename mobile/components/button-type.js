'use strict';

define(['vueLoader'], function (loader) {
    return {
        components: {
            cptborder: loader.load('cptborder')
        },
        mounted: function mounted() {
            if (this.model.titleSet == undefined) {
                this.model.titleSet = {
                    isDefault: false,
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    'font-family': 'Microsoft YaHei',
                    'color': '#333'
                };
            }
        },
        data: function data() {
            return {
                defaultTitleSet: {
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    'font-family': 'Microsoft YaHei',
                    'color': '#333'
                }
            };
        },

        props: {
            model: {
                type: Object,
                default: {
                    text: '按钮',
                    titleSet: {
                        isDefault: false,
                        'font-size': '14px',
                        'font-weight': 'normal',
                        'text-decoration': 'none',
                        'font-family': 'Microsoft YaHei',
                        'color': '#333'
                    },
                    image: {
                        src: '',
                        style: {
                            width: '100px',
                            height: '50px'
                        },
                        margin: '0px',
                        link: 'www.baidu.com',
                        useDefaultMargin: true,
                        desc: '图片描述',
                        repeat: 'no-repeat',
                        size: 'cover',
                        position: 'center'
                    },
                    current_2: 0,
                    current_1: 0,
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: ''
                    },
                    btnStatus: '',
                    btnBg: 'rgb(255, 59, 48)',
                    btnBgImg: '',
                    title: '',
                    'font-size': '14px',
                    style: {
                        width: '280px',
                        height: '50px',
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
                    }
                }
            },
            editingConfig: {
                default: {
                    color1: '#cccccc',
                    title: '按钮组件',
                    pages: {
                        '常规': {
                            text: {
                                config: {
                                    text: '按钮名称',
                                    placeholder: '请输入按钮名称'
                                },
                                component: 'dialog/text'
                            },
                            image: {
                                config: {
                                    name: '样式:',
                                    current_1: '',
                                    current_2: '',
                                    selected: '0',
                                    showStyle: '2',
                                    radio: [{
                                        name: '默认',
                                        value: '0'
                                    }, {
                                        name: '自定义',
                                        value: '1'
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
                        },
                        '按钮文字': {
                            titleSet: {
                                config: {
                                    text: '文字：'
                                },
                                component: 'dialog/editing/titleSet'
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
        methods: {
            selectImage: function selectImage() {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src
                    },
                    callback: function callback(model) {
                        self.loading = true;
                        self.model[self.key].src = model.src;
                        setTimeout(function () {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            }
        },
        watch: {
            'model.titleSet': {
                handler: function handler() {
                    if (this.$refs.title) {
                        var s = this.$refs.title.style;
                        if (this.model.titleSet.isDefault) {
                            s['font-size'] = this.model.titleSet['font-size'];
                            s['font-weight'] = this.model.titleSet['font-weight'];
                            s['text-decoration'] = this.model.titleSet['text-decoration'];
                            s['font-family'] = this.model.titleSet['font-family'];
                            s['color'] = this.model.titleSet.color;
                        } else {
                            s['font-size'] = this.defaultTitleSet['font-size'];
                            s['font-weight'] = this.defaultTitleSet['font-weight'];
                            s['text-decoration'] = this.defaultTitleSet['text-decoration'];
                            s['font-family'] = this.defaultTitleSet['font-family'];
                            s['color'] = this.defaultTitleSet.color;
                        }
                    }
                },
                deep: true
            }
        }
    };
});