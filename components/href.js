'use strict';

define([], function () {
    return {
        props: {
            model: {
                type: Object,
                defaulte: {}
            }
        },
        data: function data() {
            return {};
        },

        computed: {
            src: function src() {
                if (app.isPreview) {
                    if (this.model.link.type == undefined) {
                        this.model.link.type = 0;
                    }
                    var u = '';
                    switch (this.model.link.type) {
                        case 0:
                            // 无链接
                            u = 'javascript:;';
                            break;
                        case 1:
                            //本地链接
                            if (this.model.link.local.indexOf('.html') > -1) {
                                if (this.model.link.local.indexOf('.html') > -1) {
                                    u = 'http://' + app.toSessionStorage('domainUrl') + '/' + this.model.link.local;
                                } else if (this.model.link.local.indexOf('http') > -1) {
                                    u = this.model.link.local;
                                } else {
                                    u = app.toSessionStorage('domainUrl') + '?pageid=' + this.model.link.local;
                                }
                                //商城栏目
                                // u=this.model.link.local;
                            } else if (this.model.link.local.indexOf('http') > -1) {
                                u = this.model.link.local;
                            } else {
                                if (window.location.href.indexOf('.html') > -1) {
                                    u = 'http://' + app.toSessionStorage('domainUrl') + '/' + '?pageid=' + this.model.link.local;
                                } else {
                                    //常规跳转
                                    u = '?pageid=' + this.model.link.local;
                                }
                            }
                            break;
                        case 2:
                            //自定义链接
                            var domain = this.model.link.domain == undefined ? 'http://' : this.model.link.domain;
                            u = domain + this.model.link.net;
                    }
                    return u;
                } else {
                    return 'javascript:;';
                }
            },
            target: function target() {
                if (app.isPreview) {
                    var u = '';
                    switch (this.model.link.type) {
                        case 0:
                            u = 'javascript:void(0);';
                            break;
                        case 1:
                        case 2:
                            if (app.channel == '2') {
                                u = "_self";
                            } else {
                                u = this.model.link.open;
                            }
                            break;
                    }
                    return u;
                } else {
                    return '';
                }
            }
        },
        mounted: function mounted() {
            // console.log('link:', this.model)
        }
    };
});