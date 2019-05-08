'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                showToClass: false,
                toolType: '',
                showTips: false
            };
        },

        computed: {
            canEdit: function canEdit() {
                return !app.isPreview;
            },
            pos: function pos() {
                var p = 'translateY(-100%)';
                if (this.toolStyle.top < 100) {
                    var H = this.model.style.height;
                    p = 'translateY(' + H + ')';
                }
                return {
                    left: this.toolStyle.left + 'px',
                    top: this.toolStyle.top + 'px',
                    transform: p
                };
            },
            c: function c() {
                var c = 'top';
                if (this.toolStyle.top < 100) {
                    c = 'from';
                }
                return c;
            },
            hasLink: function hasLink() {
                var t = this.toolType;
                if (t == "font" || t == "add-picture") return true;
                return false;
            }
        },
        watch: {
            toolStyle: function toolStyle(c) {}
        },
        mounted: function mounted() {
            this.toolType = this.model.__componentType;
        },

        methods: {
            addTab: function addTab() {
                var id = Math.ceil(Math.random() * 17 * 19 * 31) + '';
                var item = {
                    title: '标签' + id,
                    name: id,
                    group: JSON.parse(JSON.stringify(app.groupItemconfig))
                };
                this.model.tabs.push(item);
                this.activePanel = item.name;
            },
            remove: function remove() {
                this.par._beforeDestroy();
                $("#toolbar").empty();
            },
            link: function link() {
                loader.loadLinkDialog({
                    model: this.model,
                    callback: this.backLink
                });
            },
            backLink: function backLink(l) {
                this.model.link = l.link;
            },
            settin: function settin() {
                var self = this;
                if (typeof this.setting == 'function') {
                    this.setting();
                } else loader.createVue('dialog/setting/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    //这句别删，会影响功能
                    var a = self.model.style;
                    self.editDialog.setConfig(self.setting);
                    self.editDialog.setParent(self);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        // for(let k in model){
                        //     self.model[k] = model[k];
                        // }
                    });
                });
            },
            edit: function edit() {
                var self = this;
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editing);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        for (var k in model) {
                            self.model[k] = model[k];
                        }
                        self.$forceUpdate();
                    });
                });
            },
            upimg: function upimg() {
                var self = this;
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editing);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        for (var k in model) {
                            self.model[k] = model[k];
                        }
                        self.$forceUpdate();
                    });
                });
            },
            fontEdit: function fontEdit() {},

            /*调层级*/
            //最大
            toClassMax: function toClassMax() {
                this.$el.style.zIndex = 20;
                this.$el.__vue__.model.style['z-index'] = 20;
            },

            // 最小
            toClassMin: function toClassMin() {
                this.$el.style.zIndex = 1;
                this.$el.__vue__.model.style['z-index'] = 1;
            },

            // 每次加一层
            toClassAdd: function toClassAdd() {
                this.$el.style.zIndex++;
                this.$el.__vue__.model.style['z-index']++;
                if (this.$el.style.zIndex > 20 || this.$el.__vue__.model.style['z-index'] > 20) {
                    this.$el.style.zIndex = 20;
                    this.$el.__vue__.model.style['z-index'] = 20;
                }
            },

            // 每次减一层
            toClassMinus: function toClassMinus() {
                this.$el.style.zIndex--;
                this.$el.__vue__.model.style['z-index']--;
                if (this.$el.style.zIndex < 1 || this.$el.__vue__.model.style['z-index'] < 1) {
                    this.$el.style.zIndex = 1;
                    this.$el.__vue__.model.style['z-index'] = 1;
                }
            }
        }
    };
});