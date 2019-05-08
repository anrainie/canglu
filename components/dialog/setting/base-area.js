'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                visible: false,
                activeTab: 'common'

            };
        },

        components: {
            'base-content': loader.load('dialog/setting/base-content')
        },
        props: {
            tabs: {},
            model: {}
        },
        mounted: function mounted() {
            // console.log(this.model)
        },

        watch: {
            activeTab: function activeTab(a) {
                //console.log(a)
            }
        },
        methods: {
            reBase: function reBase(t) {
                // console.log(t.name);
            },
            toTab: function toTab(k) {
                this.activeTab = k;
            },
            _reset: function _reset(k) {
                var old = JSON.parse(JSON.stringify(this.old));
                this.model[k] = old[k];
                this.$forceUpdate();
            },
            getModel: function getModel(m) {
                this.model = m;
                this.old = JSON.parse(JSON.stringify(m));
            },
            open: function open(callback) {
                this.visible = true;
            },
            setting: function setting(s) {
                this.tabs = s.barlist;
            }
        },
        computed: {
            isEdit: function isEdit() {
                return app.isPreview;
            }
        }
    };
});