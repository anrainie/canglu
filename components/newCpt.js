'use strict';

define(['vueLoader'], function (loader) {
    return {
        mounted: function mounted() {
            var _this = this;

            $.get('url').then(function (data) {
                _this.model.style = data.style;
            });
            window.name1 = this.name1;
        },
        data: function data() {
            return {
                visible: true,
                name: '123'
            };
        },

        methods: {
            handleClick: function handleClick() {
                this.visible = !this.visible;
            }
        },
        computed: {
            name1: {
                get: function get() {
                    return this.name + '1';
                },
                set: function set(e) {
                    this.name = e.substr(e.length - 2);
                }
            }
        },
        props: {
            model: {
                default: {
                    name: 'hz',
                    desc: 'B',
                    style: {
                        height: '600px',
                        opacity: 1,
                        'border-radius': '0px',
                        'background-image': '',
                        'border-style': 'solid',
                        'border-color': 'black',
                        'border-width': '1px',
                        'border-bottom': 'medium none'
                    },
                    title: '新组件11'
                }
            },
            settingConfig: ['常规', '标题', '动画', '样式'],
            editingConfig: {
                default: {
                    title: '新组件创建222',
                    pages: {
                        '常规': {
                            name: {
                                config: {
                                    text: '名称'
                                },
                                component: 'dialog/text'
                            },
                            desc: {
                                config: {
                                    text: '描述'
                                },
                                component: 'dialog/text'
                            }
                        }
                    }
                }

            }
        }

    };
});