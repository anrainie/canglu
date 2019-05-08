'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: ['model', 'parent'],
        data: function data() {
            return {};
        },

        components: {
            fontedit: loader.load('dialog/setting/font-edit'),
            bgedit: loader.load('dialog/setting/background-edit')
        },
        computed: {
            title: {
                get: function get() {
                    return app.recoverSymbol(this.model.title);
                },
                set: function set(v) {
                    this.model.title = v;
                }
            },
            subtitle: {
                get: function get() {
                    return app.recoverSymbol(this.model.subtitle);
                },
                set: function set(v) {
                    this.model.subtitle = v;
                }
            }
        },
        watch: {
            'model.def.defTitleBackground': function modelDefDefTitleBackground(v) {
                if (!v) {
                    var ds = app.defaultModel.titleStyle;
                    for (var _k in ds) {
                        this.model.titleStyle[_k] = ds[_k];
                    }
                }
            },
            'model.def.defTitle': function modelDefDefTitle(v) {
                if (v == 0) {
                    var ds = app.defaultModel.titleWordStyle;
                    this.emptyObject(this.model.titleWordStyle);
                    for (var _k2 in ds) {
                        this.model.titleWordStyle[_k2] = ds[_k2];
                    }
                    this.model.titleWordStyle.display = '';
                } else if (v == 1) {
                    this.model.titleWordStyle.display = 'none';
                } else {
                    this.model.titleWordStyle.display = '';
                }
                this.parent.$forceUpdate();
            },
            'model.def.defSubTitle': function modelDefDefSubTitle(v) {
                if (v == 0) {
                    var ds = app.defaultModel.subTitleWordStyle;
                    this.emptyObject(this.model.subTitleWordStyle);
                    for (var _k3 in ds) {
                        this.model.subTitleWordStyle[_k3] = ds[_k3];
                    }
                    this.model.subTitleWordStyle.display = '';
                } else if (v == 1) {
                    this.model.subTitleWordStyle.display = 'none';
                } else {
                    this.model.subTitleWordStyle.display = '';
                }
                this.parent.$forceUpdate();
            }
        },
        methods: {
            emptyObject: function emptyObject(obj) {
                Object.keys(obj).forEach(function (k) {
                    return delete obj[k];
                });
            },
            restore: function restore(keys) {
                var _this = this;

                for (var k in keys) {
                    keys[k].forEach(function (e) {
                        _this.model[k][e] = app.titleConfig[k][e];
                    });
                }
            }
        }
    };
});