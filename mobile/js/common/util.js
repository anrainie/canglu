"use strict";

define([], function () {

    return {
        runTplLoading: function runTplLoading() {
            $("#mytpl_tier").show();
            $(".tpl_loadingBox").show();
        },
        //关闭loading
        stopTplLoading: function stopTplLoading() {
            $("#mytpl_tier").hide();
            $(".tpl_loadingBox").hide();
        }

    };
});