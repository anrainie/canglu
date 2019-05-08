"use strict";

define([], function () {

    return {
        name: "font",
        data: function data() {
            return {

                fonts: ["宋体", "新细明体", "仿宋_GB2312", "微软雅黑", "隶书", "幼圆", "华文楷体", "方正舒体", "华文彩云", "华文行楷", "华文宋体", "楷体", "黑体", "Arial", "Tahoma", "impact", "Arial Serif", "Georgia", "Garamond"]
            };
        },

        props: ['model'],
        methods: {
            switchBold: function switchBold() {
                this.model['font-weight'] = this.model['font-weight'] == 'bold' ? 'normal' : 'bold';
            },
            switchItalic: function switchItalic() {
                this.model['font-style'] = this.model['font-style'] == 'italic' ? 'normal' : 'italic';
            },
            switchUnderline: function switchUnderline() {
                this.model['text-decoration'] = this.model['text-decoration'] == 'underline' ? 'none' : 'underline';
            },
            match: function match(k, v) {
                return {
                    'border-color': this.model[k] == v ? 'blue' : '#ccc'
                };
            }
        }
    };
});