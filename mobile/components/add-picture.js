'use strict';

define(['vueLoader'], function (loader) {
    var cellList = [];
    return {
        props: {
            model: {
                type: Object,
                default: {
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: ''
                    },
                    choosePic: '0',
                    title: '添加图片',
                    subtitle: '副标题',
                    style: {
                        width: '140px',
                        height: '140px'
                    },
                    titleBarStyle: {
                        show: false
                    },
                    src: 'http://image.cangluxmt.com/clwebsite/basic/images/components/default-img.png',
                    hsrc: 'http://image.cangluxmt.com/clwebsite/basic/images/components/default-img.png',
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': 'inherit',
                        'background-image': ''
                    },
                    toClass: 'top'
                }
            },
            editingConfig: {
                default: {
                    customToolbar: true,
                    title: '添加图片',
                    needInitial: false,
                    pages: {
                        "我的文件": {
                            updateImg: {
                                config: {
                                    style: {
                                        height: '40px',
                                        'line-height': '40px'
                                    },
                                    callback: function callback(r) {
                                        app.cellList.push({
                                            src: r.imgPath,
                                            id: r.id
                                        });
                                    }
                                },
                                component: 'dialog/editing/upload-pictures'
                            },
                            src: {
                                config: {
                                    cellList: cellList
                                },
                                component: 'dialog/editing/pictures-list'
                            }
                        },
                        "系统图库": {
                            src: {
                                component: 'dialog/editing/system-img'
                            }
                        }
                    }
                }
            },
            //设置属性对话框的配置
            settingConfig: {}
        },
        data: function data() {
            return {
                btnShow: false,
                showToClass: false,
                toClass: ''
            };
        },
        mounted: function mounted() {
            var _this = this;

            this.editingConfig.customToolbar = true;
            var i = 0;
            var par = $(this.$refs.container.$el);
            par.mouseenter(function () {
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

        watch: {
            model: {
                handler: function handler(val, oldValue) {},
                deep: true
            }
        },
        methods: {
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
            },
            choose: function choose(picSrc) {
                var pic = picSrc;
                this.cellList[0].imgSrc = picSrc;
            },
            dbEidit: function dbEidit($event) {
                console.log('执行了双击事件');
                var ele = $event.currentTarget;
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
            },
            click: function click() {
                var self = this;
            }
        }
    };
});