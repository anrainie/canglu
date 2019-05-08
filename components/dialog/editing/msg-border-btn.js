"use strict";

define([], function () {
    return {
        props: {
            model: {
                default: {}
            },
            config: {
                default: {}
            },
            key: {}
        },
        data: function data() {
            return {
                btnOpts: ["line-item has-border blue-color", "line-item no-border blue-color", "line-item has-border-radius blue-color", "line-item has-border yellow-color", "line-item no-border yellow-color", "line-item has-border-radius yellow-color", "line-item has-border red-color", "line-item no-border red-color", "line-item has-border-radius red-color"]
            };
        },

        methods: {
            btnClass: function btnClass(e) {
                var btnClass = e.target.className;
                var pel = $(e.target).parent();
                if (this.model.type == 1 || this.model.type == 2) {
                    if (btnClass == "line-item has-border blue-color" || btnClass == "line-item has-border yellow-color" || btnClass == "line-item has-border red-color") {
                        btnClass = btnClass.replace("has-border", "has-border-two");
                    }
                    pel.addClass('cur-img').siblings().removeClass("cur-img");
                    this.model.buttonImg = btnClass;
                } else if (this.model.type == 0) {
                    this.model.buttonImg = btnClass;
                }
            }
        },
        watch: {
            'model.type': function modelType(e) {
                if (this.model.type == 1 || this.model.type == 2) {
                    if (this.model.buttonImg == "line-item has-border blue-color" || this.model.buttonImg == "line-item has-border yellow-color" || this.model.buttonImg == "line-item has-border red-color") {
                        this.model.buttonImg = this.model.buttonImg.replace("has-border", "has-border-two");
                    }
                }
            }
        }
    };
});