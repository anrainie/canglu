'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {},
            setting: {},
            editing: {
                type: Object,
                default: {
                    title: '编辑组件（通栏）',
                    pages: {
                        "常规": {
                            canvasStyle: {
                                config: {
                                    name: '通栏背景：',
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
                            },
                            showList: {
                                config: {
                                    name: '是否显示更多栏目：',
                                    label: '栏目图标显示位置：',
                                    current_2: '',
                                    selected: 0,
                                    showStyle: 0,
                                    radio: [{
                                        name: '是',
                                        value: 0
                                    }, {
                                        name: '否',
                                        value: 1
                                    }],
                                    place: [{
                                        name: '居左显示',
                                        value: 0,
                                        s: {
                                            left: 0
                                        }
                                    }, {
                                        name: '居右显示',
                                        value: 1,
                                        s: {
                                            right: 0
                                        }
                                    }]
                                },
                                component: 'dialog/editing/naviShow'
                            }
                        }
                    }
                }

            },
            settingConfig: {
                default: {
                    title: '导航编辑',
                    pages: {
                        '常规': {

                            'background-color': {
                                config: {
                                    text: '背景颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'text-color': {
                                config: {
                                    text: '文本颜色'
                                },
                                component: 'dialog/color-picker'
                            }
                            /*'active-text-color': {
                                config: {
                                    text: '选中颜色'
                                },
                                component: 'dialog/color-picker'
                            },*/
                        }
                    }
                }
            }
        },
        data: function data() {
            return {
                pages: app.firstParentId,
                activeIndex: 0,
                activeIndex2: 0,
                navList: [],
                showBtns: false,
                navs: []
            };
        },

        computed: {
            showSelect: function showSelect() {
                var showSelect = this.setting.config.showSelect;
                if (showSelect == 0) {
                    return true;
                } else {
                    return false;
                }
            },
            showPlace: function showPlace() {
                var showStyle = this.setting.config.showStyle;
                if ((navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('iPhone') > -1) && navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger") {
                    if ($(window).width() === 375 && $(window).height() === 812) {
                        if (showStyle == 0) {
                            this.setting.showStyle.s = "left:0;right:auto;padding-top:44px";
                        } else {
                            this.setting.showStyle.s = "right:0;left:auto;padding-top:44px";
                        }
                    } else {
                        if (showStyle == 0) {
                            this.setting.showStyle.s = "left:0;right:auto;padding-top:20px";
                        } else {
                            this.setting.showStyle.s = "right:0;left:auto;padding-top:20px";
                        }
                    }
                } else {
                    if (showStyle == 0) {
                        this.setting.showStyle.s = "left:0;right:auto";
                    } else {
                        this.setting.showStyle.s = "right:0;left:auto";
                    }
                }
                return this.setting.showStyle.s;
            },
            webName: function webName() {
                var n = '';
                var pageid = '';
                if (app.getRequest().pageid == undefined || app.getRequest().pageid == null) {
                    pageid = app.toWebsessionStorage('firstPage');
                } else {
                    pageid = app.getRequest().pageid;
                }
                app.toWebsessionStorage('allPageList').forEach(function (e) {
                    if (e.id == pageid) {
                        n = e.name;
                    }
                });

                return n;
            },
            canvasStyle: function canvasStyle() {
                var self = this;
                // 通栏背景设置
                var config = {};
                var height = "",
                    paddingTop = "";
                if ((navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('iPhone') > -1) && navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger") {
                    if ($(window).width() === 375 && $(window).height() === 812) {
                        height = "89px";
                        paddingTop = "44px";
                    } else {
                        height = "65px";
                        paddingTop = "20px";
                    }
                }

                if (this.setting.config.def) {
                    // 非默认背景
                    config = this.setting.canvasStyle;
                } else {
                    // 默认背景
                    config = app.groupItemconfig.settingConfig.mobileCanvasStyle;
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
                        'padding-top': paddingTop,
                        'height': height,
                        top: cs.top
                    };
                    app.headloaded = true;
                }
            }
        },
        mounted: function mounted() {
            var self = this;
            app.loadAllPages(function (res, flag) {
                if (!flag) {
                    var f = app.getFirstParentId(res.data.userPageList);
                    self.navs = f.firstParentId;
                    self.treefy();
                } else {
                    self.navs = res;
                    self.treefy();
                }
            });
            //全局注册
            // app.navigation = this;
        },

        methods: {
            chanPage: function chanPage(id, item) {
                if (app.isPreview) {
                    if (item.columnCode == 'custom') {
                        window.location.href = item.linkUrl;
                    } else {
                        app.changePage(id);
                    }
                } else {
                    if (item.columnCode == 'custom') {
                        if (item.linkUrl.indexOf('.html') > -1) {
                            window.location.href = 'http://' + app.toSessionStorage('domainUrl') + item.linkUrl;
                        } else {
                            window.location.href = item.linkUrl;
                        }
                    } else {
                        app.changePage(id);
                    }
                }
            },
            handleSelect: function handleSelect(key, keyPath) {
                //console.log(key, keyPath);
            },
            treefy: function treefy() {

                var list = {};
                var r = JSON.parse(JSON.stringify(this.navs));
                var result = [];
                r.forEach(function (e) {
                    if (list[e.menuId]) {
                        e.children = list[e.menuId].children;
                    }
                    list[e.menuId] = e;

                    if (e.parentId == 0) {
                        result.push(e);
                    } else {
                        if (list[e.parentId]) {
                            if (list[e.parentId].children == null) {
                                list[e.parentId].children = [];
                            }
                        } else {
                            list[e.parentId] = {
                                children: []
                            };
                        }
                        list[e.parentId].children.push(e);
                    }
                });
                this.navList = result;
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
                var self = this;
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.settingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        for (var k in model) {
                            self.model[k] = model[k];
                        }
                    });
                });
            }
        }
    };
});