'use strict';

define([], function () {
    return {
        props: {
            model: {
                default: {
                    title: '在线视频',
                    subtitle: '副标题',
                    src: '',
                    titleBarStyle: {
                        'background-image': '',
                        height: 50,
                        show: true,
                        useDefault: true
                    },
                    style: {
                        width: '300px',
                        height: '300px'
                    },
                    titleStyle: {},
                    backgroundStyle: {}
                }
            },
            editingConfig: {
                default: {
                    title: '在线视频',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '视频标题'
                                },
                                component: 'dialog/text'
                            },
                            style: {
                                config: {
                                    text: '视频宽高'
                                },
                                component: 'dialog/editing/size'
                            },
                            src: {
                                config: {
                                    text: '视频地址'
                                },
                                component: 'dialog/text'
                            },
                            helper: {
                                component: 'dialog/youkuHelper'
                            }
                        }
                    }
                }
            },
            settingConfig: {}
        },
        data: function data() {
            return {
                player: null
            };
        },

        computed: {
            uid: function uid() {
                return 'video' + this._uid;
            },
            src: function src() {
                var src = this.model.src;
                if (src.endsWith('/v.swf')) {
                    src = "http://player.youku.com/embed/" + src.substring("http://player.youku.com/player.php/sid/".length, src.indexOf('/v.swf'));
                }
                return src;
            },
            style: function style() {
                return {
                    width: '100%',
                    height: 'calc(100% -' + ' ' + this.model.titleBarStyle.height + 'px )',
                    position: 'relative'
                };
            }
        },
        watch: {
            'model': function model() {
                if (this.player) {
                    this.player.src(this.model.url);
                    this.player.load(this.model.url);
                }
            }
        },
        mounted: function mounted() {
            /*this.player = videojs(this.uid, this.model.options, () => {
                this.player.src(this.model.url);
                this.player.load(this.model.url);
                this.player.play();
            });*/
        }
    };
});