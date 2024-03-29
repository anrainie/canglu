'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            settin: {},
            edit: {},
            save: {},
            remove: {}
        },
        data: function data() {
            return {
                showToClass: false,
                editing: false
            };
        },

        computed: {
            canEdit: function canEdit() {
                return !app.isPreview;
            },
            pos: function pos() {
                var p = 'translateY(-100%)';
                if (this.toolStyle.top < 100) p = '';
                return {
                    left: this.toolStyle.left + 'px',
                    top: this.toolStyle.top + 'px',
                    transform: p
                };
            }
        },
        components: {
            ftool: loader.load('dialog/setting/ftool')
        },
        mounted: function mounted() {},

        methods: {
            link: function link() {
                loader.loadLinkDialog({
                    model: this.model,
                    callback: this.backLink
                });
            },
            backLink: function backLink(l) {
                this.model.link = l.link;
                this.model.open = l.open;
            },
            tosave: function tosave() {
                this.editing = false;
                this.save();
            },

            // settin(callback) {
            //     callback(e);
            // },
            editin: function editin() {
                this.editing = true;
                this.edit();
            },

            /*调层级*/
            //最大
            toClassMax: function toClassMax() {
                var self = this;
                self.$el.style.zIndex = 20;
                self.$el.__vue__.model.style['z-index'] = 20;
            },

            // 最小
            toClassMin: function toClassMin() {
                var self = this;
                self.$el.style.zIndex = 1;
                self.$el.__vue__.model.style['z-index'] = 1;
            },

            // 每次加一层
            toClassAdd: function toClassAdd() {
                var self = this;
                self.$el.style.zIndex++;
                self.$el.__vue__.model.style['z-index']++;
                if (self.$el.style.zIndex > 20 || self.$el.__vue__.model.style['z-index'] > 20) {
                    self.$el.style.zIndex = 20;
                    self.$el.__vue__.model.style['z-index'] = 20;
                }
            },

            // 每次减一层
            toClassMinus: function toClassMinus() {
                var self = this;
                self.$el.style.zIndex--;
                self.$el.__vue__.model.style['z-index']--;
                if (self.$el.style.zIndex < 1 || self.$el.__vue__.model.style['z-index'] < 1) {
                    self.$el.style.zIndex = 1;
                    self.$el.__vue__.model.style['z-index'] = 1;
                }
            }
        }
    };
});