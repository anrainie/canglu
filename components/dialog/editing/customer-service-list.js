'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                loading: false
            };
        },

        props: {
            model: {
                type: Object,
                default: {
                    type: 0
                }
            },
            key: {
                default: "image"
            },
            config: {}
        },
        methods: {
            orderList: function orderList(operate, ex) {
                var operate = operate,
                    ex = ex;
                if (operate == 'top') {
                    this.model[this.key][ex].order = 'down';
                    this.model[this.key][ex - 1].order = 'top';
                    this.model[this.key] = [this.model[this.key][ex], this.model[this.key][ex - 1]];
                } else if (operate == 'down') {
                    this.model[this.key][ex].order = 'top';
                    this.model[this.key][ex + 1].order = 'down';
                    this.model[this.key] = [this.model[this.key][ex + 1], this.model[this.key][ex]];
                }
            },
            showList: function showList(sh, ex) {
                var isshow = sh,
                    ex = ex;
                if (isshow) {
                    this.model[this.key][ex].isShow = false;
                } else {
                    this.model[this.key][ex].isShow = true;
                }
            },
            textHover: function textHover() {
                var _this = this.$refs.footerListName[0].previousElementSibling;
                _this.style.backgroundColor = '#fff';
            },
            updateText: function updateText() {
                for (var i = 0; i < this.model[this.key].length; i++) {
                    if (this.model[this.key][i].isUpdate != undefined) {
                        this.model[this.key][i].isUpdate = !this.model[this.key][i].isUpdate;
                        this.model[this.key][i].num = $("#custom-num").val();
                        var _this = $("#custom-num");

                        if ($.trim(_this.val()) == "") {
                            _this.attr("placeholder", "请输入内容！");
                            return;
                        } else {
                            this.model[this.key][i].num = _this.val();
                        }
                    }
                }
            },
            selectImage: function selectImage() {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src
                    },
                    callback: function callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model.image.src = model.src;
                        setTimeout(function () {
                            self.loading = false;
                        }, 1000);
                        self.model.hasImg = true;
                    },
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            }
        },
        mounted: function mounted() {}
    };
});