'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                type: Object,
                defaulte: {}
            },
            callback: {}
        },
        data: function data() {
            return {
                id: 0,
                config: {
                    title1: '添加项目',
                    title2: '修改项目'
                },
                domain: '',
                data: {
                    content: '', //内容
                    sort: '', //序号
                    useYn: 0, //状态(0、不可用 1、可用)
                    linkType: 1, //链接类型 1、无 2：本地链接 3：自定义
                    localLinkType: '', //   本地链接类型：1、栏目 2、导航 3、分类 4 、商品详情
                    localLinkUrl: '', // 本地链接地址
                    customLinkUrl: '', //自定义链接地址
                    target: 1 //打开方式（1、本窗口 2、新窗口）
                },
                navList: '',
                goodsList: '',
                goodsInfo: '',
                linkTypeOptions: [], //本地链接类型
                visible: false
            };
        },

        watch: {
            domain: function domain(v) {
                this.domain = v;
            }
        },
        computed: {
            linkList: function linkList() {
                var x = [];
                switch (this.data.localLinkType) {
                    case 1:
                        // 栏目
                        x = this.naviList;
                        break;
                    case 2:
                        // 导航
                        x = this.navList;
                        break;
                    case 3:
                        // 分类
                        x = this.goodsList;
                        break;
                    case 4:
                        // 商品详情
                        x = this.goodsInfo;
                        break;
                }
                return x;
            },
            naviList: function naviList() {
                var x = app.firstParentId;
                var result = {};
                x.forEach(function (e) {
                    var linkUrl = '';
                    if (e.columnCode == 'custom') {
                        linkUrl = e.linkUrl;
                    } else {
                        linkUrl = e.id;
                    }
                    if (e.parentId == 0) {
                        if (result[e.menuId]) {
                            result[e.menuId].splice(0, 0, {
                                name: e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl
                            });
                        } else {
                            result[e.menuId] = [{
                                name: e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl
                            }];
                        }
                    } else {
                        if (result[e.parentId]) {
                            result[e.parentId].push({
                                name: '--' + e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl
                            });
                        } else {
                            result[e.parentId] = [{
                                name: '--' + e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl
                            }];
                        }
                    }
                });
                var r = [];
                for (var v in result) {
                    r = r.concat(result[v]);
                }
                return r;
            }
        },
        beforeMount: function beforeMount() {},
        mounted: function mounted() {
            $('#dialog').draggable({
                handle: '#DialogTitle'
            });
            var self = this;
            app.loadGoodsNav({
                userId: app.toSessionStorage('userId'),
                webcode: app.toSessionStorage('webcode')
            }, function (arr) {
                self.navList = self.getInnerLink(arr);
            });
            app.loadGoodsInfo({
                userId: app.toSessionStorage('userId'),
                type: '2'
            }, function (arr) {
                self.goodsList = self.getInnerLink(arr);
            });
            app.loadGoodsInfo({
                userId: app.toSessionStorage('userId'),
                type: '3'
            }, function (arr) {
                self.goodsInfo = self.getInnerLink(arr);
            });
            if (app.toSessionStorage('webcode') != 'SHOW') {
                self.linkTypeOptions = ['栏目', '导航', '分类', '商品详情'];
            }
            if (self.model) {
                self.data = self.model;
                if (self.data.linkType == 3) {
                    var string = self.data.customLinkUrl;
                    var str = '//';
                    self.domain = string.split(str)[0] + '//';
                    self.data.customLinkUrl = string.split(str)[1];
                }
            }
        },

        methods: {
            open: function open(callback) {
                this.callback = callback;
                //setTimeout可以保证在mounted后再行渲染
                this.visible = true;
            },
            setModel: function setModel(model) {
                this.model = JSON.parse(JSON.stringify(model));
            },


            //返回内容页
            goBack: function goBack() {
                var _this = this;

                app.InquireAllMember(function (res) {
                    var model = {
                        list: res.data.sbwLoginBarList
                    };
                    loader.loadMemDialog({ model: model, callback: _this.callback });
                });
            },
            getInnerLink: function getInnerLink(arr) {
                var arr1 = [];
                arr.forEach(function (e) {
                    var obj = {
                        name: e.name,
                        link: e.url
                    };
                    arr1.push(obj);
                });
                return arr1;
            },
            changeType: function changeType() {
                this.data.localLinkUrl = '';
            },

            //关掉编辑页面并返回列表页面
            cancel: function cancel(event) {
                this.visible = false;
                event.stopPropagation();
                this.goBack();
            },
            err: function err(font) {
                this.$alert(font, '错误', {
                    confirmButtonText: '确定'
                });
            },
            add: function add() {
                var self = this;
                var data = self.data;
                app.saveMember(data, function () {
                    if (!data.id) showTips('添加数据成功');else {
                        showTips('修改数据成功');
                    }
                    self.goBack();
                }, function (res) {
                    showTips('操作失败');
                });
            },

            //提交数据
            ok: function ok() {
                var self = this;
                var data = self.data;
                if (data.content == '' && data.sort == '') {
                    self.err('请将必要条件输入完');
                    return;
                }
                if (data.linkType == 2) {
                    if (data.localLinkType == '') {
                        self.err('请选择本地链接类型');
                        return;
                    } else {
                        if (data.localLinkUrl == '') {
                            self.err('请选择本地链接地址');
                            return;
                        }
                    }
                }
                if (data.linkType == 3) {
                    if (data.customLinkUrl == '' && self.domain == '') {
                        self.err('请填入自定义链接地址');
                        return;
                    } else {
                        data.customLinkUrl = self.domain + data.customLinkUrl;
                    }
                }
                self.add();
            }
        }
    };
});