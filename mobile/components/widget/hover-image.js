'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(['imageLoader'], function (imageLoader) {
    return {
        props: {
            //如果是string，则认为是src，如果是object则认为是{src:'',hsrc:''，}

            'src': {},
            'hoverEffect': {},
            'background-color': {
                default: '#000'
            },
            'style': {},
            'color': {
                default: '#FFF'
            },
            opacity: {
                default: 0.5
            },
            desc: {},
            delay: {
                default: 200
            },
            link: {},
            'addon': {}
        },
        data: function data() {
            return {
                hover: false,
                LH: '',
                loading: true
            };
        },

        computed: {
            imageSrc: function imageSrc() {
                var v = void 0;
                if (_typeof(this.src) == 'object') {
                    if (this.hover && this.src.hsrc && this.hoverEffect == 7) v = this.src.hsrc;else v = this.src.src;
                } else v = this.src;

                this.loading = true;
                var self = this;

                return imageLoader.load(v, function () {
                    self.loading = false;
                    self.$refs.hoverImg.src = v;
                });
            },

            //图片链接
            imageHref: function imageHref() {
                if (this.link) {
                    switch (this.link.type) {
                        case 1:
                            return this.link.local;
                        case 2:
                            return this.link.net;
                    }
                }

                return 'javascript:void(0);';
            },

            //跳转方式
            jumpMod: function jumpMod() {
                if (this.link) {
                    return this.link.open;
                }
            },
            maskStyle: function maskStyle() {

                if (!this.addon) {
                    this.addon = {};
                }
                if (!this.addon.bgColor) {
                    this.addon.bgColor = '#000';
                }

                if (!this.addon.textColor) {
                    this.addon.textColor = '#fff';
                }

                if (!this.addon.opacity) {
                    this.addon.opacity = 0.5;
                }

                if (!this.addon.textAlign) {
                    this.addon.textAlign = 'center';
                }
                if (!this.addon.fontSize) {
                    this.addon.fontSize = '14px';
                }

                return {
                    'background-color': this.addon.defBg ? '#000' : this.addon.bgColor,
                    'color': this.addon.defBgText ? '#fff' : this.addon.textColor,
                    opacity: this.addon.defBg ? .5 : this.addon.opacity,
                    'text-align': this.addon.defBgText ? 'center' : this.addon.textAlign,
                    'font-size': this.addon.defBgText ? '14px' : this.addon.fontSize
                };
            },

            //悬浮时图片的效果
            imageStyle: function imageStyle() {
                var result = this.addon ? {
                    'border-radius': this.addon['border-radius']
                } : {};
                switch (this.hoverEffect) {
                    case 1:
                        if (!this.addon) {
                            this.addon = {};
                        }
                        if (!this.addon.borderStyle) {
                            this.addon.borderStyle = {
                                'border-color': '#ccc',
                                'border-style': 'solid',
                                'border-width': '1px'
                            };
                        }
                        //边框效果
                        if (this.addon.defBorder) {
                            result.border = this.hover ? '1px solid #CCC' : '';
                        } else result = {
                            'border-color': this.hover ? this.addon.borderStyle['border-color'] : '',
                            'border-style': this.hover ? this.addon.borderStyle['border-style'] : '',
                            'border-width': this.hover ? this.addon.borderStyle['border-width'] : ''
                        };
                        break;
                    case 2:
                        result.transform = this.hover ? 'translateX(20px)' : '';
                        break;
                    case 3:
                        result.transform = this.hover ? 'scale(1.4)' : '';
                        break;

                }

                return result;
            }
        },
        methods: {
            hoverStart: function hoverStart() {
                var _this = this;

                this.st = setTimeout(function () {
                    _this.hover = true;
                }, this.delay);
            },
            hoverEnd: function hoverEnd() {
                if (this.st) clearTimeout(this.st);
                this.hover = false;
            }
        },
        watch: {
            'hover': {
                handler: function handler(val, oldVal) {
                    if (this.hover == true) {
                        if (this.hoverEffect == 1) {
                            this.$refs.hoverImg.style.width = 'calc(100% - 2px)';
                            this.$refs.hoverImg.style.height = 'calc(100% - 2px)';
                        } else if (this.hoverEffect == 5) {
                            this.LH = this.src.style.height;
                        }
                    }
                    if (this.hover == false) {
                        if (this.hoverEffect == 1) {
                            this.$refs.hoverImg.style.width = '100%';
                            this.$refs.hoverImg.style.height = '100%';
                        }
                    }
                },
                deep: true
            },
            'src': {
                handler: function handler() {
                    this.desc = this.src.imgInput != undefined ? this.src.imgInput : this.desc;
                },
                deep: true
            }
        },

        mounted: function mounted() {}
    };
});