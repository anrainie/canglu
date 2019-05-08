'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                default: {
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: ''
                    }
                }
            }
        },
        data: function data() {
            return {
                visiable: true,
                oldlink: '',
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
                newPageInfo: {},
                httpHeader: 'https://',
                linkUrl: '',
                getLink: ''
            };
        },
        mounted: function mounted() {
            app.isUpdatePage = true;
            this.newPageInfo = JSON.parse(JSON.stringify(this.pageInfo));
            var link = this.newPageInfo;

            if (this.model.link == undefined) {
                this.model.link = {
                    type: 2,
                    local: '',
                    net: this.linkUrl,
                    open: '_blank',
                    selectedLinkType: ''
                };
                if (this.pageInfo.linkUrl.indexOf('http://') > -1) {
                    this.linkUrl = link.linkUrl.replace(/http:\/\//g, '');
                    this.model.link.domain = 'http://';
                } else if (this.pageInfo.linkUrl.indexOf('https://') > -1) {
                    this.linkUrl = link.linkUrl.replace(/https:\/\//g, '');
                    this.model.link.domain = 'https://';
                } else {
                    this.linkUrl = link.linkUrl;
                    this.model.link.domain = '';
                }
            } else {
                if (this.pageInfo.linkUrl.indexOf('http://') > -1) {
                    this.linkUrl = link.linkUrl.replace(/http:\/\//g, '');
                    this.model.link.domain = 'http://';
                } else if (this.pageInfo.linkUrl.indexOf('https://') > -1) {
                    this.linkUrl = link.linkUrl.replace(/https:\/\//g, '');
                    this.model.link.domain = 'https://';
                } else {
                    this.linkUrl = link.linkUrl;
                    this.model.link.domain = '';
                }
                this.model.link.type = link.linkType - 1;
                this.model.link.local = link.linkType - 1 == "1" ? this.linkUrl : '';
                this.model.link.net = link.linkType - 1 == "2" ? this.linkUrl : '';
                this.model.link.open = link.target;
                this.model.link.selectedLinkType = link.selectedLinkType;
                if (link.target === 0) this.model.link.open = "_blank";else if (link.target === 1) {
                    this.model.link.open = "_parent";
                }
            }
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
        methods: {
            updateNavigation: function updateNavigation() {
                var _this = this;

                var e = this.newPageInfo;
                if (e.name == null || e.name == '') {
                    this.$message.error('输入导航名称，再重试！');
                    setTimeout(function () {
                        _this.loading = false;
                    }, 1000);
                } else if (e.columnCode == '') {
                    this.$message.error('请选择页面类型，再重试！');
                    setTimeout(function () {
                        _this.loading = false;
                    }, 1000);
                } else {
                    if (e.linkType === 3) {
                        e.linkUrl = this.linkUrl;
                    } else {
                        e.linkUrl = this.linkUrl;
                    }
                    if (e.columnCode !== 'custom') e.linkType = 1;
                    app.updatePage(e, function (res) {
                        if (res.success) {
                            _this.visiable = false;
                            window.location.reload();
                        }
                    }, function (res) {
                        _this.$message.error(res.message);
                    });
                }
            },
            close: function close() {
                this.visiable = false;
                app.isUpdatePage = false;
            },
            addLink: function addLink(v) {
                app.isUpdatePage = false;
                var open = '',
                    link = v.link;
                if (link.type == 2) {
                    this.linkUrl = link.domain + link.net;
                    this.newPageInfo.domain = link.domain;
                    this.newPageInfo.linkType = 3;
                } else if (link.type == 1) {
                    this.linkUrl = link.local;
                    this.newPageInfo.selectedLinkType = link.selectedLinkType;
                    this.newPageInfo.linkType = 2;
                }
                if (link.open == '_parent') open = 1;else if (link.open == '_blank') {
                    open = 0;
                }
                this.newPageInfo.target = open;
            }
        },
        components: {
            addlink: loader.load('dialog/editing/addlink')
        }
    };
});