'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                navList: [],
                editingConfig: {
                    needInitial: false,
                    customToolbar: true
                },
                editing: false,
                btnShow: false,
                showToClass: false,
                toClass: '',
                hoverClass: ''
            };
        },

        props: {
            model: {
                default: {
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: ''
                    },
                    style: {
                        width: '1000px',
                        height: '40px',
                        'background-color': 'inherit'
                    },
                    'background-color': '#fff',
                    value: '',
                    titleBarStyle: {
                        show: false
                    },
                    navStyle: {
                        'color': '#333',
                        'active-text-color': '#666',
                        'font-size': '14px',
                        'font-family': '宋体',
                        'font-weight': 'normal',
                        'font-style': 'normal',
                        'text-decoration': 'normal'
                    },
                    padStyle: {
                        'padding-left': 10,
                        'padding-right': 0
                    },
                    bgStyle: {
                        'background-color': '#fff',
                        'background-image': ''
                    },
                    fontShow: false,
                    spacingShow: false,
                    bgShow: false
                }
            },
            settingConfig: function settingConfig() {},

            editingConfig: {
                default: {
                    needInitial: false,
                    title: '导航编辑',
                    pages: {
                        '常规': {
                            '间距属性': {
                                component: 'dialog/editing/spacing'
                            },
                            '文字属性': {
                                config: {
                                    text: '文字属性'
                                },
                                component: 'dialog/editing/font-Attributes'
                            },
                            '背景属性': {
                                component: 'dialog/editing/background'
                            }
                        }
                    },
                    resize: 'e,w'
                }
            },
            drag: {
                // 用来控制组件容器可否拖拽
                type: Boolean,
                default: true
            }
        },
        created: function created() {
            var _this = this;

            app.loadGoodsNav({
                userId: app.toSessionStorage('userId'),
                webcode: app.toSessionStorage('webcode')
            }, function (arr) {
                _this.navList = arr;
            });
        },
        mounted: function mounted() {
            var _this2 = this;

            console.log();
            //非空校验
            if (!this.model.fontShow || !this.model.spacingShow || !this.model.bgShow) {
                this.model.fontShow = false;
                this.model.spacingShow = false;
                this.model.bgShow = false;
            }
            if (!this.model.navStyle) this.model.navStyle = app.shopNavtStyle;
            if (!this.model.padStyle) this.model.padStyle = app.paddingStyle;
            if (!this.model.bgStyle) this.model.bgStyle = app.bgStyle;

            var i = 0,
                par = $(this.$refs.container.$el);
            par.mouseenter(function () {
                if (i) {
                    clearTimeout(i);
                }
                _this2.btnShow = true;
            });
            par.mouseleave(function () {
                i = setTimeout(function () {
                    _this2.btnShow = false;
                    _this2.showToClass = false;
                }, 1000);
            });
        },

        methods: {
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
            edit: function edit() {
                this.editing = true;
            },
            remove: function remove() {
                this._beforeDestroy();
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