'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                article: {},
                nextInfo: {},
                prevInfo: {},
                ref: null
            };
        },

        computed: {},
        watch: function watch() {},
        created: function created() {
            var self = this;
            var id = app.getRequest().detailid;
            var allInfo = JSON.parse(app.toSessionStorage('allInfo'));
            for (var i = 0; i < allInfo.length; i++) {
                if (id == allInfo[i].id) {
                    if (allInfo[i + 1] != null || allInfo[i] != undefined) {
                        self.nextInfo = allInfo[i + 1];
                    }
                    if (allInfo[i - 1] != null || allInfo[i] != undefined) {
                        self.prevInfo = allInfo[i - 1];
                    }
                }
            }
            var picsUrl = domain + 'news/' + id + '.html';
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        self.article = response.data.news;
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },
        mounted: function mounted() {
            if (!this.$refs.sh) {
                this.ref = $('.articleDetailsInfo')[0];
            } else {
                this.ref = this.$refs.sh;
            }
            this.model.titleBarStyle.show = false;
            this.model.removeShow = false;
            this.model.style['padding-left'] = "";
            this.model.style.height = 'auto';
        },

        methods: {
            newsInfo: function newsInfo(id) {
                var self = this;
            },
            showDetail: function showDetail(id) {
                app.changePage(app.toWebsessionStorage('ndId'), id);
            },
            getHeight: function getHeight() {
                var _this = this;

                setTimeout(function () {
                    var h = _this.ref.offsetHeight;
                    _this.model.style.height = parseInt(h + 40) + 'px';
                    app.detailHeight = _this.model.style.height;
                }, 2000);
            }
        },
        updated: function updated() {
            this.getHeight();
        },

        props: {
            model: {
                type: Object,
                default: {
                    title: '文章详情',
                    subtitle: '副标题',
                    titleBarStyle: {
                        show: false
                    },
                    share: true, //开启分享
                    parameter: ['0', '1', '2', '3', '4', '5'], //页面元素
                    type: 0, //组件样式
                    name: '', //组件标题
                    desc: '',
                    style: {
                        width: '100%',
                        height: '600px',
                        opacity: 1,
                        'border-radius': '0px',
                        'border-style': 'solid',
                        'border-color': 'black',
                        'border-width': '1px',
                        'border-bottom': 'medium none'
                    }
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '编辑组件（文章详情）',
                    pages: {
                        '常规': {
                            type: {
                                config: {
                                    text: '组件样式：',
                                    style: {
                                        width: '80px',
                                        height: '50px'
                                    },
                                    options: [{
                                        text: '纯文字',
                                        image: './images/components/buju_a.png'
                                    }, {
                                        text: '上图下文',
                                        image: './images/components/buju_b.png'
                                    }, {
                                        text: '图文混合1',
                                        image: './images/components/buju_c.png'
                                    }, {
                                        text: '图文混合2',
                                        image: './images/components/buju_f.png'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            },
                            share: {
                                component: 'dialog/editing/productDetails-share'
                            },
                            parameter: {
                                config: {
                                    text: '展示参数：',
                                    checkbox: [{
                                        name: '日期',
                                        value: '0'
                                    }, {
                                        name: '作者',
                                        value: '1'
                                    }, {
                                        name: '分类',
                                        value: '2'
                                    }, {
                                        name: '来源',
                                        value: '3'
                                    }, {
                                        name: '网址',
                                        value: '4'
                                    }, {
                                        name: '上/下一篇',
                                        value: '5'
                                    }]
                                },
                                component: 'dialog/editing/productDetails-parameter'
                            }
                        }
                    }
                }

            }
        }

    };
});