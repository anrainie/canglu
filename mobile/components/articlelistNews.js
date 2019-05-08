'use strict';

define(['swiper'], function (Swiper) {
    return {
        props: {
            model: {
                default: {
                    title: '新闻列表',
                    type: 0, //0基础 1多列配图 2多行配图 3置顶配图
                    categories: ['未分类', '新闻中心', '热门专题'],
                    articleStyle: {
                        'font-family': 'STSongti',
                        'font-size': '14px',
                        'color': '#444',
                        'font-weight': 'bold'
                    },
                    titleSet: {
                        isDefault: false,
                        'font-size': '14px',
                        'font-weight': 'normal',
                        'text-decoration': 'none',
                        'font-family': 'Microsoft YaHei',
                        'color': '#333'
                    },
                    imageWidth: '120px',
                    imageHeight: '120px',
                    hoverEffect: 0,
                    titleBarStyle: {
                        show: false
                    },
                    subtitle: '',
                    style: {
                        width: '100%',
                        height: '470px'
                    },
                    articleSource: [], //0直接添加 1筛选条件
                    newsCate: [],
                    capacity: 3,
                    topIcon: {
                        isShow: false,
                        showIcon: 'https://image-clwebsite.cangluxmt.com/images/example/icons/jing.png'
                    }
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '编辑模块（新闻列表）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题'
                                },
                                component: 'dialog/text'
                            },
                            type: {
                                config: {
                                    text: '列表样式:',
                                    style: {
                                        width: '80px',
                                        height: '50px',
                                        border: '1px solid #cccccc'
                                    },
                                    options: [{
                                        image: 'images/components/img_wzlb_ys_a.png',
                                        text: '基础样式'
                                    }, {
                                        image: 'images/components/img_wzlb_ys_b.png',
                                        text: '多列配图'
                                    }, {
                                        image: 'images/components/img_wzlb_ys_c.png',
                                        text: '多行配图'
                                    }, {
                                        image: 'images/components/img_wzlb_ys_d.png',
                                        text: '置顶配图'
                                    }, {
                                        image: 'images/components/img_wzlb_ys_e.png',
                                        text: '时间轴'
                                    }, {
                                        image: 'images/components/img_wzlb_ys_f.png',
                                        text: '基础带简介'
                                    }, {
                                        image: 'images/components/img_wzlb_ys_g.png',
                                        text: '日期前置'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            },
                            articleSource: {
                                component: 'dialog/editing/articleNewsSource'
                            }
                        },
                        '高级': {
                            imageWidth: {
                                config: {
                                    text: '图片宽度',
                                    unit: ''
                                },
                                component: 'dialog/text'
                            },
                            imageHeight: {
                                config: {
                                    text: '图片高度',
                                    unit: ''
                                },
                                component: 'dialog/text'
                            },
                            capacity: {
                                config: {
                                    text: '分页容量'
                                },
                                component: 'dialog/text'
                            },
                            showMore: {
                                component: 'dialog/editing/pt-showmore'
                            }
                        },
                        '标题设置': {
                            titleSet: {
                                config: {
                                    text: '文字：'
                                },
                                component: 'dialog/editing/titleSet'
                            },
                            topIcon: {
                                config: {
                                    text1: '置顶标识：',
                                    text2: '标志选择：',
                                    ShowType: [{
                                        text: '显示',
                                        value: true
                                    }, {
                                        text: '隐藏',
                                        value: false
                                    }],
                                    iconList: [{
                                        imgSrc: 'https://image-clwebsite.cangluxmt.com/images/example/icons/jing.png'
                                    }, {
                                        imgSrc: 'https://image-clwebsite.cangluxmt.com/images/example/icons/new.png'
                                    }, {
                                        imgSrc: 'https://image-clwebsite.cangluxmt.com/images/example/icons/top0.png'
                                    }, {
                                        imgSrc: 'https://image-clwebsite.cangluxmt.com/images/example/icons/wangg.png'
                                    }]
                                },
                                component: 'dialog/editing/topIcon'
                            }
                        }
                    }
                }
            }
        },
        data: function data() {
            return {
                articles: [],
                currentPage: 0,
                loading: true,
                defaultTitleSet: {
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    'font-family': 'Microsoft YaHei',
                    'color': '#333'
                }
            };
        },
        created: function created() {
            if (this.model.type == 1) {
                this.slide();
            }
        },

        methods: {
            showDetail: function showDetail(art) {
                window.location.href = 'http://' + app.saveParams.domainUrl + '/news/' + art.id + '.html';
            },
            date: function date(art) {
                return art.year + '/' + art.month + '/' + art.day;
            },
            paging: function paging(i) {
                var end = this.start + parseInt(this.model.capacity);
                return this.start <= i && end > i;
            },
            slide: function slide() {
                setTimeout(function () {
                    var swiper = new Swiper('.swiperContainer8', {
                        slidesPerView: 2,
                        spaceBetween: 10
                    });
                }, 300);
            }
        },
        watch: {
            'model': {
                handler: function handler() {
                    if (this.model.type == 1) {
                        this.slide();
                    }
                },
                deep: true
            },
            'model.articleSource': function modelArticleSource(v) {
                var _this = this;

                var ids = '';
                this.loading = true;
                if (this.model.articleSource.length) {
                    this.model.articleSource.forEach(function (e) {
                        ids += e + ',';
                    });
                    ids = ids.substring(0, ids.length - 1);
                    app.loadNewsSummaryAll(ids, function (data) {
                        _this.loading = false;
                        _this.articles = data;
                    });
                } else {
                    this.articles = [];
                    this.loading = false;
                }
            }
        },
        mounted: function mounted() {
            if (this.model.topIcon == undefined) {
                this.model.topIcon = {
                    isShow: false,
                    showIcon: 'https://image-clwebsite.cangluxmt.com/images/example/icons/new.png'
                };
            }
            if (this.model.titleSet == undefined) {
                this.model.titleSet = {
                    isDefault: false,
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    'font-family': 'Microsoft YaHei',
                    'color': '#333'
                };
            }
            if (this.model.type >= 7) {
                this.model.type = this.model.type - 7;
            }
            var width = this.model.imageWidth == undefined ? '120px' : this.model.imageWidth;
            var height = this.model.imageHeight == undefined ? '120px' : this.model.imageHeight;
            this.model.imageWidth = app.mobileFit(width);
            this.model.imageHeight = app.mobileFit(height);
        },

        computed: {
            start: function start() {
                return this.currentPage * this.model.capacity;
            },
            wid: function wid() {
                return this.model.type == '4' ? 'width:100%' : 'width:75%';
            },
            defaultStyle: function defaultStyle() {
                var s = {};
                if (this.model.titleSet.isDefault) {
                    s = {
                        'font-size': this.model.titleSet['font-size'],
                        'font-weight': this.model.titleSet['font-weight'],
                        'text-decoration': this.model.titleSet['text-decoration'],
                        'font-family': this.model.titleSet['font-family'],
                        'color': this.model.titleSet.color
                    };
                } else {
                    s = {
                        'font-size': this.defaultTitleSet['font-size'],
                        'font-weight': this.defaultTitleSet['font-weight'],
                        'text-decoration': this.defaultTitleSet['text-decoration'],
                        'font-family': this.defaultTitleSet['font-family'],
                        'color': this.defaultTitleSet.color
                    };
                }
                return s;
            }
        }
    };
});