'use strict';

define(['vueLoader'], function (loader) {
    return {
        components: {
            bgedit: loader.load('dialog/setting/background-edit')
        },
        props: {
            model: {
                default: {
                    style: {},
                    def: {}
                }
            },
            parent: {},
            defaultStyles: {}
        },
        watch: {
            "model.def.defborder": function modelDefDefborder(v) {
                if (v) {
                    this.model.style['border-style'] = this.model.def['border-style'];
                    this.model.style['border-color'] = this.model.def['border-color'];
                    this.model.style['border-width'] = this.model.def['border-width'];
                    this.model.style['border-left'] = this.model.def['border-left'];
                    this.model.style['border-top'] = this.model.def['border-top'];
                    this.model.style['border-bottom'] = this.model.def['border-bottom'];
                    this.model.style['border-right'] = this.model.def['border-right'];
                }
            },

            //这句也别删除
            'model.style': {
                // deep:true,
                // handler(){
                //     this.parent.$forceUpdate();
                // },
            }
        },
        methods: {
            colorChanged: function colorChanged(v, model, key) {
                if ('inherit' == v) {
                    model[key] = v;
                }
            },
            change: function change(key, e) {
                key = 'border-' + key;
                var v = this.model.style[key];
                if (v != 'none') {
                    // e.srcElement.style.opacity = 0;
                    this[key] = this.model.style[key];
                    this.model.style[key] = 'none';
                } else {
                    if (this[key]) this.model.style[key] = '';else {
                        this.model.style[key] = this.model.style['border-width'] + 'px ' + this.model.style['border-style'] + ' ' + this.model.style['border-color'];
                    }
                }
            },
            borderButtonStyle: function borderButtonStyle(key) {
                key = 'border-' + key;

                return { opacity: this.model[key] == 'none' ? 0 : 1 };
            },
            resume: function resume(config, keys) {
                var _this = this;

                for (var k in keys) {
                    keys[k].forEach(function (e) {
                        _this.model[k][e] = app[config][k][e];
                    });
                }
            },
            restore: function restore(keys) {
                var _this2 = this;

                if (this.defaultStyles) for (var k in keys) {
                    keys[k].forEach(function (e) {
                        _this2.model[k][e] = _this2.defaultStyles[k][e];
                    });
                }
            }
        },
        computed: {
            opacity: {
                get: function get() {
                    return Math.round(this.model.style.opacity * 100);
                },
                set: function set(v) {
                    this.model.style.opacity = v / 100;
                }
            },
            radius: {
                get: function get() {
                    var ra = this.model.style['border-radius'];
                    ra = ra.substr(0, ra.lastIndexOf('px'));
                    return parseInt(ra);
                },
                set: function set(v) {
                    this.model.style['border-radius'] = v + 'px';
                }
            },
            defheight: {
                get: function get() {
                    return this.model.def.defheight;
                },
                set: function set(v) {
                    if (v) this.model.style.height = this.model.def.height;
                    this.model.def.defheight = v;
                }
            },
            seheight: {
                get: function get() {
                    return this.model.def.seheight;
                },
                set: function set(v) {
                    if (v) this.model.style.searchH = this.model.def.searchH;
                    this.model.def.seheight = v;
                }
            },

            defmargin: {
                get: function get() {
                    return this.model.def.defmargin;
                },
                set: function set(v) {
                    if (v) {
                        this.model.style['margin-top'] = this.model.def['margin-top'];
                        this.model.style['margin-bottom'] = this.model.def['margin-bottom'];
                        this.model.style['margin-left'] = this.model.def['margin-left'];
                        this.model.style['margin-right'] = this.model.def['margin-right'];
                    }
                    this.model.def.defmargin = v;
                }
            }
        }
    };
});