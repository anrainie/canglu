'use strict';

define(['vueLoader'], function (loader) {
    return {
        components: {
            'tabsbar': loader.load('dialog/setting/tabs-bar'),
            'tabsitem': loader.load('dialog/setting/tabs-item')
        },
        computed: {
            // dialogId(){
            //     return 'settingDialog_' + this._uid
            // }
        },
        mounted: function mounted() {
            var _this = this;

            setTimeout(function () {
                $(_this.$el).draggable({
                    handle: '#dialogId'
                });
            });
        },
        data: function data() {
            return {
                visible: false,
                activeTab: '标签栏',
                old: null
            };
        },

        methods: {
            _reset: function _reset() {
                var temp = JSON.parse(JSON.stringify(this.old));
                for (k in temp) {
                    this.model[k] = temp[k];
                }
                this.parent.$forceUpdate();
            },
            setModel: function setModel(model) {
                this.model = model;
                this.old = JSON.parse(JSON.stringify(model));
            },
            setConfig: function setConfig(config) {
                this.config = config;
            },
            setParent: function setParent(parent) {
                this.parent = parent;
            },
            open: function open() {
                this.visible = true;
            },
            close: function close() {
                this.visible = false;
            }
        }
    };
});