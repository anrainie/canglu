'use strict';

define([], function () {

    return {
        props: {
            model: {
                default: {}
            },
            config: {},
            key: ''
        },
        data: function data() {
            return {
                loading: true,
                cates: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'children'
                },
                aloading: false,
                aprops: {
                    key: 'id',
                    label: 'name'
                },
                allArticles: [],
                selectedArticles: [],
                loaded: {},
                currentCategory: -1
            };
        },
        mounted: function mounted() {
            var _this = this;

            app.loadArticleCate({
                level: -1
            }, function (r) {
                _this.cates = _this.treefy(r);
                _this.loading = false;

                if (_this.model.articleSource) {
                    _this.preLoad();
                }
            });
        },

        methods: {
            preLoad: function preLoad() {
                var _this2 = this;

                //预加载
                this.model.articleSource.forEach(function (e) {
                    _this2.loading = false;
                    //加载已选
                    _this2.selectedArticles.push(e);
                    app.loadArticleSummary({ id: e }, function (art) {
                        if (!_this2.loaded[art.newsCateId]) app.loadArticles({
                            newsCateId: art.newsCateId
                        }, function (artList) {
                            _this2.aloading = false;

                            //异步双重验证
                            if (_this2.loaded[art.newsCateId]) return;
                            _this2.loaded[art.newsCateId] = true;

                            if (artList.length) _this2.allArticles.push.apply(_this2.allArticles, artList);
                        });
                        _this2.loading = true;
                    });
                });
            },
            selectedChanged: function selectedChanged(arr) {
                this.model[this.key] = arr;
            },
            change: function change(r) {
                var self = this;
                self.currentCategory = r[r.length - 1];
                if (self.loaded[r[r.length - 1]]) {
                    return;
                }
                self.aloading = true;
                app.loadArticles({
                    newsCateId: r[r.length - 1]
                }, function (e) {
                    self.loaded[r[r.length - 1]] = true;
                    self.aloading = false;
                    if (e.length) self.allArticles.push.apply(self.allArticles, e);
                });
            },
            filterMethod: function filterMethod(query, arr, v) {
                if (arr.length == 0) return true;
                var e = arr instanceof Array ? arr[arr.length - 1] : arr;
                if (e.newsCateId != this.currentCategory) {
                    for (var i = 0; i < this.selectedArticles.length; i++) {
                        if (this.selectedArticles[i] == e.id) return true;
                    }
                    return false;
                }
                if (query.length > 0 && e && e.name) return e.name.indexOf(query) > -1;
                return true;
            },
            treefy: function treefy(r) {
                var list = {};
                var result = [];
                r.forEach(function (e) {
                    if (list[e.id]) {
                        e.children = list[e.id].children;
                    }
                    list[e.id] = e;

                    if (e.parentId == 0) {
                        result.push(e);
                    } else {
                        if (list[e.parentId]) {
                            if (list[e.parentId].children == null) {
                                list[e.parentId].children = [];
                            }
                        } else {
                            list[e.parentId] = { children: [] };
                        }
                        list[e.parentId].children.push(e);
                    }
                });
                return result;
            }
        }
    };
});