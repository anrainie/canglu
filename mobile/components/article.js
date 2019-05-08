'use strict';

define(['vueLoader'], function (loader) {
    return {
        components: {
            cptborder: loader.load('cptborder')
        },
        props: {
            model: {
                //这里是图文组件的示例
                default: {
                    title: '图文组件',
                    subtitle: '副标题',
                    type: 0, //0-6中选
                    image: {
                        src: 'http://0.ss.faisys.com/image/default/demo.png',
                        style: {
                            width: '314px',
                            height: '210px'
                        },
                        defMargin: true,
                        margin: '0px',
                        link: {
                            type: 0, //0-无 //1-本地 2-自定义
                            local: '',
                            open: '_blank',
                            net: ''
                        },
                        useDefaultMargin: true,
                        desc: '图片描述样式'
                    },
                    titleVisible: true,
                    style: {
                        width: '100%'
                    },
                    useDefaultMargin: true,
                    content: '请填写文本内容',
                    container: {
                        common: {}
                    },
                    firstStyle: {
                        'text-indent': '2em'
                    },
                    def: {
                        defheight: true,
                        height: '400px',
                        defbackground: true,
                        'background-color': '#fff',
                        'background-image': '',
                        defborder: false,
                        'border-style': 'solid',
                        'border-color': '#ccc',
                        'border-width': '1px',

                        'border': '1px solid #ccc',

                        'border-left': '',
                        'border-right': '',
                        'border-top': '',
                        'border-bottom': '',

                        defTitle: 0,
                        defSubTitle: 0,
                        defTitleBackground: false
                    }

                }
            }
        },
        mounted: function mounted() {
            if (this.model.type >= 7) {
                this.model.type = this.model.type - 7;
            }
            this.model.content = app.recoverSymbol(this.model.content);
            var width = this.model.image.style.width == undefined ? '200px' : this.model.image.style.width;
            var height = this.model.image.style.height == undefined ? '200px' : this.model.image.style.height;
            this.model.image.style.width = app.mobileFit(width);
            this.model.image.style.height = app.mobileFit(height);
        },

        computed: {
            imageHref: function imageHref() {
                switch (this.model.image.link.type) {
                    case 0:
                        return 'javascript:void(0)';
                    case 1:
                        return this.model.image.link.local;
                    case 2:
                        return this.model.image.link.net;
                }
                return 'javascript:void(0)';
            },
            imageMargin: function imageMargin() {
                return this.model.image.defMargin ? '5px' : this.model.image.margin;
            },
            type5Style: function type5Style() {
                var style = this.model.image.style;
                style['margin-left'] = this.model.image.margin;
                return style;
            },
            imgContainerStyle: function imgContainerStyle() {
                var style = this.model.image.style;

                return style;
            },
            content: function content() {
                return app.recoverSymbol(this.model.content);
            }
        },
        data: function data() {
            return {
                //编辑内容对话框的配置
                editingConfig: {
                    title: '创建图文组件',
                    pages: {
                        "常规": {
                            title: {
                                config: {
                                    text: '组件标题',
                                    placeholder: '请填写组件名'
                                },
                                component: 'dialog/text'
                            },
                            type: {
                                config: {
                                    text: '组件样式：',
                                    style: {
                                        width: '80px',
                                        height: '50px'
                                    },
                                    options: [{
                                        text: '纯文字',
                                        image: './images/stylelist/buju_a.png'
                                    }, {
                                        text: '图上文下',
                                        image: './images/stylelist/buju_b.png'
                                    }, {
                                        text: '图下文上',
                                        image: './images/stylelist/buju_c.png'
                                    }, {
                                        text: '图左文右',
                                        image: './images/stylelist/buju_d.png'
                                    }, {
                                        text: '图右文左',
                                        image: './images/stylelist/buju_e.png'
                                    }, {
                                        text: '图左上',
                                        image: './images/stylelist/buju_f.png'
                                    }, {
                                        text: '图右上',
                                        image: './images/stylelist/buju_g.png'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            },
                            image: {
                                component: 'dialog/editing/image'
                            },

                            content: {
                                config: {
                                    text: '文字编辑'
                                },
                                component: 'dialog/editing/ue-editor'
                            }
                        },
                        "高级": {
                            showMore: {
                                component: 'dialog/editing/pt-showmore'
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
            };
        }
    };
});