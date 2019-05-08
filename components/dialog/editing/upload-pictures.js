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
                default: "type"
            },
            config: {}
        },
        methods: {
            upImg: function upImg(e) {
                var self = this;
                var files = e.target.files;
                if (!files) return false;else {
                    for (var i = 0; i < files.length; i++) {
                        if (files[i].size > 512000) {
                            showTips('部分图片大小过大,请选择合适的图片');
                            continue;
                        }
                        this.loading = true;
                        var param = new FormData();
                        param.append('imageFile', files[i], files[i].name);
                        param.append('userWebId', app.saveParams.id);
                        param.append('param', 'page');
                        //
                        $.ajax({
                            url: domain + 'user/page/uploadImg.html',
                            type: "post",
                            // Form数据
                            data: param,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function success(data) {
                                self.loading = false;
                                self.config.callback(data.data);
                            }
                        });
                    }
                }
            }
        },
        data: function data() {
            return {
                loading: false
            };
        }
    };
});