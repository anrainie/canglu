'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                model: {},
                config: {},
                old: {},
                visible: true,
                activeTab: '常规',
                parent: {}
            };
        },

        components: {
            commtab: loader.load('dialog/setting/dialog-comm-tab'),
            titletab: loader.load('dialog/setting/dialog-title-tab'),
            styletab: loader.load('dialog/setting/dialog-style-tab'),
            animtab: loader.load('dialog/setting/dialog-anim-tab')
        },
        mounted: function mounted() {
            var self = this;
            $(this.$el).draggable({
                handle: '#' + self.dialogId
            });
        },

        computed: {
            dialogId: function dialogId() {
                return 'settingDialog_' + this._uid;
            }
        },
        methods: {
            handleClick: function handleClick() {},
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
            reset: function reset() {
                for (var _k in this.old) {
                    this.model[_k] = this.old[_k];
                }
            },
            close: function close() {
                this.visible = false;
            }
        }
    };
});