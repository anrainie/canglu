'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                type: Object,
                default: {
                    type: 0
                }
            },
            key: {
                default: "src"
            },
            config: {
                default: {
                    selectChanged: function selectChanged() {},

                    multiselect: false
                }
            }
        },
        data: function data() {
            return {
                imaList: [],
                iconList: [],
                selected: {},
                num: 0,
                titleList: [{ 'name': '商务图片', 'iconShow': false }, { 'name': '图标库', 'iconShow': true }],
                iconShow: false
            };
        },
        mounted: function mounted() {
            var _this = this;

            if (this.iconShow == undefined) {
                this.iconShow = false;
            }
            if (this.num == undefined) {
                this.num = 0;
            }
            if (this.titleList == undefined) {
                this.titleList = [{ 'name': '商务图片', 'iconShow': false }, { 'name': '图标库', 'iconShow': true }];
            }
            this.getFirst(function (data) {
                var newData = data.data.picLibs;
                for (var i = 0, leng = newData; i < leng.length; i++) {
                    if (leng[i].pictureTypeCode == 'icon') {
                        _this.iconList.push({ src: leng[i].imgPath });
                    } else {
                        _this.imaList.push({ src: leng[i].imgPath });
                    }
                }
            });
        },

        methods: {
            setSelection: function setSelection(item, index) {
                if (this.config.multiselect) {
                    if (this.selected[item.src]) {
                        this.selected[item.src] = null;
                        this.config.selectChanged(false, item, index);
                    } else {
                        this.selected[item.src] = item;
                        this.config.selectChanged(true, item, index);
                    }
                } else {
                    this.model[this.key] = item.src;
                }
                this.$forceUpdate();
            },
            imageClass: function imageClass(item, index) {
                if (this.config.multiselect) {
                    return {
                        active: this.selected[item.src]
                    };
                }
                return {
                    active: item.src == this.model[this.key]
                };
            },
            getFirst: function getFirst(callback, errorback) {
                var picsUrl = domain + '/picture/libs.html';
                $.ajax({
                    url: picsUrl,
                    type: 'POST',
                    data: { userId: 0 },
                    dataType: 'json',
                    success: function success(response) {
                        if (response.success && response.data) {
                            callback && callback(response);
                        } else {
                            errorback && errorback(response);
                        }
                    },
                    error: function error(err) {
                        if (errorback) {
                            errorback();
                        } else {
                            showTips('获取数据失败，请稍后再试');
                        }
                    }
                });
            }
        }
    };
});