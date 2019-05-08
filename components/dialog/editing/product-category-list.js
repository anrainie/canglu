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
                    children: 'children'
                },
                aloading: false,
                aprops: {
                    key: 'id',
                    label: 'name'
                },
                loaded: {},
                currentCategory: -1
            };
        },
        mounted: function mounted() {
            var _this = this;

            app.loadProductCate({
                level: -1
            }, function (r) {
                _this.cates = _this.treefy(r);
                _this.loading = false;
                if (_this.model.productIds) {
                    _this.preload();
                }
            });
        },


        methods: {
            preload: function preload() {
                var self = this;
                this.model.productIds.forEach(function (id) {
                    self.aloading = true;
                    self.selectedProducts.push(id);
                    app.loadProductSummary({ id: id }, function (result) {
                        if (!self.loaded[result.productCateId]) {
                            app.loadProductList({
                                productCateId: result.productCateId
                            }, function (r) {
                                self.aloading = false;
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
                if (this.loaded[cc]) {
                    return;
                }
                this.aloading = true;
                app.loadProductList({
                    productCateId: cc
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