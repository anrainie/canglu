'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            'model': {},
            'setting': {},
            'editing': {
                default: {}
            },
            'drag': {}
        },
        data: function data() {
            return {
                showToClass: false,
                showBtns: false,
                editDialog: null,
                isDrop: app.isPreview,
                toolP: 'nor',
                toClass: 'top',
                wireShow: false,
                imgShow: false,
                width: '',
                height: ''
            };
        },

        computed: {
            showSetting: function showSetting() {
                return !this.setting || this.setting.visible != false;
            },
            showMore: function showMore() {
                var x = this.model.showMore;
                if (!x) {
                    x = this.model.showMore = {};
                }
                return x;
            },
            showMoreLink: function showMoreLink() {
                switch (this.showMore.link.type) {
                    case 0:
                        return 'javascript:void(0)';
                    case 1:
                        return this.showMore.link.local;
                    case 2:
                        return this.showMore.link.net;
                }
                return 'javascript:void(0)';
            },
            isEdit: function isEdit() {
                return !app.isPreview;
            },
            showTitle: function showTitle() {
                if (!this.model.titleBarStyle) {
                    this.model.titleBarStyle = {};
                }
                return this.model.titleBarStyle.show;
            },
            titleBarStyle: function titleBarStyle() {
                if (!this.model.titleBarStyle) {
                    this.model.titleBarStyle = {};
                }
                if (!this.model.titlePadding) {
                    this.model.titlePadding = {};
                }
                if (this.model.titleBarStyle['background-color'] == null) this.model.titleBarStyle['background-color'] = 'rgba(255,255,255,0)';
                return {
                    height: this.model.titleBarStyle.height + app.unit,
                    'background-color': this.model.titleBarStyle['background-color'],
                    'background-image': this.model.titleBarStyle['background-image'],
                    'padding-top': this.model.titlePadding['padding-top'] + app.unit,
                    'padding-left': this.model.titlePadding['padding-left'] + app.unit
                };
            },
            showMoreStyle: function showMoreStyle() {
                if (!this.model.showMore) {
                    this.model.showMore = {};
                }
                return {
                    color: this.model.showMore.color,
                    'font-size': this.model.showMore['font-size'] + app.unit,
                    'font-family': this.model.showMore['font-family'],
                    'font-weight': this.model.showMore['font-weight'],
                    'font-style': this.model.showMore['font-style'],
                    'text-decoration': this.model.showMore['text-decoration']
                };
            },
            titleStyle: function titleStyle() {
                if (!this.model.titleStyle) {
                    this.model.titleStyle = {};
                }
                return {
                    color: this.model.titleStyle.color,
                    'font-size': this.model.titleStyle['font-size'] + app.unit,
                    'font-family': this.model.titleStyle['font-family'],
                    'font-weight': this.model.titleStyle['font-weight'],
                    'font-style': this.model.titleStyle['font-style'],
                    'text-decoration': this.model.titleStyle['text-decoration']
                };
            },
            titleBlockStyle: function titleBlockStyle() {
                if (!this.model.titleStyle) {
                    this.model.titleStyle = {};
                }
                if (this.model.titleStyle.horizontal == null) {
                    this.model.titleStyle.horizontal = 0;
                }
                if (this.model.titleStyle.vertical == null) {
                    this.model.titleStyle.vertical = 1;
                }
                var s = {
                    float: 'none'
                };
                switch (this.model.titleStyle.horizontal) {
                    case 0:
                        s.float = 'left';
                        break;
                    case 1:
                        s.width = '100%';
                        s['text-align'] = 'center';
                        break;
                    case 2:
                        s.float = 'right';
                }

                switch (this.model.titleStyle.vertical) {
                    case 0:
                        break;
                    case 2:
                        s['margin-top'] = '100%';
                        s['transform'] = 'translateY(-50%)';
                        break;
                    case 1:
                    default:
                        s['top'] = '50%';
                        s['transform'] = 'translateY(-50%)';
                        break;
                }

                return s;
            },
            subTitleStyle: function subTitleStyle() {
                if (!this.model.subTitleStyle) {
                    this.model.subTitleStyle = {};
                }
                return {
                    color: this.model.subTitleStyle.color,
                    'font-size': this.model.subTitleStyle['font-size'] + app.unit,
                    'font-family': this.model.subTitleStyle['font-family'],
                    'font-weight': this.model.subTitleStyle['font-weight'],
                    'font-style': this.model.subTitleStyle['font-style'],
                    'text-decoration': this.model.subTitleStyle['text-decoration']
                };
            },

            //内容区样式
            contentStyle: function contentStyle() {
                if (!this.model.paddingStyle) this.model.paddingStyle = {};
                if (!this.model.backgroundStyle) this.model.backgroundStyle = {};
                if (this.model.backgroundStyle['background-color'] == null) this.model.backgroundStyle['background-color'] = 'rgba(255,255,255,0)';
                var x = {
                    'padding-left': this.model.paddingStyle['padding-left'] + app.unit,
                    'padding-right': this.model.paddingStyle['padding-right'] + app.unit,
                    'padding-top': this.model.paddingStyle['padding-top'] + app.unit,
                    'padding-bottom': this.model.paddingStyle['padding-bottom'] + app.unit,
                    'background-color': this.model.backgroundStyle['background-color'],
                    'background-image': this.model.backgroundStyle['background-image']
                };
                return x;
            },

            //容器区样式
            containerStyle: function containerStyle() {
                if (!this.model.borderStyle) {
                    this.model.borderStyle = {
                        'border-color': '#CCC',
                        'border-width': 1,
                        'border-style': 'solid',

                        showBorderLeft: false,
                        showBorderRight: false,
                        showBorderTop: false,
                        showBorderBottom: false
                    };
                }
                if (!this.model.style['overflow']) {
                    this.model.style['overflow'] = 'hidden';
                }

                var x = {
                    'border-left': this.model.borderStyle.showBorderLeft ? this.borderStyle : '0',
                    'border-right': this.model.borderStyle.showBorderRight ? this.borderStyle : '0',
                    'border-top': this.model.borderStyle.showBorderTop ? this.borderStyle : '0',
                    'border-bottom': this.model.borderStyle.showBorderBottom ? this.borderStyle : '0',
                    'opacity': this.model.style.opacity,
                    'border-radius': this.model.style['border-radius'],
                    'overflow': this.model.style['overflow']
                };

                return x;
            },
            paddingStyle: function paddingStyle() {
                if (!this.model.style['overflow']) {
                    this.model.style['overflow'] = 'hidden';
                }
                var x = {
                    'overflow': this.model.style['overflow']
                };

                return x;
            },
            positionStyle: function positionStyle() {
                if (!this.model.style) this.model.style = {};
                var pos = {
                    x: this.model.style.left,
                    y: this.model.style.top,
                    w: this.model.style.width,
                    h: this.model.style.height
                };
                if (!this.model.style['animation-delay']) this.model.style['animation-delay'] = 0;
                if (!this.model.style['animation-duration']) this.model.style['animation-duration'] = 1;
                if (this.model.__componentType == 'productDetails' || this.model.__componentType == 'articleDetails') {
                    pos.h = 'auto';
                }
                return {
                    'width': pos.w,
                    'height': pos.h,
                    'top': pos.y,
                    'left': pos.x,
                    'border-radius': this.model.style['border-radius'],
                    'padding-left': this.model.style['padding-left'],
                    'z-index': this.model.style['z-index'],
                    'opacity': this.model.style.opacity,
                    'animation-duration': this.model.style['animation-duration'] + 's',
                    'animation-delay': this.model.style['animation-delay'] + 's'
                };
            },
            borderStyle: function borderStyle() {
                return this.model.borderStyle['border-width'] + 'px ' + this.model.borderStyle['border-style'] + ' ' + this.model.borderStyle['border-color'];
            },
            title: function title() {
                return app.recoverSymbol(this.model.title);
            },
            subtitle: function subtitle() {
                return app.recoverSymbol(this.model.subtitle);
            }
        },
        watch: {
            drag: function drag(n, o) {
                var el = $(this.$el);
                this.isDrag(el, n);
            },
            'model.style': {
                handler: function handler(val, oldValue) {},

                deep: true
            },
            'model': {
                handler: function handler() {
                    this.wireShow = false;
                },

                deep: true
            }

        },
        mounted: function mounted() {
            var _this = this;

            this.width = this.$el.style.width;
            this.height = this.$el.style.height;
            this.titleBarStyle['background-image'] = app.recoverSymbol(this.titleBarStyle['background-image']);
            var el = $(this.$el);
            var self = this;
            var pel = self.$parent.$el;
            var h = el.get(0).style.height;
            h = h.split('px')[0];
            var Maxis = '',
                handler = '',
                mleft = '';
            var canFineTurn = ['font', 'add-picture', 'button-type'];
            handler = 'w,n,s,e,se';
            Maxis = "x,y";
            mleft = pel.offsetLeft;
            //初始化_offsetY
            this.resetOffsetY();
            // 当前拖拽的组件相对父级坐标
            var pos = {
                y: pel.offsetTop,
                x: mleft
            };
            var dragconfig = {
                scroll: false,
                snapMode: "outer",
                // containment:'parent',
                axis: Maxis,
                start: function start() {
                    $("#toolbar").empty();
                },
                stop: function stop(e, ui) {
                    app.centerLineShow = false;
                    var style = $(this).get(0).style;
                    var ss = self.model.style;
                    self.resetOffsetY();
                    if (self.model.style) {
                        ss.top = style.top;
                        ss.left = style.left;
                    }
                },
                drag: function drag(e) {
                    app.centerLineShow = true;
                    self.wireShow = true;
                    var ah = $(el).parents('.editBb')[0].clientHeight;
                    pos = {
                        y: pel.offsetTop,
                        x: pel.offsetLeft
                    };
                    var top = pos.y;
                    var t = '';
                    var u = '';
                    // 50 来源自toolbar的高度
                    if (parseInt(h) + 50 >= ah) {
                        t = 'autoshow';
                        u = 'from';
                    } else {
                        if (top < 50) {
                            t = 'overtop';
                            u = 'from';
                        } else {
                            t = 'nor';
                            u = 'top';
                        }
                    }
                    self.toolP = t;
                    self.toClass = u;
                    self.model.toClass = u;
                },

                snap: true,
                snapTolerance: 8
            };
            var resizeConfig = {
                stop: function stop(e) {
                    self.resetOffsetY();
                    var style = $(this).get(0).style;
                    var ss = self.model.style;
                    if (ss) {
                        ss.width = style.width;
                        ss.height = style.height;
                        ss.left = style.left;
                        ss.top = style.top;
                    }
                },
                resize: function resize(event, ui) {
                    self.width = self.$el.style.width;
                    self.height = self.$el.style.height;
                    self.wireShow = true;
                },

                handles: handler
            };
            if (this.isEdit) {
                el.resizable(resizeConfig).draggable(dragconfig);
                var i = 0;
                el.mouseenter(function () {
                    // 新toolbar 不要删
                    var poss = {
                        top: $(pel).offset().top,
                        left: $(pel).offset().left
                    };
                    loader.createVue('tools/toolbar', function (tool) {
                        tool.toolStyle = poss;
                        tool.model = self.model;
                        tool.setting = self.setting;
                        tool.editing = self.editing;
                        tool.showSetting = self.showSetting;
                        tool.par = self.$parent;
                        tool.copy = function (callback) {
                            //复制组件
                            var pos = {
                                left: parseInt(self.model.style.left.replace(/px/, '')) + 10,
                                top: parseInt(self.model.style.top.replace(/px/, '')) + 10
                            };
                            self.$parent.copy(self.model.__componentType, pos.left, pos.top, self.model);
                        };
                        loader.fill("#toolbar", tool);
                    });
                });
                el.mouseleave(function () {
                    //TODO 需要改造 验证toolbar
                    i = setTimeout(function () {
                        _this.showBtns = false;
                        _this.showToClass = false;
                    }, 500);
                });
            }
        },


        methods: {
            resetOffsetY: function resetOffsetY() {
                var parentTop = $(this.$parent.$container.$el).offset().top;
                this.model._offsetY = $(this.$el).offset().top - parentTop;
            },
            fineTurn: function fineTurn(el) {
                app.fineTurn(el.target, this.model);
            },
            isDrag: function isDrag(el, n) {
                // 启用/暂停拖拽
                var isAble = 'enable';
                if (!n) isAble = 'disable';
                el.draggable(isAble);
            },
            remove: function remove() {
                this.$parent._beforeDestroy();
            },
            openShowMore: function openShowMore() {
                //TODO
            },
            beforeDestroy: function beforeDestroy() {
                alert(123);
            },
            hoverShow: function hoverShow() {
                if (this.model.__componentType == "add-picture") {
                    this.imgShow = true;
                }
            },
            hoverHide: function hoverHide() {
                if (this.model.__componentType == "add-picture") {
                    this.imgShow = false;
                }
            }
        },
        components: {}

    };
});