'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(['vueLoader'], function (loader) {
    var defaultModel = {
        titleVisible: true,
        def: {
            defheight: true,
            seheight: true,
            height: '350px',
            searchH: '40px',
            defmargin: true,
            'margin-top': '0',
            'margin-bottom': '0',
            'margin-left': '0',
            'margin-right': '0',

            defbackground: true,
            'background-color': '',
            'background-image': '',
            defborder: true,
            // 'border-style': 'solid',
            // 'border-color': '#ccc',
            // 'border-width': '1px',

            // 'border': '1px solid #ccc',
            //
            // 'border-left': '',
            // 'border-right': '',
            // 'border-top': '',
            // 'border-bottom': '',

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
        // titleStyle: {
        //     'text-align': 'center',
        //     'position': 'relative',
        //     'text-aligin': 'center',
        //     'height': '40px',
        //     'color': '#ccc',
        //     'background-color': '#8BF',
        //     'font-family': '宋体',
        //     'font-size': '16px',
        //     'line-height': '50px',
        //     'font-weight': 'normal',
        //     'font-style': 'normal',
        //     'text-decoration': 'normal',
        //     'margin': '10px',
        // },
        // titleWordStyle: {},
        // subTitleWordStyle: {},
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
            delayLoad: {
                default: true
            },
            method: {
                type: Object
            },
            pmodel: {
                default: null
            },
            container: {},
            height: {},
            /*可添加组件过滤器*/
            filter: {},
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
                                            position: '50%'
                                        }
                                    }, {
                                        name: '填充',
                                        value: 2,
                                        s: {
                                            repeat: 'no-repeat',
                                            size: 'cover',
                                            position: '50%'
                                        }
                                    }]
                                },
                                component: 'dialog/editing/group-bg'
                            }
                        },
                        "设置": {
                            height: {
                                config: {
                                    name: '通栏高度:'
                                },
                                component: 'dialog/editing/group-height'
                            },
                            Differential: {
                                config: {
                                    name: '通栏差速:'
                                },
                                component: 'dialog/editing/group-differential'
                            }
                        }
                    }
                }

            },
            setting: {
                default: {
                    canvasStyle: {
                        color: '#f2f2f2',
                        src: '',
                        repeat: '',
                        size: '',
                        position: ''
                    },
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                    style: {
                        height: '300px',
                        padding: '',
                        border: {},
                        margin: ''
                    }
                }
            },
            model: {
                type: Object,
                default: {
                    cpts: []
                }
            }

        },
        create: function create() {},

        computed: {
            unit: function unit() {
                return app.unit;
            },
            canvasStyle: function canvasStyle() {
                // 通栏背景设置
                var config = {};
                if (this.setting.config.def) {
                    // 非默认背景
                    config = this.setting.canvasStyle;
                } else {
                    // 默认背景
                    config = app.groupItemconfig.settingConfig.canvasStyle;
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
                        'background-position': cs.position
                    };
                }
            },
            areaStyle: function areaStyle() {
                // 内容区修改
                var w = '100%';
                // 非通栏内容区||微端
                if (this.filter || app.channel == 2) {
                    return {
                        width: w
                    };
                } else {
                    if (!app.groupContainer.common.def) {
                        w = app.groupContainer.common.value;
                    } else {
                        w = '1200';
                    }
                }
                return {
                    width: w
                };
            },
            containerStyle: function containerStyle() {
                // 高度修改
                var h = this.height ? this.height + '' : this.setting.style.height;
                if (h.indexOf('%') > 0) {
                    h = h;
                    return;
                } else if (h.indexOf('px') == -1) {
                    h += this.unit;
                } else {
                    if (window.location.href.indexOf('detailid') > -1) {
                        if ($(this.$el).find('.proDetailsInfo').length != 0 || $(this.$el).find('.articleDetailsInfo').length != 0) {
                            h = app.detailHeight;
                        }
                        //这句输出别删
                        console.log(app.detailHeight);
                    }
                    if (app.isPreview) {
                        h = app.mobileFit(h);
                    } else {
                        h = h;
                    }
                }

                return {
                    height: h
                };
            },
            canEdit: function canEdit() {
                return !app.isPreview;
            }
        },
        watch: {
            model: function model(v) {
                var _this = this;

                //model初始化，生成元素
                if (!this.loaded || this.timeout) {
                    $(this.$refs.container).empty();
                    v.cpts.forEach(function (e) {
                        _this.loaded = true;
                        _this.append(e.__componentType, e);
                    });
                }
                if (v.cpts.length == 0) {
                    this.loaded = true;
                }
            },
            canEdit: function canEdit(v) {
                var container = this.$refs.container;
                var el = $(container);
                this.isUI(el, v);
                this.loaded = true;
            },
            pmodel: function pmodel(v) {
                this.initDrag();
            },

            setting: {
                handler: function handler(v) {},

                deep: true
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
            var _this2 = this;

            //初始化时添加
            var self = this;
            var bg = $(this.$refs.bgContainer);
            if (app.isPreview) {
                $(self.$el).removeClass('editBb');
                $('.ui-resizable-handle').css("display", 'none');
            }
            this.initDrag();
            if (!self.loaded) {
                var selfEl = $(self.$el);
                var selfOffsetY = selfEl.offset().top;
                var selfHeight = selfEl.height();

                self.model.cpts.forEach(function (e) {
                    self.loaded = true;
                    //如果在显示区域外，延时加载
                    if (_this2.delayLoad && e._offsetY) {
                        var _offsetY = selfOffsetY + e._offsetY;
                        if (e._offsetY < selfHeight) {
                            if (!loader.isAboveView(_offsetY)) {
                                loader.loadOnVisible(_offsetY, function () {
                                    self.append(e.__componentType, e);
                                });
                                return;
                            }
                        }
                    }
                    self.append(e.__componentType, e);
                });
            }
            bg.mouseenter(function () {
                if (!app.isPreview) {
                    _this2.showBtns = true;
                }
            });

            bg.mouseleave(function () {
                _this2.showBtns = false;
            });
            $(window).on("scroll", function () {
                var diff = self.setting.Differential;
                // 获取浏览器滚出去的距离
                var scrollTop = $(window).scrollTop();
                var multiple = (diff - 1) * 0.2;
                var y = 50 + parseInt(scrollTop * -(0.1 + multiple)) / 7 + '%';
                if (diff !== undefined && diff !== 0) {
                    $("#" + self._uid).css({
                        backgroundPositionY: y
                    });
                }
            });
        },

        methods: {
            resetOffsetY: function resetOffsetY() {
                // let self = this;
                // for (let i = 0; i < self.$children.length; i++) {
                //     let cpt = self.$children[i];
                //     if (cpt.$children[0] && cpt.$children[0].resetOffsetY)
                //         cpt.$children[0].resetOffsetY();
                // }
            },
            initDrag: function initDrag() {
                var _this3 = this;

                var self = this;
                // 接受组件放置通栏
                var container = this.$refs.container;
                // 如果是横幅的通栏取到横幅的坐标
                if (!container) container = this.container;
                var el = $(container);
                var Fpos = {
                    y: el.offset().top,
                    x: el.offset().left
                };

                var dropConfig = {
                    //阻止事件冒泡
                    greedy: true,
                    accept: ".dragView:not('.group-container')",
                    tolerance: "pointer",
                    over: function over(e, ui) {},
                    drop: function drop(e, ui) {
                        self.resetOffsetY();
                        // 更新当前容器的pos
                        Fpos = {
                            y: el.offset().top,
                            x: el.offset().left
                        };
                        var pos = {
                            y: ui.offset.top - Fpos.y,
                            x: ui.offset.left - Fpos.x
                            //TODO 这里需要计算offsetY
                        };var cpt = ui.helper.model.component;
                        if (cpt && (!self.filter || self.filter(cpt))) {
                            self.append(cpt, pos.x, pos.y);
                        }
                    },
                    out: function out(e, ui) {}
                };
                var resizeConfig = {
                    greedy: true,
                    handles: 's',
                    resize: function resize(e, ui) {
                        self.setting.style.height = ui.size.height + 'px';
                        self.height = ui.size.height;
                    },
                    stop: function stop(e, ui) {
                        self.setting.style.height = ui.size.height + 'px';
                        self.height = ui.size.height;
                        self.resetOffsetY();
                    }
                };

                if (this.canEdit) {
                    el.droppable(dropConfig).resizable(resizeConfig);
                    if (app.pageLoaded) {
                        setTimeout(function () {
                            _this3.loaded = true;
                            _this3.timeout = true;
                        }, 2000);
                    }
                }
            },
            isUI: function isUI(el, n) {
                // 启用/暂停拖拽
                var isAble = 'enable';
                if (!n) isAble = 'disable';
                el.resizable(isAble).droppable(isAble);
            },
            plus: function plus() {
                app.iconName = 'tplList';
            },

            /**
             * 根据模型添加元素
             */
            append: function append(component, s, y) {
                var copy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                app.iconName = '';
                var self = this;
                //根据itemModel.component(来自modulelist)创建一个vue实例
                loader.createVue(component, function (v) {
                    var create = function create(model) {
                        var fromInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                        if (model == null) throw '组件[' + component + ']定义里必须包含model!';
                        if (fromInit) {
                            self.model.cpts.push(model);
                        }

                        v.$props.model = model;
                        if (!v.copy) {
                            //用于复制组件
                            v.copy = function (c, l, t, oldModel) {
                                self.append(c, l, t, oldModel);
                            };
                        }

                        v.model.__componentType = component;

                        self.$children.push(v);
                        v.$container = self;

                        loader.append(self.$refs.container, v);

                        if (self.afterDrop) {
                            self.afterDrop(model);
                        }

                        //预览模式下不能删除
                        if (!app.isPreview) v._beforeDestroy = function () {
                            // 此if判断用来清楚 列表多图的轮播效果
                            if (component === 'imagelist') clearInterval(v.timeId);
                            //移除模型
                            var rr = self.model.cpts;
                            $(v.$el).remove();
                            // v.$destroy();
                            rr.splice($.inArray(model, rr), 1);
                        };
                    };
                    var isCopyModel = v.model;
                    var cTypes = ['font', 'add-picture', 'button-type'];
                    //参数s如果传递的是model，也执行直接初始化
                    if ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) == 'object') {
                        self.check(s);
                        create(s, false);
                        return;
                    } else {

                        // 根据拖拽的位置初始化位置
                        if (copy) isCopyModel = JSON.parse(JSON.stringify(copy));
                        if (!isCopyModel.style) isCopyModel.style = {};
                        var mobileLeft = void 0;
                        if (app.channel == 2) {
                            if (cTypes.indexOf(component) > -1) {
                                mobileLeft = s;
                            } else {
                                mobileLeft = 0;
                            }
                        } else {
                            mobileLeft = s;
                        }
                        isCopyModel.style.left = mobileLeft + self.unit;
                        isCopyModel.style.top = y + self.unit;

                        self.check(isCopyModel);
                    }

                    if (!copy && v.editingConfig && v.editingConfig.needInitial != false) {
                        //打开一个创建对话框，生成model，然后把model绑定给v，并且添加
                        self.openEditDialog(v.model, v.editingConfig, create);
                    } else {
                        //新建组件，v.model是对应组件的预设模型

                        create(JSON.parse(JSON.stringify(isCopyModel)));
                    }
                    // throw itemModel.component + '[' + itemModel.name + '] 必须具备editingConfig属性';
                });
            },
            check: function check(model) {
                if (model.checked != true) {
                    if (model.titleVisible == null) model.titleVisible = true;
                }
                if (!model.addon) {
                    model.addon = {};
                    if (!this.model.addon) {
                        this.model.addon = {
                            defBorder: true,
                            defBg: true,
                            defBgText: true,
                            bgColor: '000',
                            textColor: '#fff',
                            borderStyle: {
                                'border-color': '#222',
                                'border-style': 'solid',
                                'border-width': '1px'
                            },
                            opacity: .5,
                            fontSize: '14px',
                            textAlign: 'center'
                        };
                    }
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
                if (!model.animation) model.animation = defaultModel.animation;
                // 标题区初始化设置
                this.initProps(model, 'titleBarStyle', this.copyDefaultModel(app.titleConfig.titleBarStyle));
                this.initProps(model, 'titlePadding', this.copyDefaultModel(app.titleConfig.titlePadding));
                this.initProps(model, 'titleStyle', this.copyDefaultModel(app.titleConfig.titleStyle));
                this.initProps(model, 'subTitleStyle', this.copyDefaultModel(app.titleConfig.subTitleStyle));
                this.initProps(model, 'showMore', this.copyDefaultModel(app.titleConfig.showMore));

                //内容区
                this.initProps(model, 'paddingStyle', this.copyDefaultModel(app.contentConfig.paddingStyle));

                this.initProps(model, 'backgroundStyle', this.copyDefaultModel(app.contentConfig.backgroundStyle));

                if (model.borderStyle == null) {
                    model.borderStyle = this.copyDefaultModel(defaultModel.borderStyle);
                }
            },
            initProps: function initProps(model, key, def) {
                if (model[key]) for (var k in def) {
                    if (model[key][k] == null) model[key][k] = def[k];
                } else this.$set(model, key, def);
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
                var _this4 = this;

                //TODO 这里你来填写打开对话框的功能，config是对话框配置单，callback会把model生成一个vue

                if (config) {
                    // if (this.editDialog == null) {
                    loader.createVue('dialog/dialog', function (dialogVue) {
                        _this4.editDialog = dialogVue;
                        _this4.editDialog.setModel(model);
                        _this4.editDialog.setConfig(config);
                        //全局dialog
                        loader.fill("#tempdialog", dialogVue);
                        _this4.editDialog.open(callback);
                    });
                    //     return;
                    // }
                    // this.editDialog.setModel(model);
                    // this.editDialog.open(callback);
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
            remove: function remove() {
                this.method.del(this.pmodel);
            }
        },
        components: {
            empty: loader.load('../components/widget/cpt-empty')
        }
    };
});