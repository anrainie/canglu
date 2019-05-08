'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['vueLoader'], function (loader) {
    var _default;

    return {
        props: {
            model: {
                default: (_default = {
                    title: '分类目录',
                    subtitle: '副标题'
                }, _defineProperty(_default, 'subtitle', ''), _defineProperty(_default, 'style', {
                    width: '180px',
                    height: '',
                    overflow: 'none'
                }), _defineProperty(_default, 'titlestyle', {
                    width: '100%',
                    height: '40px',
                    'font-size': '16px',
                    'color': '#fff',
                    'padding-left': '20px',
                    'line-height': '40px'
                }), _defineProperty(_default, 'listyleOne', {
                    width: '100%',
                    height: '40px',
                    'padding-left': '20px',
                    'padding-right': '20px',
                    'line-height': '40px',
                    'border-bottom': '1px dashed #b8b8b8'
                }), _defineProperty(_default, 'listyleTwo', {
                    width: '100%',
                    'line-height': '40px'
                }), _defineProperty(_default, 'background-color', '#e6e6e6'), _defineProperty(_default, 'hoverColor', '#AAA'), _defineProperty(_default, 'type', 0), _defineProperty(_default, 'cates', []), _defineProperty(_default, 'totalModule', '0'), _defineProperty(_default, 'classification', '0'), _defineProperty(_default, 'Lower', '0'), _defineProperty(_default, 'Expansion', '0'), _defineProperty(_default, 'defaultLShow', '0'), _defineProperty(_default, 'classify', []), _defineProperty(_default, 'backgroundStyle', {
                    useDefault: true,
                    'background-color': 'inherit',
                    'background-image': ''
                }), _defineProperty(_default, 'titleBarStyle', {
                    show: true,
                    'background-color': '#5ca6e2',
                    'border-radius': ''
                }), _defineProperty(_default, 'openMod', '_blank'), _default)
            },
            editingConfig: {
                default: {
                    title: '编辑组件（分类目录）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题'
                                },
                                component: 'dialog/text'
                            },
                            type: {
                                config: {
                                    text: '分类列表'
                                },
                                component: 'dialog/editing/classifyList'
                            }
                        },
                        '高级': {
                            // totalModule: {
                            //     config: {
                            //         text: '全站模块：',
                            //         radio: [{
                            //             name: '启动',
                            //             value: '0'
                            //         },
                            //             {
                            //                 name: '停用',
                            //                 value: '1'
                            //             }
                            //         ]
                            //     },
                            //     component: 'dialog/radio'
                            // },
                            classification: {
                                config: {
                                    text: '分类图标：',
                                    radio: [{
                                        name: '显示',
                                        value: '0'
                                    }, {
                                        name: '隐藏',
                                        value: '1'
                                    }]
                                },
                                component: 'dialog/radio'
                            },
                            Lower: {
                                config: {
                                    text: '有下级菜单时：',
                                    radio: [{
                                        name: '上级菜单可点击',
                                        value: '0'
                                    }, {
                                        name: '不可点击',
                                        value: '1'
                                    }]
                                },
                                component: 'dialog/radio'
                            },
                            Expansion: {
                                config: {
                                    name: '展开方式:',
                                    selected: '0',
                                    radio: [{
                                        name: '点击展开',
                                        value: '0'
                                    }, {
                                        name: '滑动展开',
                                        value: '1'
                                    }],
                                    showList: {
                                        name: '默认展开',
                                        value: '0',
                                        radio: [{
                                            name: '是',
                                            value: '0',
                                            imgSrc: './images/components/Expansion_true.png'
                                        }, {
                                            name: '否',
                                            value: '1',
                                            imgSrc: './images/components/Expansion_false.png'
                                        }]
                                    },
                                    imgSrc: './images/components/Expansion.png'
                                },
                                component: 'dialog/editing/chassifyShow'
                            }
                        }
                    }
                }
            },
            settingConfig: {
                default: {
                    visible: true
                }
            }
        },
        data: function data() {
            return {};
        },

        watch: {},
        computed: {},
        mounted: function mounted() {
            if (this.model.Expansion === "0" && this.model.defaultLShow === "0") {
                var ele = $(".classifyShow");
                for (var i = 0; i < ele.length; i++) {
                    ele[i].style.display = 'block';
                }
            } else if (this.model.Expansion === "0" && this.model.defaultLShow === "1") {
                var _ele = $(".classifyShow");
                for (var _i = 0; _i < _ele.length; _i++) {
                    _ele[_i].style.display = 'none';
                }
            }
        },

        methods: {
            click: function click(item) {
                if (!app.isPreview) return;
                if (this.model.Lower == 1 && this.model.upChannel == 0) return;
                if (item.pName == '栏目') {
                    if (item.localLink.indexOf('http') > -1 || item.localLink.indexOf('https') > -1) {
                        if (item.blankYn == 0) {
                            window.open(item.localLink);
                            return;
                        }
                        window.location.href = item.localLink;
                    } else {
                        if (item.blankYn == 0) {
                            window.open('?pageid=' + item.localLink);
                            return;
                        }
                        window.location.href = '?pageid=' + item.localLink;
                    }
                } else {
                    if (item.blankYn == 0) {
                        window.open(item.localLink);
                        return;
                    }
                    window.location.href = item.localLink;
                }
            },
            hover: function hover(i) {
                if (this.model.Expansion === "1") {
                    if (this.model.classify[i].children && this.model.classify[i].children.length > 0) {
                        var ele = this.$refs[i][0].children[3];
                        ele.style.display = 'block';
                    }
                }
            },
            out: function out(i) {
                if (this.model.Expansion === "1") {
                    if (this.model.classify[i].children && this.model.classify[i].children.length > 0) {
                        var ele = this.$refs[i][0].children[3];
                        ele.style.display = 'none';
                    }
                }
            },
            cShow: function cShow(i) {
                if (this.model.classify[i].children && this.model.classify[i].children.length > 0) {
                    var ele = this.$refs[i][0].children[1];
                    var ed = ele.style.display;
                    if (ed === 'none') {
                        ele.style.display = 'block';
                    } else if (ed === 'block') {
                        ele.style.display = 'none';
                    }
                }
            }
        }
    };
});