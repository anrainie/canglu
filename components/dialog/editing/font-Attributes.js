"use strict";

define([], function () {

    return {
        data: function data() {
            return {
                fonts: ["宋体", "新细明体", "仿宋_GB2312", "微软雅黑", "隶书", "幼圆", "华文楷体", "方正舒体", "华文彩云", "华文行楷", "华文宋体", "楷体", "黑体", "Arial", "Tahoma", "impact", "Arial Serif", "Georgia", "Garamond"]
            };
        },

        watch: {
            model: {
                handler: function handler() {},

                deep: true
            }
        },
        props: ['model'],
        methods: {
            switchBold: function switchBold() {
                this.model.navStyle['font-weight'] = this.model.navStyle['font-weight'] == 'bold' ? 'normal' : 'bold';
            },
            switchItalic: function switchItalic() {
                this.model.navStyle['font-style'] = this.model.navStyle['font-style'] == 'italic' ? 'normal' : 'italic';
            },
            switchUnderline: function switchUnderline() {
                this.model.navStyle['text-decoration'] = this.model.navStyle['text-decoration'] == 'underline' ? 'none' : 'underline';
            },
            match: function match(k, v) {
                return {
                    'border-color': this.model.navStyle[k] == v ? 'blue' : '#ccc'
                };
            },
            restore: function restore(keys) {
                for (k in keys) {
                    keys[k] = app.shopNavtStyle[k];
                }
            }
        }
    };
});