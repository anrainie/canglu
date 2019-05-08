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
                cate: '',
                loading: true,
                cates: [],
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'children'
                },
                aprops: {
                    key: 'id',
                    label: 'title'
                },
                aloading: false,
                allArticles: [],
                selectedArticles: [],
                loaded: {},
                currentCategory: -1
            };
        },
        mounted: function mounted() {
            var _this = this;

            app.loadNewsCate({
                userId: app.toSessionStorage('userId')
            }, function (r) {
                _this.cates = r;
                _this.loading = false;
                if (_this.model.articleSource) _this.preLoad();
            });
        },


        methods: {
            preLoad: function preLoad() {
                var _this2 = this;

                var self = this;
                self.model.articleSource.forEach(function (e) {
                    self.loading = false;
                    //加载已选
                    self.selectedArticles.push(e);
                    app.loadNewsSummary({ newId: e }, function (art) {
                        if (!self.loaded[art.typeId]) app.loadNewsArticles({
                            typeId: art.typeId
                        }, function (artList) {
                            self.aloading = false;
                            //异步双重验证
                            if (self.loaded[art.typeId]) return;
                            _this2.loaded[art.typeId] = true;
                            if (artList.length) self.allArticles.push.apply(self.allArticles, artList);
                        });
                        self.loading = true;
                    });
                });
            },
            selectedChanged: function selectedChanged(arr) {
                this.model.articleSource = arr;
            },
            change: function change(r) {
                var self = this;
                this.aloading = true;
                app.loadNewsArticles({
                    typeId: r[r.length - 1]
                }, function (e) {
                    self.loaded[r[r.length - 1]] = true;
                    self.aloading = false;
                    if (e.length) self.allArticles.push.apply(self.allArticles, e);
                });
                this.model.newsCate = r;
            },
            filterMethod: function filterMethod(query, arr, v) {
                if (arr.length == 0) return true;
                var e = arr instanceof Array ? arr[arr.length - 1] : arr;
                if (e.typeId != this.currentCategory) {
                    for (var i = 0; i < this.selectedArticles.length; i++) {
                        if (this.selectedArticles[i] == e.id) return true;
                    }
                    return false;
                }
                if (query.length > 0 && e && e.name) return e.name.indexOf(query) > -1;
                return true;
            }
        }
    };
});