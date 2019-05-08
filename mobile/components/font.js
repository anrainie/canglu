'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                editing: false,
                btnShow: false,
                showToClass: false,
                toClass: '',
                canEdit: true,
                toolbar: {},
                C: '',
                id: ''
            };
        },

        components: {
            ftool: loader.load('dialog/setting/ftool')
        },
        props: {
            model: {
                default: {
                    title: '文字组件',
                    subtitle: '副标题',
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: ''
                    },
                    style: {
                        width: '200px',
                        height: '40px',
                        'background-color': 'inherit'
                    },
                    fontStyle: {
                        'font-family': '宋体',
                        'font-size': '20px',
                        'font-weight': '',
                        'font-style': '',
                        'font-decoration': '',
                        'text-align': 'left',
                        'color': '#000000',
                        'line-height': '1.5',
                        'text-decoration': '',
                        height: 'auto'
                    },
                    titleBarStyle: {
                        show: false
                    },
                    content: '双击编辑内容',
                    hoverColor: '',
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': 'inherit',
                        'background-image': ''
                    },
                    toClass: ''
                }
            },
            settingConfig: function settingConfig() {},

            editingConfig: {
                default: {
                    needInitial: false,
                    title: '编辑文本内容',
                    pages: {
                        '文本内容编辑': {
                            content: {
                                config: {
                                    text: ''
                                },
                                component: 'dialog/editing/ue-editor'
                            }
                        }
                    }
                }
            },
            drag: {
                // 用来控制组件容器可否拖拽
                type: Boolean,
                default: true
            }

        },
        mounted: function mounted() {
            var _this = this;

            this.id = this._uid;
            var i = 0;
            var par = $(this.$refs.container.$el);
            var self = this;
            this.canEdit = !app.isPreview;

            par.mouseenter(function () {
                var pos = {
                    top: $(par).offset().top,
                    left: $(par).offset().left
                };
                if (i) {
                    clearTimeout(i);
                }
                _this.btnShow = true;
            });
            par.mouseleave(function () {
                i = setTimeout(function () {
                    _this.btnShow = false;
                    _this.showToClass = false;
                }, 1000);
            });
        },

        computed: {
            fontStyle: function fontStyle() {
                var s = this.model.fontStyle;
                //为了保证改变生效
                return {
                    'font-family': s['font-family'],
                    'font-size': s['font-size'],
                    'font-weight': s['font-weight'],
                    'font-style': s['font-style'],
                    'font-decoration': s['font-decoration'],
                    'text-align': s['text-align'],
                    'color': s['color'],
                    'line-height': s['line-height'],
                    'text-decoration': s['text-decoration']
                };
            },
            editable: function editable() {
                var msg = 'plaintext-only';
                if (app.isPreview) msg = 'false';
                return this.editing ? 'plaintext-only' : 'false';
            }
        },
        watch: {
            canEdit: function canEdit(n) {
                if (!n) $(this.$refs.editor).attr("contenteditable", "false");
            }
        },
        methods: {
            dbEdit: function dbEdit() {
                if (app.isPreview) return false;
                this.edit();
            },
            getC: function getC(that) {
                that.attr("contenteditable", "plaintext-only");
                that.focus();
                if (document.all) {
                    that.range = document.selection.createRange();
                    that.range.select();
                    that.range.moveStart("character", -1);
                } else {
                    that.range = window.getSelection().getRangeAt(0);
                    that.range.setStart(that.range.startContainer, 0);
                }
            },
            blurEdit: function blurEdit($event) {
                // 用于取消文本编辑状态
                var self = this;
                var ele = $event.currentTarget;
                this.drag = true;
                this.editing = false;
                $(ele).attr("contenteditable", "false");
            },
            settin: function settin() {
                var self = this;
                if (typeof this.setting == 'function') {
                    this.setting();
                } else loader.createVue('dialog/setting/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.setting);
                    self.editDialog.setParent(self);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {});
                });
            },
            link: function link() {
                loader.loadLinkDialog({
                    model: this.model,
                    callback: this.backLink
                });
            },
            backLink: function backLink(l) {
                this.model.link = l.link;
                this.model.open = l.open;
            },
            save: function save() {
                this.editing = false;
                this.drag = true;
                var v = '';
                var e = this.$refs.editor;
                $(e).attr("contenteditable", "false");
                v = e.innerHTML;
                this.model.value = v;
                this.$forceUpdate();
            },
            edit: function edit() {
                var self = this;
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        for (var k in model) {
                            self.model[k] = model[k];
                        }
                        self.$forceUpdate();
                    });
                });
            },
            remove: function remove() {
                this._beforeDestroy();
                $("#toolbar").empty();
            },
            hover: function hover() {
                var HC = this.model.hoverColor;
                if (HC === 'undefined') HC === '';
                this.C = this.fontStyle.color;
                if (HC === '') return;
                $('#' + this.id).css({ 'color': HC });
            },
            out: function out() {
                $('#' + this.id).css({ 'color': this.C });
            },

            /*调层级*/
            //最大
            toClassMax: function toClassMax() {
                var self = this;
                self.$el.style.zIndex = 20;
                self.$el.__vue__.model.style['z-index'] = 20;
            },

            // 最小
            toClassMin: function toClassMin() {
                var self = this;
                self.$el.style.zIndex = 1;
                self.$el.__vue__.model.style['z-index'] = 1;
            },

            // 每次加一层
            toClassAdd: function toClassAdd() {
                var self = this;
                self.$el.style.zIndex++;
                self.$el.__vue__.model.style['z-index']++;
                if (self.$el.style.zIndex > 20 || self.$el.__vue__.model.style['z-index'] > 20) {
                    self.$el.style.zIndex = 20;
                    self.$el.__vue__.model.style['z-index'] = 20;
                }
            },

            // 每次减一层
            toClassMinus: function toClassMinus() {
                var self = this;
                self.$el.style.zIndex--;
                self.$el.__vue__.model.style['z-index']--;
                if (self.$el.style.zIndex < 1 || self.$el.__vue__.model.style['z-index'] < 1) {
                    self.$el.style.zIndex = 1;
                    self.$el.__vue__.model.style['z-index'] = 1;
                }
            }
        }
    };
});