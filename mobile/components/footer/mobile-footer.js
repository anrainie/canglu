'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                default: {
                    link: {}
                }
            },
            setting: {
                default: {
                    config: {
                        def: 0,
                        bgStyle: 0
                    }
                }
            },
            settingConfig: {
                default: {
                    title: '导航编辑',
                    pages: {
                        '样式': {

                            'background-color': {
                                config: {
                                    text: '背景颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'color': {
                                config: {
                                    text: '文本颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'activeColor': {
                                config: {
                                    text: '选中颜色'
                                },
                                component: 'dialog/color-picker'
                            }
                        },
                        '链接列表': {
                            'navList': {
                                config: {
                                    text: '链接'
                                },
                                component: 'dialog/editing/mobileFooterList'
                            }
                        }
                    }
                }
            }
        },
        data: function data() {
            return {
                pages: app.firstParentId,
                imgSrc: '',
                showBtns: false,
                canvasStyle: {},
                setting: {},
                showFooter: false
            };
        },

        computed: {
            autoFooter: function autoFooter() {
                if ($(window).width() === 375 && $(window).height() === 812) {
                    return "height:89px;";
                } else {
                    return "height:55px;";
                }
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
            }
        },
        created: function created() {},
        mounted: function mounted() {
            var _this = this;

            if (this.pages) {
                this.treefy();
            }
            setTimeout(function () {
                var firstPageId = "";
                var h = window.location.href;
                var list = _this.model.navList;
                if (window.location.href.indexOf('?pageid') > -1) {
                    for (var k in list) {
                        if (list[k].link.type == 1) {
                            if (h.indexOf(list[k].link.local) > -1) {
                                list[k].actived = true;
                            } else {
                                list[k].actived = false;
                            }
                        }
                    }
                } else {
                    for (var i in _this.pages) {
                        if (_this.pages[i].columnCode == 'index') {
                            firstPageId = _this.pages[i].id;
                        }
                    }
                    for (var k in list) {
                        if (list[k].link.type == 1) {
                            if (list[k].link.local == firstPageId) {
                                list[k].actived = true;
                            } else {
                                list[k].actived = false;
                            }
                        }
                    }
                }
                _this.showFooter = true;
            }, 500);
        },

        methods: {
            chanPage: function chanPage(id) {
                app.changePage(id);
            },
            handleSelect: function handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            editNav: function editNav() {
                var self = this;
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.settingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        for (var _k in model) {
                            self.model[_k] = model[_k];
                        }
                    });
                });
            },
            treefy: function treefy() {
                var self = this;
                var navList = self.model.navList;
                var footList = [{
                    'name': '导航名称',
                    'imgSrc': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-1.png',
                    'activeImg': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-1.png',
                    'isShow': true,
                    'isUpdate': false,
                    'link': {
                        type: 0, //0-无 //1-本地 2-自定义
                        local: '',
                        open: '_blank',
                        net: ''
                    },
                    'actived': false
                }, {
                    'name': '导航名称',
                    'imgSrc': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-2.png',
                    'activeImg': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-2.png',
                    'isShow': true,
                    'isUpdate': false,
                    'link': {
                        type: 0, //0-无 //1-本地 2-自定义
                        local: '',
                        open: '_blank',
                        net: ''
                    },
                    'actived': false
                }, {
                    'name': '导航名称',
                    'imgSrc': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-3.png',
                    'activeImg': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-3.png',
                    'isShow': true,
                    'isUpdate': false,
                    'link': {
                        type: 0, //0-无 //1-本地 2-自定义
                        local: '',
                        open: '_blank',
                        net: ''
                    },
                    'actived': false
                }, {
                    'name': '导航名称',
                    'imgSrc': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-4.png',
                    'activeImg': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-4.png',
                    'isShow': true,
                    'isUpdate': false,
                    'link': {
                        type: 0, //0-无 //1-本地 2-自定义
                        local: '',
                        open: '_blank',
                        net: ''
                    },
                    'actived': false
                }];
                self.model.navList = navList != 'undefined' && navList.length > 0 ? navList : footList;
            }
        }
    };
});