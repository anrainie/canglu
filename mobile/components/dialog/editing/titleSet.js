"use strict";

define([], function () {
    return {
        data: function data() {
            return {
                fonts: ["宋体", "新细明体", "仿宋_GB2312", "微软雅黑", "隶书", "幼圆", "华文楷体", "方正舒体", "华文彩云", "华文行楷", "华文宋体", "楷体", "黑体", "Arial", "Tahoma", "impact", "Arial Serif", "Georgia", "Garamond"]
            };
        },

        props: {
            model: {
                type: String,
                default: ''
            },
            config: {},
            key: {
                type: String
            }
        }
    };
});