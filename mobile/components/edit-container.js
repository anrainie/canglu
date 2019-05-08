'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(['vueLoader', 'vuedraggable'], function (loader, draggable) {
    return {
        props: {
            'model': {
                default: {}
            }
        },
        data: function data() {
            var _this = this;

            var _self = this;
            var timestamp = new Date().valueOf();
            return {
                _id: timestamp,
                loaded: false,
                timeout: false,
                method: {
                    del: function del(model) {
                        //移除通栏模型
                        var rr = _this.model.cpts;
                        rr.splice($.inArray(model, rr), 1);
                        _self.$forceUpdate();
                    }
                }
            };
        },

        computed: {
            canEdit: function canEdit() {
                return !app.isPreview;
            },

            cpts: {
                get: function get() {
                    return this.model.cpts;
                },
                set: function set(v) {
                    this.model.cpts = v;
                }
            }
        },
        mounted: function mounted() {
            var self = this;
            if (this.canEdit) {
                var el = $(this.$el);
                // 接受放置通栏
                $(this.$el).sortable({
                    items: ".grouparea",
                    placeholder: "ui-state-highlight", //可以根据这个class修改占位的样式
                    cursor: 'move',
                    axis: 'y',
                    receive: function receive(event, ui) {
                        // 使用helper站位添加
                        ui.helper.remove();
                        self.append(ui.helper.model.type);
                    }
                });
                // 假装loading
                if (app.pageLoaded) {
                    setTimeout(function () {
                        self.loaded = true;
                        self.timeout = true;
                    }, 2000);
                }
            }
        },

        methods: {
            plus: function plus() {
                app.iconName = 'tplList';
            },

            /**
             * 根据模型添加组件
             */
            append: function append(component, s, callback) {
                var self = this;
                //根据itemModel.component(来自modulelist)创建一个vue实例v
                loader.createVue(component, function (v) {
                    var create = function create(model) {
                        var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                        v.model = model.model;
                        v.setting = model.settingConfig;
                        v.model.__componentType = component;
                        if (model == null) throw '组件[' + component + ']定义里必须包含model!';
                        if (save) {
                            self.model.cpts.push(model);
                        }
                    };

                    // 参数s如果传递的是model，也执行直接初始化
                    if ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) == 'object') {
                        create(s, false);
                    } else {
                        //新建通栏，v.model是对应组件的预设模型
                        var model = {
                            model: JSON.parse(JSON.stringify(v.model)),
                            settingConfig: JSON.parse(JSON.stringify(v.setting)),
                            __componentType: component
                        };
                        create(model);
                    }
                });
            },
            sortfn: function sortfn(v) {}
        },
        components: {
            empty: loader.load('../components/widget/cpt-empty'),
            draggable: draggable
        }
    };
});