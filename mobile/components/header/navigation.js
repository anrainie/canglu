'use strict';

define([], function () {
    return {
        props: {
            model: {
                default: {
                    style: {
                        width: '100%',
                        height: '60px'
                    }
                }
            },
            pages: {},
            ingConfig: {
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
                            },
                            'active-text-color': {
                                config: {
                                    text: '选中颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'font-size': {
                                config: {
                                    text: '字体大小'
                                },
                                component: 'dialog/setting/navFont'
                            },
                            'nav-fixed': {
                                config: {
                                    text: '是否悬浮'
                                },
                                component: 'dialog/setting/navFiexd'
                            }
                        }
                    },
                    resize: 'e,w'
                }
            },
            settingConfig: function settingConfig() {}
        },
        data: function data() {
            return {
                navList: [],
                casual: '',
                style: {
                    'line-height': '60px',
                    'font-size': '14px'
                }
            };
        },

        watch: {
            'model': {
                handler: function handler(newValue, oldValue) {
                    this.style['line-height'] = this.model['line-height'] = this.model.style.height;
                    this.style['font-size'] = this.model['font-size'];
                },

                deep: true
            },
            'pages': {
                handler: function handler(newValue, oldValue) {
                    this.treefy();
                },

                deep: true
            }
        },
        methods: {
            mouseenter: function mouseenter() {
                undefined.casual = undefined.model['background-color'];
                undefined.model['background-color'] = undefined.model['hover-color'];
            },
            mouseleave: function mouseleave() {
                undefined.model['background-color'] = undefined.casual;
            },
            chanPage: function chanPage(item) {
                if (item.columnCode == 'custom') {
                    window.location.href = item.linkUrl;
                } else {
                    app.changePage(item.id);
                }
            },
            treefy: function treefy() {
                var list = {};
                var r = JSON.parse(JSON.stringify(this.pages));
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
            }
        },
        mounted: function mounted() {
            var self = this;
            var el = $(this.$el);
            var con = $(this.$refs.container);
            self.style['font-size'] = self.model['font-size'];
            self.style['line-height'] = self.model['line-height'];
            con.draggable({
                containment: "parent"
            });
            if (app.isPreview) {
                con.draggable("disable");
            }
            self.model.style['z-index'] = 99;
            if (this.pages) {
                this.treefy();
            }
            //全局注册
            app.navigation = this;
        },
        beforeUpdate: function beforeUpdate() {
            this.model.style.width = this.navList.length * 125 + 'px';
        },
        updated: function updated() {
            var pageid = app.getRequest().pageid;
            var color = this.model['active-text-color'];
            var bgColor = this.model['background-color'];
            for (var index = 0; index < this.navList.length; index++) {
                var ele = this.$refs[index][0].$el;
                if (ele.children.length > 0) {
                    ele.children[0].style.height = this.model['line-height'];
                    ele.children[0].style['line-height'] = this.model['line-height'];
                    ele.children[1].style['border-bottom-color'] = bgColor;
                }
                if (this.navList[index].id == pageid) {
                    if (ele.children.length > 0) {
                        ele.children[0].style.color = color;
                        ele.children[0].style['border-bottom-color'] = color;
                    }
                    ele.style.color = color;
                    ele.style['border-bottom-color'] = color;
                }
            }
        },

        computed: {}
    };
});