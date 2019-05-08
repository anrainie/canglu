'use strict';

define(['vueLoader'], function () {
    return {
        props: {
            model: {
                default: {
                    title: '文章列表',
                    subtitle: '副标题',
                    type: app.channel == '2' ? 7 : 0, //0基础 1多列配图 2多行配图 3置顶配图
                    showPage: true,
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
                    hoverText: {
                        isDefault: false,
                        'font-size': '14px',
                        'font-weight': 'normal',
                        'text-decoration': 'underline',
                        'font-family': 'Microsoft YaHei',
                        'color': '#999'
                    },
                    hoverBg: {
                        isDefault: false,
                        'backgroundImage': '',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center',
                        'background-size': 'cover',
                        'background-color': '#fff'
                    },

                    imageWidth: '120px',
                    imageHeight: '120px',
                    hoverEffect: 0,
                    style: {
                        width: '1200px',
                        height: '470px'
                    },
                    articleSource: [], //0直接添加 1筛选条件
                    capacity: 3,
                    timeShow: true,
                    underline: true,
                    underBorder: 'border-bottom: 1px dashed #ccc;',
                    topIcon: {
                        isShow: false,
                        showIcon: 'https://image-clwebsite.cangluxmt.com/images/example/icons/jing.png'
                    }
                }
            },
            settingConfig: {},
            editingConfig: {
                default: {
                    title: '编辑模块（文章列表）',
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
                                        channel: 1,
                                        image: 'images/components/img_wzlb_ys_a.png',
                                        text: '基础样式'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_wzlb_ys_b.png',
                                        text: '多列配图'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_wzlb_ys_c.png',
                                        text: '多行配图'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_wzlb_ys_d.png',
                                        text: '置顶配图'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_wzlb_ys_e.png',
                                        text: '时间轴'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_wzlb_ys_f.png',
                                        text: '基础带简介'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_wzlb_ys_g.png',
                                        text: '日期前置'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            },
                            articleSource: {
                                component: 'dialog/editing/articleSource'
                            }
                        },
                        '高级': {
                            imageWidth: {
                                config: {
                                    text: '图片宽度',
                                    unit: 'px'
                                },
                                component: 'dialog/text'
                            },
                            imageHeight: {
                                config: {
                                    text: '图片高度',
                                    unit: 'px'
                                },
                                component: 'dialog/text'
                            },
                            capacity: {
                                config: {
                                    text: '分页容量'
                                },
                                component: 'dialog/text'
                            },
                            showPage: {
                                component: 'dialog/editing/paginationEdit'
                            },
                            showMore: {
                                component: 'dialog/editing/pt-showmore'
                            },
                            showMoreTime: {
                                component: 'dialog/editing/pt-showmoreTime'
                            }
                        },
                        '标题设置': {
                            titleSet: {
                                config: {
                                    text: '文字：'
                                },
                                component: 'dialog/editing/titleSet'
                            },
                            hoverText: {
                                config: {
                                    text: '悬停文字：'
                                },
                                component: 'dialog/editing/titleSet'
                            },
                            hoverBg: {
                                config: {
                                    text: '悬停背景：',
                                    showStyle: '2',
                                    showList: [{
                                        name: '平铺',
                                        value: '0'
                                    }, {
                                        name: '拉伸',
                                        value: '1'
                                    }, {
                                        name: '填充',
                                        value: '2'
                                    }]
                                },
                                component: 'dialog/editing/hoverBg'
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
                dstyle: '',
                articles: [],
                currentPage: 0,
                loading: true,
                isHover: false,
                defaultTitleSet: {
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'text-decoration': 'none',
                    'font-family': 'Microsoft YaHei',
                    'color': '#333'
                },
                defaultHoverText: {
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'text-decoration': 'underline',
                    'font-family': 'Microsoft YaHei',
                    'color': '#999'
                },
                defaultHoverBg: {
                    'backgroundImage': '',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'background-size': 'cover',
                    'background-color': '#fff'
                },
                titleFontStyle: {
                    'font-size': '20px',
                    'color': '#000',
                    'line-height': '30px'
                }
            };
        },

        methods: {
            showDetail: function showDetail(id, allInfo) {
                app.changePage(app.toWebsessionStorage('ndId'), id, allInfo);
            },
            date: function date(art) {
                return art.year + '/' + art.month + '/' + art.day;
            },
            paging: function paging(i) {
                var end = this.start + parseInt(this.model.capacity);
                // console.log(this.start,end,i);
                return this.start <= i && end > i;
            },
            hoverStyle: function hoverStyle(i) {
                this.isHover = true;
                var s = $("#" + this._uid + " #" + i).get(0).style;
                var s2 = $("#" + this._uid + " #" + i).get(0).parentElement.style;
                if (this.model.hoverText.isDefault) {
                    if (this.model.type == 1 || this.model.type == 4 || this.model.type == 6) {
                        s.fontSize = this.model.hoverText['font-size'];
                        s.fontWeight = this.model.hoverText['font-weight'];
                        s.textDecoration = this.model.hoverText['text-decoration'];
                        s.fontFamily = this.model.hoverText['font-family'];
                        s.color = this.model.hoverText.color;
                    } else {
                        var s1 = $("#" + this._uid + " #" + i).get(0).nextElementSibling.style;
                        s.fontSize = s1.fontSize = this.model.hoverText['font-size'];
                        s.fontWeight = s1.fontWeight = this.model.hoverText['font-weight'];
                        s.textDecoration = s1.textDecoration = this.model.hoverText['text-decoration'];
                        s.fontFamily = s1.fontFamily = this.model.hoverText['font-family'];
                        s.color = s1.color = this.model.hoverText.color;
                    }
                } else {
                    if (this.model.type == 1 || this.model.type == 4 || this.model.type == 6) {
                        s.fontSize = this.defaultHoverText['font-size'];
                        s.fontWeight = this.defaultHoverText['font-weight'];
                        s.textDecoration = this.defaultHoverText['text-decoration'];
                        s.fontFamily = this.defaultHoverText['font-family'];
                        s.color = this.defaultHoverText.color;
                    } else {
                        var _s = $("#" + this._uid + " #" + i).get(0).nextElementSibling.style;
                        s.fontSize = _s.fontSize = this.defaultHoverText['font-size'];
                        s.fontWeight = _s.fontWeight = this.defaultHoverText['font-weight'];
                        s.textDecoration = _s.textDecoration = this.defaultHoverText['text-decoration'];
                        s.fontFamily = _s.fontFamily = this.defaultHoverText['font-family'];
                        s.color = _s.color = this.defaultHoverText.color;
                    }
                }
                if (this.model.hoverBg.isDefault) {
                    s2.backgroundImage = 'url(' + this.model.hoverBg.backgroundImage + ')';
                    s2.backgroundRepeat = this.model.hoverBg['background-repeat'];
                    s2.backgroundPosition = this.model.hoverBg['background-position'];
                    s2.backgroundSize = this.model.hoverBg['background-size'];
                    s2.backgroundColor = this.model.hoverBg['background-color'];
                } else {
                    s2.backgroundImage = 'url()';
                    s2.backgroundRepeat = this.defaultHoverBg['background-repeat'];
                    s2.backgroundPosition = this.defaultHoverBg['background-position'];
                    s2.backgroundSize = this.defaultHoverBg['background-size'];
                    s2.backgroundColor = this.defaultHoverBg['background-color'];
                }
            },
            defaultStyle: function defaultStyle() {
                for (i in this.$refs.title) {
                    s = this.$refs.title[i].style;
                    s2 = this.$refs.titleBg[i].style;
                    if (this.model.titleSet.isDefault) {
                        if (this.model.type == 1 || this.model.type == 4 || this.model.type == 6) {
                            s['font-size'] = this.model.titleSet['font-size'];
                            s['font-weight'] = this.model.titleSet['font-weight'];
                            s['text-decoration'] = this.model.titleSet['text-decoration'];
                            s['font-family'] = this.model.titleSet['font-family'];
                            s['color'] = this.model.titleSet.color;
                        } else {
                            var s1 = $(this.$refs.time[i]).get(0).style;
                            s['font-size'] = s1['font-size'] = this.model.titleSet['font-size'];
                            s['font-weight'] = s1['font-weight'] = this.model.titleSet['font-weight'];
                            s['text-decoration'] = s1['text-decoration'] = this.model.titleSet['text-decoration'];
                            s['font-family'] = s1['font-family'] = this.model.titleSet['font-family'];
                            s['color'] = s1['color'] = this.model.titleSet.color;
                        }
                    } else {
                        if (this.model.type == 1 || this.model.type == 4 || this.model.type == 6) {
                            s['font-size'] = this.defaultTitleSet['font-size'];
                            s['font-weight'] = this.defaultTitleSet['font-weight'];
                            s['text-decoration'] = this.defaultTitleSet['text-decoration'];
                            s['font-family'] = this.defaultTitleSet['font-family'];
                            s['color'] = this.defaultTitleSet.color;
                        } else {
                            if (this.$refs.time && this.$refs.time[i]) {
                                var _s2 = $(this.$refs.time[i]).get(0).style;
                                s['font-size'] = _s2['font-size'] = this.defaultTitleSet['font-size'];
                                s['font-weight'] = _s2['font-weight'] = this.defaultTitleSet['font-weight'];
                                s['text-decoration'] = _s2['text-decoration'] = this.defaultTitleSet['text-decoration'];
                                s['font-family'] = _s2['font-family'] = this.defaultTitleSet['font-family'];
                                s['color'] = _s2['color'] = this.defaultTitleSet.color;
                            }
                        }
                    }
                    s2['backgroundImage'] = "";
                    s2['backgroundColor'] = "";
                }
            },
            defaultS: function defaultS() {
                var style = {};
                if (this.isHover == false) {
                    if (this.model.titleSet.isDefault) {
                        style = {
                            'font-size': this.model.titleSet['font-size'],
                            'font-weight': this.model.titleSet['font-weight'],
                            'text-decoration': this.model.titleSet['text-decoration'],
                            'font-family': this.model.titleSet['font-family'],
                            'color': this.model.titleSet.color
                        };
                    } else {
                        style = {
                            'font-size': this.defaultTitleSet['font-size'],
                            'font-weight': this.defaultTitleSet['font-weight'],
                            'text-decoration': this.defaultTitleSet['text-decoration'],
                            'font-family': this.defaultTitleSet['font-family'],
                            'color': this.defaultTitleSet.color
                        };
                    }
                }
                this.dstyle = style;
            }
        },
        watch: {
            'model.titleSet': function modelTitleSet() {
                this.defaultStyle();
            },
            'model.articleSource': function modelArticleSource() {
                var _this = this;

                var ids = '';
                this.loading = true;
                if (this.model.articleSource.length) {
                    this.model.articleSource.forEach(function (e) {
                        ids += e + ',';
                    });
                    ids = ids.substring(0, ids.length - 1);
                    app.loadArticlesAll(ids, function (data) {
                        _this.loading = false;
                        _this.articles = data;
                    });
                } else {
                    this.articles = [];
                    this.loading = false;
                }
            },
            'model.underline': function modelUnderline() {
                if (this.model.underline) {
                    this.model.underBorder = 'border-bottom: 1px dashed #ccc';
                } else {
                    this.model.underBorder = 'border-bottom: 0px dashed #ccc';
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
            if (this.model.hoverText == undefined) {
                this.model.hoverText = {
                    isDefault: false,
                    'font-size': '14px',
                    'font-weight': 'normal',
                    'text-decoration': 'underline',
                    'font-family': 'Microsoft YaHei',
                    'color': '#999'
                };
            }
            if (this.model.hoverBg == undefined) {
                this.model.hoverBg = {
                    isDefault: false,
                    'backgroundImage': '',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'background-size': 'cover',
                    'background-color': '#fff'
                };
            }
            this.defaultS();
            if (this.model.timeShow == undefined) this.model.timeShow = true;
            if (this.model.underline == undefined) this.model.underline = true;
            if (this.model.underBorder == undefined) this.model.underBorder = 'border-bottom: 1px dashed #ccc';
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
                return this.model.type == '11' ? 'width:100%' : 'width:75%';
            },
            wid2: function wid2() {
                if (this.model.type == '2' || this.model.type == '5') {
                    return 'width:75%';
                } else if (this.model.type == '6') {
                    return 'width:100%';
                }
            }
        },
        components: {
            avs: {
                template: '<div :style="{width:st}"> <div style="width:100%;height:40px;line-height: 40px;"> ' + ' <span class="hover1" :style="wid2">{{art.name}}</span>' + '<span v-if="model.type!= 6 && model.type!=13" v-show="model.timeShow" style="float:right;font-size: 13px;color: #999;">{{art.createTime.slice(0,10)}}</span></div>' + ' <div style="font-size: 13px;color: #999; height: 40px!important;" class="line-2-hide">{{art.summary}}</div></div>',
                props: ['art', 'st', 'model'],
                mounted: function mounted() {},

                computed: {
                    wid2: function wid2() {
                        if (this.model.type == '2' || this.model.type == '5') {
                            return 'width:75%';
                        } else if (this.model.type == '6') {
                            return 'width:100%';
                        }
                    }
                }
            }
        }
    };
});