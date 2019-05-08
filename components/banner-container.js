'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                cpts: [],
                loaded: false,
                showBtns: false,
                mod: {},
                carHeight: '200px'
            };
        },

        props: {
            model: {},
            setting: {},
            editing: {
                default: {
                    title: '横幅编辑',
                    pages: {
                        '常规': {
                            images: {
                                component: 'dialog/editing/group-panel'
                            }
                            // imageSetting: {
                            //     component: 'dialog/editing/imageSetting',
                            // },

                        },
                        '切换样式': {
                            type: {
                                config: {
                                    style: {
                                        width: '200px',
                                        height: '100px',
                                        border: '1px solid #cccccc'
                                    },
                                    options: [{
                                        channel: 1,
                                        image: './images/components/c-dot.png',
                                        text: '长条指示器'
                                    }, {
                                        channel: 1,
                                        image: './images/components/c-num.png',
                                        text: '数字指示器'
                                    }, {
                                        channel: 1,
                                        image: './images/components/c-thumb.png',
                                        text: '图片指示器'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            }
                        },
                        '轮播设置': {
                            carousel: {
                                component: 'dialog/editing/carouselEdit'
                            }
                        },
                        '独立横幅': {
                            carousel: {
                                component: 'dialog/editing/independent'
                            }
                        }
                    }
                }
            }
        },
        computed: {
            isEdit: function isEdit() {
                return !app.isPreview;
            }
        },
        watch: {
            'mod': {
                handler: function handler(v) {
                    this.model.isAlone = this.mod.isAlone;
                    this.cpt(v);
                },

                deep: true
            },
            model: {
                handler: function handler(v) {
                    this.cpt(v);
                },

                deep: true
            }
        },
        mounted: function mounted() {
            var _this = this;

            // 初始化banner
            if (app.groupContainer.body.pageBanner == undefined) app.groupContainer.body.pageBanner = {
                model: {
                    cpts: []
                },
                type: 0,
                carousel: {
                    autoplay: true,
                    interval: 3000
                },
                settingConfig: {
                    canvasStyle: {
                        color: '#f2f2f2',
                        src: '',
                        repeat: '',
                        size: '',
                        position: ''
                    },
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                    style: {
                        height: '450',
                        padding: '',
                        border: {},
                        margin: ''
                    }
                }
            };
            var self = this;
            this.cpt(this.model);
            var bg = $(this.$refs.bgContainer);
            var resizeConfig = {
                greedy: true,
                handles: 's',
                stop: function stop(e, ui) {
                    self.mod.settingConfig.style.height = ui.size.height;
                }
            };
            if (this.isEdit) {
                bg.resizable(resizeConfig);
            }
            bg.mouseenter(function () {
                _this.showBtns = true;
            });

            bg.mouseleave(function () {
                _this.showBtns = false;
            });
        },

        methods: {
            rebg: function rebg(src) {
                if (src) {
                    var bg = 'url("' + src + '")';
                    return bg;
                }
            },
            cpt: function cpt(model) {
                var type = 'webBanner';
                this.cpts = model.isAlone == 2 ? this.model[type].model.cpts : app.groupContainer.body.pageBanner.model.cpts;
                this.mod = model.isAlone == 2 ? this.model[type] : app.groupContainer.body.pageBanner;
                this.mod.isAlone = this.model.isAlone;
                this.carHeight = this.mod.settingConfig.style.height + 'px';
            },
            plus: function plus() {
                this.edit();
            },
            edit: function edit() {
                var self = this;
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(self.mod);
                    self.editDialog.setConfig(self.editing);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(function (model) {
                        for (var k in model) {
                            self.mod[k] = model[k];
                        }
                        self.$forceUpdate();
                    });
                });
            },
            setImg: function setImg(i) {
                this.$refs.carousel2.setActiveItem(i);
            }
        },
        components: {
            empty: loader.load('../components/widget/cpt-empty')
        }
    };
});