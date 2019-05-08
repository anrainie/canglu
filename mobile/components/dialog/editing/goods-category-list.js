'use strict';

define([], function () {
    return {
        props: {
            model: {
                default: {}
            },
            pages: {
                default: {}
            },
            config: {},
            key: ''
        },
        data: function data() {
            return {
                cates: [],
                allProducts: [],
                selectedProducts: [],
                loading: true,
                props: {
                    value: 'id',
                    label: 'name',
                    children: 'childs'
                },
                aloading: false,
                aprops: {
                    key: 'id',
                    label: 'name1'
                },
                loaded: {},
                currentCategory: -1
            };
        },
        mounted: function mounted() {
            var _this = this;

            app.loadB2CProductCate({}, function (r) {
                _this.cates = _this.treefy(r);
                _this.loading = false;
                if (_this.model.productIds) _this.preload();
            });
        },


        methods: {
            preload: function preload() {
                var self = this;
                self.model.productIds.forEach(function (id) {
                    self.aloading = true;
                    self.selectedProducts.push(id);
                    app.loadB2CProduct({ productId: id }, function (result) {
                        if (!self.loaded[result.productCateId]) {
                            app.loadB2CProductList({
                                cateId: result.productCateId
                            }, function (r) {
                                self.aloading = false;
                                //双重验证
                                if (self.loaded[result.productCateId]) return;
                                self.loaded[result.productCateId] = true;
                                self.allProducts.push.apply(self.allProducts, r);
                            });
                        }
                    });
                });
            },
            selectedChanged: function selectedChanged(arr) {
                this.model[this.key] = arr;
            },
            change: function change(selectedCate) {
                var _this2 = this;

                this.currentCategory = selectedCate[selectedCate.length - 1];
                var cc = this.currentCategory;
                if (this.loaded[cc]) return;
                this.aloading = true;
                app.loadB2CProductList({
                    cateId: cc
                }, function (r) {
                    _this2.loaded[cc] = true;
                    _this2.aloading = false;
                    _this2.allProducts.push.apply(_this2.allProducts, r);
                });
            },
            filterMethod: function filterMethod(query, arr, v) {
                if (arr.length == 0) return true;
                var e = arr instanceof Array ? arr[arr.length - 1] : arr;
                if (e.productCateId != this.currentCategory) {
                    for (var i = 0; i < this.selectedProducts.length; i++) {
                        if (this.selectedProducts[i] == e.id) {
                            return true;
                        }
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
                        e.childs = list[e.id].childs;
                    }
                    list[e.id] = e;

                    if (e.pid == 0) {
                        result.push(e);
                    } else {
                        if (list[e.pid]) {
                            if (list[e.pid].childs == null) {
                                list[e.pid].childs = [];
                            }
                        } else {
                            list[e.pid] = {
                                childs: []
                            };
                        }
                        list[e.pid].childs.push(e);
                    }
                });
                return result;
            }
        }
    };
});