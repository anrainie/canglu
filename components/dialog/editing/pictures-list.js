'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {},
            key: {
                default: 'src'
            },
            config: {
                default: {
                    selectChanged: function selectChanged() {},

                    multiselect: false
                }
            }
        },
        mounted: function mounted() {},

        methods: {
            delImg: function delImg(id, i) {
                var self = this;
                this.loading = true;
                $.ajax({
                    url: domain + 'picture/delete.html',
                    type: "GET",
                    // Form数据
                    data: { 'ids': id },
                    success: function success(data) {
                        if (data.success) {
                            app.cellList.splice(i, 1);
                            self.$forceUpdate();
                            setTimeout(function () {
                                self.loading = false;
                            }, 300);
                            // $('i[id='+id+']').parents('.pictures-list').remove();
                        }
                    }
                });
            },
            setSelection: function setSelection(item) {
                if (this.config.multiselect) {
                    if (this.selected[item.src]) {
                        this.selected[item.src] = null;
                        this.config.selectChanged(false, item);
                    } else {
                        this.selected[item.src] = item;
                        this.config.selectChanged(true, item);
                    }
                } else {
                    this.model[this.key] = item.src;
                }
                this.$forceUpdate();
            },
            imageClass: function imageClass(item) {
                if (this.config.multiselect) {
                    return {
                        active: this.selected[item.src]
                    };
                }
                return {
                    active: item.src == this.model[this.key]
                };
            },
            UploadImages: function UploadImages(event) {
                var $this = event.currentTarget;
            }
        },
        data: function data() {
            return {
                selected: {},
                loading: false
            };
        }
    };
});