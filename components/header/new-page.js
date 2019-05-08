'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            navList: {
                default: {}
            },
            model: {
                default: {
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: '_parent'
                    }
                }
            }
        },
        data: function data() {
            return {
                loading: false,
                newNavList: [],
                navType: [{
                    name: '自定义',
                    code: 'custom',
                    id: '0'
                }, {
                    name: '新闻列表',
                    code: 'news',
                    id: '1'
                }, {
                    name: '产品展示',
                    code: 'pro',
                    id: '2'
                }, {
                    name: '空白',
                    code: 'blank',
                    id: '3'
                }],
                showTips: false,
                pageInfo: {
                    columnCode: '',
                    parentId: null,
                    target: 0,
                    name: null,
                    linkUrl: null
                },
                httpHeader: 'https://'
            };
        },

        watch: {
            'pageInfo.name': function pageInfoName() {
                this.showTips = false;
            }
        },
        mounted: function mounted() {
            app.isUpdatePage = true;
        },

        computed: {
            navList1: function navList1() {
                var old = JSON.parse(JSON.stringify(this.navList));
                var obj = {
                    menuId: 0,
                    name: '无'
                };
                old['0'] = obj;
                return old;
            }
        },
        components: {
            addlink: loader.load('dialog/editing/addlink')
        },
        methods: {
            setModel: function setModel(model) {
                this.pageInfo = model;
            },
            addLink: function addLink(v) {
                app.isUpdatePage = false;
                var open = '',
                    link = v.link;
                if (link.type == 2) {
                    this.pageInfo.domain = link.domain;
                    this.pageInfo.linkUrl = link.domain + link.net;
                    this.pageInfo.linkType = 3;
                } else if (link.type == 1) {
                    this.pageInfo.linkUrl = link.local;
                    this.pageInfo.selectedLinkType = link.selectedLinkType;
                    this.pageInfo.linkType = 2;
                }
                if (link.open == '_parent') open = 1;else if (link.open == '_blank') {
                    open = 0;
                }
                this.pageInfo.target = open;
            },
            addNavigation: function addNavigation() {
                var _this = this;

                var self = this;
                this.loading = true;
                if (this.pageInfo.name == null || this.pageInfo.name == '') {
                    this.$message.error('输入导航名称，再重试！');
                    setTimeout(function () {
                        _this.loading = false;
                    }, 1000);
                } else if (this.pageInfo.columnCode == '') {
                    this.$message.error('请选择页面类型，再重试！');
                    setTimeout(function () {
                        _this.loading = false;
                    }, 1000);
                } else if (this.pageInfo.columnCode == 'custom' && (this.pageInfo.linkUrl == null || this.pageInfo.linkUrl == '')) {
                    this.$message.error('请输入自定义链接，再重试！');
                    setTimeout(function () {
                        _this.loading = false;
                    }, 1000);
                } else {
                    var pid = this.pageInfo.parentId;
                    this.pageInfo.linkUrl = this.pageInfo.linkUrl;
                    if (pid !== 0) {
                        var l = this.getCate(pid);
                        if (l.length > 4) {
                            this.$message.error('二级导航不可以超过5个哦！');
                            setTimeout(function () {
                                _this.loading = false;
                            }, 100);
                            return false;
                        }
                    }
                    this.$parent.addNavigation(this.pageInfo);
                }
            },
            close: function close() {
                app.isUpdatePage = false;
                this.$parent.closeNewPage();
            },
            log: function log() {},
            getCate: function getCate(pid) {
                // 获取指定上级栏目
                var res = [];
                app.firstParentId.forEach(function (e) {
                    if (e['parentId'] == pid) {
                        res.push(e);
                    }
                });
                return res;
            }
        }
    };
});