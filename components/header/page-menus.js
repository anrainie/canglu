'use strict';

define(['vueLoader', 'vuedraggable', 'util'], function (loader, draggable, util) {
    return {
        props: ['model', 'firstParentId'],
        data: function data() {
            return {
                tshow: '',
                current: {}, //当前选中
                alterPageId: '', //修改中的页面id
                alterDialog: '', //显示修改弹窗
                updateFootNav: false, //修改底部导航样式
                updateHeadNav: false, //修改头部导航样式
                navFootStyle: true, //底部导航类型
                // oldWebInfo: '',
                /* 导航 */
                pageInfo: {},
                navFatherId: '', //当前编辑的一级导航
                firstTemplate: [], //一级分类筛选集合
                addNav: {//添加导航

                },
                tempaltesData: [],
                tplChildLevelArr: [],
                isThisWebType: '',
                addPage: false,
                updatePage: false,
                navList: {},
                navListArr: []
            };
        },

        watch: {
            tshow: function tshow(n) {
                if (n) {
                    $(this.$refs.pageDialog).empty();
                    this.addPage = false;
                }
            }
        },
        mounted: function mounted() {
            this.arrfy();
        },

        methods: {
            chanPage: function chanPage(id) {
                app.changePage(id);
            },
            deletePage: function deletePage(page, i) {
                var _this = this;

                var self = this;
                var pid = app.getRequest().pageid;
                this.$confirm('此操作将永久删除该页面, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    if (page.children) {
                        self.$message.error('先删除该页面的下级页面，再重试');
                        return false;
                    }
                    app.deletePage(page, function (r) {
                        if (r.success) {
                            var x = $.inArray(page, _this.firstParentId);
                            _this.firstParentId.splice(x, 1);
                            _this.treefy();
                            _this.$forceUpdate();
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            app.savePage();
                            if (page.id == pid) {
                                // 如果删除当前页面 清空session pageid
                                pageid = app.toWebsessionStorage('firstPage');
                                window.location.href = '?pageid=' + pageid;
                            } else {
                                window.location.reload();
                            }
                        } else {
                            _this.$message({
                                type: 'info',
                                message: r.message
                            });
                        }
                    });
                }).catch(function () {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            treefy: function treefy() {
                var list = {};
                var r = JSON.parse(JSON.stringify(this.firstParentId));
                var result = {};
                r.forEach(function (e) {
                    if (list[e.menuId]) {
                        e.children = list[e.menuId].children;
                    }
                    list[e.menuId] = e;
                    if (e.parentId == 0) {
                        result[e.menuId] = e;
                    } else {
                        if (list[e.parentId]) {
                            if (list[e.parentId].children == null) {
                                list[e.parentId].children = {};
                            }
                        } else {
                            list[e.parentId] = {
                                children: {}
                            };
                        }
                        list[e.parentId].children[e.menuId] = e;
                    }
                });
                this.navList = result;
                return result;
            },
            arrfy: function arrfy() {
                var tree = this.treefy();
                var result = [];
                for ( var i in tree) {
                    result.push(tree[i]);
                }
                this.navListArr = result;
            },

            //当前导航高亮
            changeNav: function changeNav(idx, n, index, el) {},

            // 点击新增栏目
            addpageFn: function addpageFn() {
                this.addPage = true;
            },
            closeNewPage: function closeNewPage() {
                this.addPage = false;
            },
            closeUpdatePage: function closeUpdatePage() {
                this.updatePage = false;
            },

            //页面管理 页面修改
            pageAlter: function pageAlter(obj) {
                var self = this;
                loader.createVue('header/update-page', function (v) {
                    v.navList = self.navList;
                    v.pageInfo = obj;
                    // v.close = self.close();
                    loader.fill(self.$refs.pageDialog, v);
                });
            },

            //页面管理 删除页面
            delPageInfo: function delPageInfo(id, n) {},
            close: function close() {
                this.$parent.closeMenu();
            },
            cancleEmpty: function cancleEmpty() {
                // 隐藏校验信息
                this.pageInfo.empty = true;
            },
            addNavigation: function addNavigation(info) {
                var self = this;
                app.addPage(info, function (r) {
                    if (r.data) {
                        app.savePage();
                        app.firstParentId.push(r.data);
                        if (r.data.parentId === 0) {
                            self.navList[r.data.menuId] = r.data;
                            if (r.data.columnCode != 'custom') {
                                window.location.href = '?pageid=' + r.data.id;
                            } else {
                                window.location.reload();
                            }
                        } else {
                            var p = self.navList[r.data.parentId];
                            if (!p.children) {
                                p.children = {};
                            }
                            p.children[r.data.menuId] = r.data;
                            self.current = p.id;
                            if (r.data.columnCode != 'custom') {
                                window.location.href = '?pageid=' + r.data.id;
                            } else {
                                window.location.reload();
                            }
                        }
                        self.closeNewPage();
                    }
                });
            },

            // 页面管理
            alterPageFn: function alterPageFn() {},
            initPageAlter: function initPageAlter() {},
            changeNavType: function changeNavType() {}
        },
        components: {
            draggable: draggable,
            newpage: loader.load('header/new-page')
        }
    };
});