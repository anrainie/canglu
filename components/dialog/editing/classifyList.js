'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                loading: false
            };
        },

        props: {
            model: {
                type: Object,
                default: {
                    type: 0
                }
            },
            key: {
                default: "image"
            },
            config: {
                type: Object
            },
            editingConfig: {
                default: {
                    title: '添加分类',
                    pages: {
                        '常规': {
                            type: {
                                config: {
                                    text: '链接'
                                },
                                component: 'dialog/editing/classifyAdd'
                            }
                        }
                    }
                }
            }
        },
        component: {
            linkBtn: loader.load('dialog/editing/addlink')
        },
        methods: {
            orderList: function orderList(operate, ex) {
                var operate = operate,
                    cells = this.model['classify'],
                    //获取数组
                ex = ex;
                if (operate == '2') {
                    //2表示可以向上移动
                    var u = cells[ex];
                    cells[ex] = cells[ex - 1];
                    cells[ex - 1] = u;
                } else if (operate == '1') {
                    //1表示可以向下移动
                    var _u = cells[ex];
                    cells[ex] = cells[ex + 1];
                    cells[ex + 1] = _u;
                }
                this.$forceUpdate();
            },
            modify: function modify(id) {
                var self = this;
                loader.createVue('dialog/editing/classifyAdd', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.model.id = id;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function () {
                        self.$forceUpdate();
                    });
                });
            },
            showList: function showList(sh, ex, pex) {
                if (pex == undefined) {
                    var isshow = sh,
                        ex = ex,
                        classify = this.model.classify,
                        showLen = 0;
                    for (var i = 0; i < classify.length; i++) {
                        if (classify[i].isShow) {
                            showLen++;
                        }
                    }
                    if (isshow) {
                        this.model['classify'][ex].isShow = false;
                    } else {
                        if (showLen >= 6) {
                            this.$message({
                                message: '最多只能显示6条导航信息！',
                                type: 'warning'
                            });
                        } else {
                            this.model['classify'][ex].isShow = true;
                        }
                    }
                } else {
                    var isshow = sh,
                        ex = ex,
                        classify = this.model.classify[pex].children,
                        showLen = 0;
                    for (var i = 0; i < classify.length; i++) {
                        if (classify[i].isShow) {
                            showLen++;
                        }
                        if (isshow) {
                            this.model.classify[pex].children[ex].isShow = false;
                        } else {
                            if (showLen >= 6) {
                                this.$message({
                                    message: '最多只能显示6条导航信息！',
                                    type: 'warning'
                                });
                            } else {
                                this.model.classify[pex].children[ex].isShow = true;
                            }
                        }
                    }
                }
            },
            selectImage: function selectImage(ex) {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model.classify.src
                    },
                    callback: function callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model['classify'][ex].src = model.src;
                        setTimeout(function () {
                            self.loading = false;
                        }, 1000);
                    },

                    multiselect: false
                });
            },
            clearSelect: function clearSelect(ex) {
                for (var i = 0; i < this.model.classify.length; i++) {
                    if (i != ex) {
                        this.model.classify[i].isUpdate = false;
                    }
                }
            },

            /**
             * 打开添加分类的弹窗
             */
            openLinkDialog: function openLinkDialog() {
                var self = this;
                loader.createVue('dialog/editing/classifyAdd', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.model);
                    self.editDialog.setConfig(self.editingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function () {
                        self.$forceUpdate();
                    });
                });
            },

            /**
             * 删除功能
             * @param id 需要删除的分类的id
             * @param ex 一级分类的索引
             * @param index 二级分类的索引(不删除二级分类就不填)
             */
            del: function del(id, ex, index) {
                var _this = this;

                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    app.classifyDel(id, function () {
                        if (index !== undefined) _this.delSClassify(ex, index);else {
                            _this.delClassify(ex);
                        }
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }, function () {
                        _this.$message({
                            type: 'warning',
                            message: '删除失败!(请删除下级分类后重试)'
                        });
                    });
                }).catch(function () {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            /**
             * 请求分类目录的数据的函数
             */
            classifyLook: function classifyLook() {
                var _this2 = this;

                app.classifyLook(function (res) {
                    var arr = res.data.catalogueList;
                    var a = void 0,
                        cArr = [],
                        pArr = [];
                    for (a = 0; a < arr.length; a++) {
                        if (arr[a].upChannel === '0') pArr.push(arr[a]);else {
                            arr[a].isShow = true;
                            cArr.push(arr[a]);
                        }
                    }
                    var b = void 0;
                    for (b = 0; b < pArr.length; b++) {
                        var c = void 0;
                        pArr[b].children = [];
                        for (c = 0; c < cArr.length; c++) {
                            if (cArr[c].upChannel == pArr[b].id) pArr[b].children.push(cArr[c]);
                        }
                    }
                    var i = 0;
                    for (; i < pArr.length; i++) {
                        var isShow = true;
                        var isUpdate = false;
                        if (i > 0) isUpdate = true;
                        if (i > 5) isShow = false;
                        pArr[i].isShow = isShow;
                        pArr[i].isUpdate = isUpdate;
                    }
                    _this2.model.classify = pArr;
                });
            },

            /**
             * 本地数据中删除指定一级分类数据
             * @param ex  数据的索引
             */
            delClassify: function delClassify(ex) {
                this.model.classify.splice(ex, 1);
                this.$forceUpdate();
            },

            /**
             * 本地数据中删除指定二级分类数据
             * @param ex  一级分类的索引
             * @param index二级分类的索引
             */
            delSClassify: function delSClassify(ex, index) {
                this.model.classify[ex].children.splice(index, 1);
                this.$forceUpdate();
            }
        },
        /**
         * 组件挂载前调动请求分类目录的数据的函数
         */
        beforeMount: function beforeMount() {
            // 如果本地有数据就不调用
            if (this.model.classify.length == 0) {
                this.classifyLook();
            }
        },
        mounted: function mounted() {}
    };
});