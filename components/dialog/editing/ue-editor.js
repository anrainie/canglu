'use strict';

define([], function () {
    return {
        props: {
            model: {
                type: Object,
                default: {}
            },
            key: {},
            config: {
                type: String,
                default: {
                    text: '文字编辑：',
                    visible: true
                }
            }
        },
        data: function data() {
            return {
                ue: null
            };
        },

        computed: {
            uid: function uid() {
                return 'ueditorId_' + this._uid;
            }
        },
        mounted: function mounted() {
            var _this = this;

            setTimeout(function () {
                var ue = UE.getEditor(_this.uid, {
                    toolbars: [['fullscreen', 'source', '|', 'bold', 'italic', 'underline', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'cleardoc', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'lineheight', 'link']],
                    autoHeightEnabled: true,
                    autoFloatEnabled: true
                });
                var self = _this;
                _this.ue = ue;
                ue.ready(function () {
                    ue.setHeight(300);
                    //设置编辑器的内容
                    ue.setContent(app.recoverSymbol(self.model[self.key]));
                    //获取html内容，返回: <p>hello</p>
                    ue.addListener("contentChange", function () {
                        self.model[self.key] = ue.getContent();
                    });
                });
            });
        }
    };
});