'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: ['model'],
        data: function data() {
            return {
                active: 0,
                visible: false,
                model: {
                    pages: {}
                },
                config: {},
                flag: false,
                starX: '',
                starY: ''
            };
        },
        mounted: function mounted() {
            var _this = this;

            console.log('对话框挂载');
            setTimeout(function () {
                _this.model.callback = _this.callback;
                $('#dialog').draggable({
                    handle: '#DialogTitle'
                });
            });
        },

        computed: {
            styleConfig: function styleConfig() {
                var x = this.config.style;
                if (!x) x = {
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%'
                };
                return x;
            }
        },
        methods: {
            open: function open(callback) {
                this.callback = callback;
                //setTimeout可以保证在mounted后再行渲染

                this.visible = true;
            },
            setModel: function setModel(model) {
                this.model = JSON.parse(JSON.stringify(model));
            },
            ok: function ok() {
                this.callback(JSON.parse(JSON.stringify(this.model)));
                this.visible = false;
            },
            cancel: function cancel(event) {
                this.visible = false;
                event.stopPropagation();
            },

            /**
             * 根据配置单构建页面
             * @param config
             */
            setConfig: function setConfig(config) {
                var _this2 = this;

                this.config = config;
                setTimeout(function () {
                    var _loop = function _loop(k) {
                        var contentVue = _this2.$refs[k];
                        $(contentVue).empty();
                        var c = config.pages[k];
                        var p = void 0;

                        var _loop2 = function _loop2(ck) {
                            //加载内容vue
                            if (c[ck].component) {
                                if (p) p = p.then(function () {
                                    return loader.createVue(c[ck].component, function (v) {
                                        // v.$props.config = c[ck].config;
                                        // v.$props.model = this.model;
                                        // v.$props.key = ck;
                                        // loader.append(contentVue, v);
                                        _this2.append(v, c, ck, contentVue);
                                    });
                                });else p = loader.createVue(c[ck].component, function (v) {
                                    _this2.append(v, c, ck, contentVue);
                                });
                            } else {
                                if (ck != 'check') throw ck + ' 没有定义component';
                            }
                        };

                        for (var ck in c) {
                            _loop2(ck);
                        }
                    };

                    for (var k in _this2.config.pages) {
                        _loop(k);
                    }
                });
            },
            append: function append(v, c, ck, contentVue) {
                if (v.$props == null) {
                    throw '组件' + c[ck].component + '必须定义props';
                }
                if (c[ck].config) v.$props.config = c[ck].config;
                v.$props.model = this.model;
                v.$props.key = ck;
                loader.append(contentVue, v);
            }
        }
    };
});