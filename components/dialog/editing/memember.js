'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                imageSrc: [{
                    src: './images/components/mem1.png',
                    art: '黑色背景'
                }, {
                    src: './images/components/mem2.png',
                    art: '白色背景'
                }]
            };
        },

        props: {
            model: {
                default: {}
            },
            settingConfig: {
                default: {}
            }
        },
        editingConfig: {
            default: {
                title: '添加自定义项',
                pages: {
                    '常规': {
                        type: {
                            component: 'dialog/editing/memAdd'
                        }
                    }
                }
            }
        },
        methods: {
            Selected: function Selected(index) {
                app.groupContainer.header.memember.type = index + 1;
            },
            openAddDialog: function openAddDialog() {
                var self = this;
                self.model.modify = 2;
                loader.createVue('dialog/editing/memAdd', function (dialogVue) {
                    self.editDialog = dialogVue;
                    loader.fill("#tempdialog2", dialogVue);
                    self.editDialog.open(self.model.callback);
                });
            },
            modify: function modify(id) {
                var self = this;
                self.model.modify = 2;
                app.inquireMember(id, function (res) {
                    var data = res.data.sbwLoginBar;
                    loader.createVue('dialog/editing/memAdd', function (dialogVue) {
                        self.editDialog = dialogVue;
                        self.editDialog.setModel(data);
                        loader.fill("#tempdialog2", dialogVue);
                        self.editDialog.open(self.model.callback);
                    });
                });
            },
            del: function del(id, index) {
                var self = this;
                app.delMember(id, function () {
                    showTips('删除成功');
                    self.model.list.splice(index, 1);
                }, function () {
                    showTips('删除失败，请稍后再试');
                });
            }
        }
    };
});