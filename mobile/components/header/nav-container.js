'use strict';

define(['vueLoader'], function (loader) {
    var defaultModel = {
        titleVisible: true,
        def: {
            defheight: true,
            height: '400px',
            defmargin: true,
            'margin-top': '0',
            'margin-bottom': '0',
            'margin-left': '0',
            'margin-right': '0',

            defbackground: true,
            'background-color': '',
            'background-image': '',
            defborder: true,

            defTitle: 0,
            defSubTitle: 0,
            defTitleBackground: false
        },

        borderStyle: {
            'border-color': '#CCC',
            'border-width': 1,
            'border-style': 'solid',

            showBorderLeft: false,
            showBorderRight: false,
            showBorderTop: false,
            showBorderBottom: false
        },
        animation: '',
        style: {
            left: '0px',
            top: '0px',
            width: '400px',
            height: '300px',
            opacity: 1,
            'z-index': 10,
            'border-radius': '0px',
            'background-color': '',
            'background-image': '',
            'animation-duration': '0s',
            'animation-delay': '1s'

        }
    };
    app.defaultModel = defaultModel;
    return {
        props: {
            container: {},
            height: {},
            canEdit: {
                default: true
            },
            afterDrop: {
                type: Function,
                default: null
            },
            editing: {
                type: Object,
                default: {
                    title: '编辑组件（通栏）',
                    pages: {
                        "常规": {
                            canvasStyle: {
                                config: {
                                    name: '通栏背景：',
                                    current_2: '',
                                    selected: 0,
                                    showStyle: 0,
                                    radio: [{
                                        name: '默认',
                                        value: 0
                                    }, {
                                        name: '自定义',
                                        value: 1
                                    }],
                                    showList: [{
                                        name: '平铺',
                                        value: 0,
                                        s: {
                                            repeat: 'repeat',
                                            size: 'contain',
                                            position: 'unset'
                                        }
                                    }, {
                                        name: '拉伸',
                                        value: 1,
                                        s: {
                                            repeat: 'no-repeat',
                                            size: 'auto',
                                            position: 'center'
                                        }
                                    }, {
                                        name: '填充',
                                        value: 2,
                                        s: {
                                            repeat: 'no-repeat',
                                            size: 'cover',
                                            position: 'center'
                                        }
                                    }]
                                },
                                component: 'dialog/editing/group-bg'
                            }
                        }
                    }
                }

            },
            setting: {
                default: {
                    canvasStyle: {
                        color: '',
                        src: '',
                        repeat: '',
                        size: '',
                        position: '',
                        top: '0px'
                    },
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                    style: {
                        height: '300',
                        padding: '',
                        border: {},
                        margin: ''
                    }
                }
            },
            model: {},
            pages: {}

        },
        create: function create() {},

        computed: {
            unit: function unit() {
                return app.unit;
            },
            canvasStyle: function canvasStyle() {
                var self = this;
                // 通栏背景设置
                var config = {};
                if (this.setting.config.def) {
                    // 非默认背景
                    config = this.setting.canvasStyle;
                } else {
                    // 默认背景
                    config = app.groupContainer.navContainer.settingConfig.canvasStyle;
                }
                if (config != undefined) {
                    var cs = config;
                    var bg = '';
                    if (cs['src'] != undefined && cs['src'] != '')
                        // 无src 不添加url()
                        bg = 'url("' + cs.src + '")';
                    return {
                        'background-color': app.recoverSymbol(cs.color),
                        'background-image': bg,
                        'background-repeat': cs.repeat,
                        'background-size': cs.size,
                        'background-position': cs.position,
                        top: cs.top
                    };
                }
            },
            areaStyle: function areaStyle() {
                // 内容区修改
                var w = '';
                if (!app.groupContainer.common.def) {
                    w = app.groupContainer.common.value;
                } else {
                    w = '1200';
                }
                if (app.channel == 1) return {
                    width: w + 'px'
                };
                return '';
            },
            containerStyle: function containerStyle() {},
            canEdit: function canEdit() {
                return !app.isPreview;
            }
        },
        watch: {
            canEdit: function canEdit(v) {
                var container = this.$refs.container;
                var el = $(container);
                this.isUI(el, v);
                this.loaded = true;
            }
        },
        data: function data() {
            return {
                showBtns: false,
                loaded: false,
                timeout: false
            };
        },
        mounted: function mounted() {
            var _this = this;

            //初始化时添加
            var self = this;
            var bg = $(this.$refs.bgContainer);
            var nav = this.$children[0];
            // 接受组件放置通
            var container = this.$refs.container;
            // 如果是横幅的通栏取到横幅的坐标
            if (!container) container = this.container;
            var el = $(container);
            var Fpos = {
                y: el.offset().top,
                x: el.offset().left
            };
            var dragConfig = {
                containment: "parent"
            };
            var resizeConfig = {
                greedy: true,
                handles: 's',
                stop: function stop(e, ui) {
                    self.setting.style.height = ui.size.height + 'px';
                }
            };

            if (this.canEdit) {
                // .resizable(resizeConfig)
                bg.resizable({
                    stop: function stop() {
                        nav.model.style.height = self.$el.style.height;
                        self.setting.canvasStyle.height = self.$el.style.height;
                    }
                }).draggable(dragConfig);
                bg.mouseup(function () {
                    nav.model.style.left = nav.$el.style.left;
                    self.setting.canvasStyle.top = self.$el.style.top;
                });
            }

            bg.mouseenter(function () {
                _this.showBtns = true;
            });

            bg.mouseleave(function () {
                _this.showBtns = false;
            });
            var defTop = 46;
            if (app.isPreview) {
                defTop = 0;
            }
            window.addEventListener('scroll', function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var top = parseInt(self.setting.canvasStyle.top);

                if (scrollTop - defTop >= top) {
                    var css = {
                        position: 'fixed',
                        top: defTop + 'px'
                    };
                    if (!self.model.navFixed) css = {
                        position: 'absolute',
                        top: top + "px"
                    };
                    $(self.$el).css(css);
                } else {
                    $(self.$el).css({
                        'position': 'absolute',
                        'top': top + "px"
                    });
                }
            });
        },

        methods: {
            isUI: function isUI(el, n) {
                // 非预览状态才能拖拽
                if (!app.isPreview) {
                    // 启用/暂停拖拽
                    var isAble = 'enable';
                    if (!n) isAble = 'disable';
                    el.resizable(isAble).droppable(isAble);
                }
            },
            plus: function plus() {
                app.iconName = 'tplList';
            },
            check: function check(model) {

                if (model.checked != true) {
                    if (model.titleVisible == null) model.titleVisible = true;
                }

                if (model.style == null) {
                    model.style = this.copyDefaultModel(defaultModel.style);
                } else {
                    var style = this.copyDefaultModel(defaultModel.style);
                    for (var k in style) {
                        if (!model.style[k]) model.style[k] = style[k];
                    }
                }

                if (model.def == null) {
                    model.def = this.copyDefaultModel(defaultModel.def);
                } else {
                    var def = this.copyDefaultModel(defaultModel.def);
                    for (var _k in def) {
                        if (model.def[_k] == null) model.def[_k] = def[_k];
                    }
                }

                // 标题区初始化设置
                if (!model.titleBarStyle) this.$set(model, 'titleBarStyle', this.copyDefaultModel(app.titleConfig.titleBarStyle));
                if (!model.titleStyle) this.$set(model, 'titleStyle', this.copyDefaultModel(app.titleConfig.titleStyle));
                if (!model.subTitleStyle) this.$set(model, 'subTitleStyle', this.copyDefaultModel(app.titleConfig.subTitleStyle));
                if (!model.showMore) this.$set(model, 'showMore', this.copyDefaultModel(app.titleConfig.showMore));

                //内容区
                if (!model.paddingStyle) this.$set(model, 'paddingStyle', this.copyDefaultModel(app.contentConfig.paddingStyle));

                if (!model.backgroundStyle) this.$set(model, 'backgroundStyle', this.copyDefaultModel(app.contentConfig.backgroundStyle));

                if (model.borderStyle == null) {
                    model.borderStyle = this.copyDefaultModel(defaultModel.borderStyle);
                }
            },
            copyDefaultModel: function copyDefaultModel(m) {
                return JSON.parse(JSON.stringify(m));
            },

            /**
             * 打开编辑对话框
             * @param model
             * @param callback
             */
            openEditDialog: function openEditDialog(model, config, callback) {
                var _this2 = this;

                //TODO 这里你来填写打开对话框的功能，config是对话框配置单，callback会把model生成一个vue

                if (config) {
                    // if (this.editDialog == null) {
                    loader.createVue('dialog/dialog', function (dialogVue) {
                        _this2.editDialog = dialogVue;
                        _this2.editDialog.setModel(model);
                        _this2.editDialog.setConfig(config);
                        //全局dialog
                        loader.fill("#tempdialog", dialogVue);
                        _this2.editDialog.open(callback);
                    });
                } else callback(JSON.parse(JSON.stringify(model)));
            },
            edit: function edit() {
                var self = this;
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.setting);
                    self.editDialog.setConfig(self.editing);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        for (var k in model) {
                            self.setting[k] = model[k];
                        }
                    });
                });
            },
            editNav: function editNav() {
                var self = this.$children[0];
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.ingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        for (var k in model) {
                            self.model[k] = model[k];
                        }
                    });
                });
            },
            remove: function remove() {
                this._beforeDestroy();
            }
        },
        components: {
            empty: loader.load('../components/widget/cpt-empty')
        }
    };
});