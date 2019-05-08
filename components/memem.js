'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {};
        },

        computed: {},
        props: {
            model: {
                default: {}
            }
        },
        mounted: function mounted() {
            var self = this;
            if (!self.model.list) self.model.list = [];
            self.model.list = self.scor(self.model.list);
            self.$forceUpdate();
        },

        methods: {
            reflux: function reflux(model) {
                var self = this;
                var k = 'list',
                    arr = new Array();
                self.model[k] = model[k];
                for (var i = 0; i < self.model[k].length; i++) {
                    var article = self.sorting(self.model[k][i]);
                    arr.push(article);
                }
                self.model.list = self.scor(arr);
                self.$forceUpdate();
            },

            /**
             * 排序
             * @param arr 格式 数组
             */
            scor: function scor(arr) {
                for (var i = 0; i < arr.length; i++) {
                    for (var j = 1; j < arr.length; j++) {
                        var tem = void 0;
                        if (arr[j].sort < arr[j - 1].sort) {
                            tem = arr[j - 1];
                            arr[j - 1] = arr[j];
                            arr[j] = tem;
                        }
                    }
                }
                return arr;
            },
            setting: function setting() {
                var _this = this;

                var self = this;
                app.InquireAllMember(function (res) {
                    var arr = new Array();
                    var data = res.data.sbwLoginBarList;
                    for (var i = 0; i < data.length; i++) {
                        var article = self.sorting(data[i]);
                        arr.push(article);
                    }
                    self.model.list = self.scor(arr);
                    loader.loadMemDialog({ model: self.model, callback: _this.reflux });
                });
            },

            /**
             * 从后台数据中提炼所需的
             * @param data 后台数据
             * @returns {{content: string, useYn: number, sort: string, target: number}|Object}
             */
            sorting: function sorting(data) {
                var tem = new Object();
                tem = {
                    id: data.id,
                    content: data.content,
                    linkType: data.linkType,
                    localLinkType: data.localLinkType,
                    useYn: data.useYn,
                    sort: data.sort,
                    target: data.target
                };
                switch (data.linkType) {
                    case 1:
                        tem.link = 'javascript:void(0)';
                        break;
                    case 2:
                        if (tem.localLinkType != 1) tem.link = data.localLinkUrl;else {
                            if (data.localLinkUrl.indexOf('http') > -1) tem.link = data.localLinkUrl;else {
                                tem.link = '?pageid=' + data.localLinkUrl;
                            }
                        }
                        break;
                    case 3:
                        tem.link = data.customLinkUrl;
                        break;
                }
                return tem;
            }
        }
    };
});