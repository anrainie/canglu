'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                default: {
                    navLength: false,
                    navClick: false,
                    'show-underline': false,
                    'activeColor': {
                        color: '#fff',
                        src: ''
                    },
                    navOrders: {},
                    ulWidth: 0
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
                                    text: '文本选中颜色'
                                },
                                component: 'dialog/color-picker'
                            },
                            'activeColor': {
                                config: {
                                    text: '选中背景'
                                },
                                component: 'dialog/editing/nav-active-bg'
                            },
                            'show-underline': {
                                config: {
                                    text: '选中下划线：',
                                    'active-txt': '显示',
                                    'inactive-txt': '不显示'
                                },
                                component: 'dialog/editing/showUnderline'
                            },
                            'font-size': {
                                config: {
                                    text: '字体大小'
                                },
                                component: 'dialog/editing/navFont'
                            },
                            'nav-fixed': {
                                config: {
                                    text: '是否悬浮'
                                },
                                component: 'dialog/editing/navFiexd'
                            },
                            'nav-length': {
                                config: {
                                    text: '宽窄屏'
                                },
                                component: 'dialog/editing/navLength'
                            },
                            'nav-click': {
                                config: {
                                    text: '一级菜单是否可以点击'
                                },
                                component: 'dialog/editing/navClick'
                            }
                        },
                        '高级': {
                            'navOrders': {
                                component: 'dialog/editing/navList'
                            }
                        }
                    },
                    resize: 'e,w'
                }
            },
            settingConfig: function settingConfig() {
            }
        },
        data: function data() {
            return {
                c: {},
                navList: [],
                casual: '',
                show: false,
                seShow: false,
                dShow: false,
                cLeft: 0,
                childList: [],
                style: {
                    'line-height': '60px',
                    'font-size': '14px'
                },
                color: '',
                hoverColor: "",
                canEdit: {
                    default: true
                },
                timeId: 0, //用于保存二级导航消失用的延时器id
                timer: 0, //用于保存导航左右移动时使用的定时器id
                direction: ''
            };
        },

        watch: {
            'model': {
                handler: function handler() {
                    var self = this;
                    self.direction = self.model.navLength ? 'y' : '';
                    self.model.style.width = self.model.navLength ? '100%' : '';
                    self.model.style.left = self.model.navLength ? '0px' : self.model.style.left;
                    self.style['line-height'] = self.model['line-height'] = self.model.style.height;
                    self.style['font-size'] = self.model['font-size'];
                    self.model.style['background-color'] = self.model['background-color'];
                },
                deep: true
            },
            'model.navOrders': function modelNavOrders() {
                var self = this;
                var ele = self.model.navOrders;
                var j = 0;
                ele.forEach(function (key) {
                    if (key.useYn) j++;
                });
                self.model.ulWidth = j * 135 + 'px';
                this.$refs.lis.style['margin-left'] = 0;
            },
            'model.navLength': function modelNavLength() {
                this.$refs.lis.style['margin-left'] = 0;
            },

            'pages': {
                handler: function handler() {
                    this.treefy();
                },

                deep: true
            }
        },
        methods: {
            sshow: function sshow() {
                var self = this;
                var uw = parseInt(self.model.ulWidth);
                var t = self.model.navLength;
                self.show = !self.show;
                if (uw > 810 && !t || uw > 1200 && t) self.dShow = !self.dShow;
            },
            sout: function sout() {
                var self = this;
                self.show = !self.show;
                self.dShow = false;
            },

            mouseenter: function mouseenter() {
                undefined.casual = undefined.model['background-color'];
                undefined.model['background-color'] = undefined.model['hover-color'];
            },
            mouseleave: function mouseleave() {
                undefined.model['background-color'] = undefined.casual;
            },
            chanPage: function chanPage(item) {
                if (item.children && item.children.length > 0) {
                    if (!this.model.navClick) return false;
                }
                if (item.columnCode === 'custom') {
                    if (item.target === 0) {
                        window.open(item.linkUrl);
                    } else {
                        window.location.href = item.linkUrl;
                    }
                } else {
                    app.changePage(item.id, '', '', item.target);
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
                this.model.navOrders = result;
            },
            hover: function hover(i) {
                var self = this;
                var top = self.$el.offsetTop;
                var ele = this.$refs[i][0];
                if (top < 100) this.c = {bottom: '-32px'}; else {
                    this.c = {top: '-32px'};
                }
                this.color = ele.style.color;
                this.hoverColor = ele.style.backgroundColor;
                if (this.navList[i].children && this.navList[i].children.length > 0) {
                    var _getLeft = function _getLeft(e) {
                        var offset = e.offsetLeft;
                        if (e.offsetParent != null && self.model.navLength) offset += _getLeft(e.offsetParent);
                        return offset;
                    };

                    clearTimeout(self.timeId);

                    self.cLeft = _getLeft(ele) + 'px';
                    self.childList = this.navList[i].children;
                    self.seShow = true;
                }
                ele.style.color = this.model['active-text-color'];
                ele.style.backgroundColor = this.model['activeColor'].color;
            },
            out: function out(i) {
                var self = this;
                var ele = this.$refs[i][0];
                ele.style.backgroundColor = self.hoverColor;
                ele.style.color = self.color;
                if (self.navList[i].children && self.navList[i].children.length > 0) {
                    self.timeId = setTimeout(function () {
                        self.seShow = false;
                    }, 200);
                }
            },
            lihover: function lihover(e) {
                var self = this;
                var ele = e.target;
                clearTimeout(self.timeId);
                ele.style.color = this.model['active-text-color'];
                ele.style.backgroundColor = this.model['activeColor'].color;
            },
            liout: function liout(e) {
                var self = this;
                var ele = e.target;
                ele.style.color = self.color;
                ele.style.backgroundColor = '';
                self.timeId = setTimeout(function () {
                    self.seShow = false;
                }, 200);
            },
            editNav: function editNav() {
                var self = this;
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
            left: function left() {
                var self = this;
                var ele = self.$refs.lis;
                var length = self.model.navLength ? 1200 : 800;
                var stop = 0;
                var start = parseInt(ele.style['margin-left']);
                var target = start + length;
                if (target >= stop) {
                    target = stop;
                }
                self.animation(ele, {'margin-left': target});
            },
            right: function right() {
                var self = this;
                var ele = self.$refs.lis;
                var length = self.model.navLength ? 1200 : 800;
                var stop = -ele.offsetWidth + length + 10;
                var start = parseInt(ele.style['margin-left']) || 0;
                var target = start - length;
                if (target <= stop) {
                    target = stop;
                }
                self.animation(ele, {'margin-left': target});
            },
            getStyle: function getStyle(element, attr) {
                return element.currentStyle ? element.currentStyle[attr] : window.getComputedStyle(element, null)[attr] || 0;
            },
            animation: function animation(element, json, fn) {
                var self = this;
                clearInterval(self.timer);
                self.timer = setInterval(function () {
                    var flag = true;
                    for (var key in json) {
                        if (key === "opacity") {
                            var current = self.getStyle(element, key) * 100 || 0;
                            var target = json[key] * 100;
                            var step = (target - current) / 10;
                            step = step > 0 ? Math.ceil(step) : Math.floor(step);
                            current += step;
                            element.style[key] = current / 100;
                        } else if (key === "zIndex") {
                            element.style[key] = json[key];
                        } else {
                            var current = parseInt(self.getStyle(element, key)) || 0;
                            var target = json[key];
                            var step = (target - current) / 10;
                            step = step > 0 ? Math.ceil(step) : Math.floor(step);
                            current += step;
                            element.style[key] = current + "px";
                        }
                        if (current !== target) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        clearInterval(self.timer);
                        typeof fn === "function" && fn();
                    }
                }, 20);
            }
        },
        mounted: function mounted() {
            var self = this;
            var con = $(self.$refs.container);
            if (this.model.navLength === false) {
                var ele = document.getElementsByClassName('groupContainer')[0];
                var left = parseInt(self.model.style.left) + ele.offsetLeft;
                self.model.style.left = left + 'px';
            }
            var draggableConfig = {
                stop: function stop() {
                    var ele = document.getElementsByClassName('groupContainer')[0];
                    self.model.style.left = parseInt(self.$el.style.left) - ele.offsetLeft;
                    self.model.style.top = self.$el.style.top;
                },
                drag: function drag() {
                    if (self.model.style.top < app.groupContainer.header.settingConfig.style.height) {
                        self.model.style['z-index'] = 10;
                    }
                }
            };
            var resizableConfig = {
                resize: function resize() {
                    self.model.style.height = self.$el.style.height;
                },

                handles: "s"
            };
            var defTop = 46;
            if (!app.isPreview) {
                con.draggable(draggableConfig).resizable(resizableConfig);
            }
            if (!self.seShow) self.seShow = false;
            if (!self.model.navLength) self.model.navLength = false;
            if (!self.model.navClick) self.model.navClick = false;
            if (app.isPreview) {
                defTop = 0;
            }
            self.model.style.width = self.model.navLength ? '100%' : '';
            self.style['font-size'] = self.model['font-size'];
            self.style['line-height'] = self.model['line-height'];
            self.model.style['background-color'] = self.model['background-color'];
            self.model.style['z-index'] = 99;
            if (this.pages) {
                this.treefy();
            }
            window.addEventListener('scroll', function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var top = parseInt(self.model.style.top);

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
            //全局注册
            // app.navigation = this;
        },
        updated: function updated() {
            var pageid = app.getRequest().pageid;
            var color = this.model['active-text-color'];
            for (var i = 0; i < this.navList.length; i++) {
                var ele = this.$refs[i][0];
                if (ele.children.length > 0) {
                    ele.children[0].style.height = this.model['line-height'];
                    ele.children[0].style['line-height'] = this.model['line-height'];
                }
                if (this.navList[i].id === pageid) {
                    if (ele.children.length > 0) {
                        ele.children[0].style.color = color;
                    }
                    ele.style.color = color;
                    if (this.model['show-underline']) {
                        ele.style['border-bottom'] = '3px solid ' + color;
                    } else {
                        ele.style['border-bottom'] = 'none';
                    }
                    if (this.model.activeColor.src === '' || this.model.activeColor.src === 'http://0.ss.faisys.com/image/default/demo.png') {
                        ele.style['background-color'] = this.model.activeColor.color;
                        ele.style['background-image'] = 'none';
                    } else {
                        ele.style.background = 'url(' + this.model.activeColor.src + ') no-repeat center';
                        ele.style['background-size'] = 'cover';
                    }
                }
            }
        }
    };
});