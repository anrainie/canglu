'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define([], function () {
    return _defineProperty({
        watch: {
            'model.type': function modelType(v) {
                var _this = this;

                setTimeout(function () {
                    _this.refresh();
                });
            }
        },
        props: {
            model: {
                default: {
                    title: '产品搜索',
                    subtitle: '副标题',
                    placeholder: '请输入搜索内容',
                    text: '',
                    type: 0,
                    inputStyle: {
                        width: '300px',
                        height: '50px'
                    },
                    keywords: [],
                    titleBarStyle: {
                        height: 40
                    },
                    titleVisible: false,
                    style: {
                        width: '600px',
                        height: '80px',
                        opacity: 1,
                        searchH: '40px',
                        background: 'inherit'
                    },
                    checked: true, //关闭model检查
                    btnBg: 'rgb(96,166,226)'
                }
            },
            editingConfig: {
                default: {
                    title: '组件编辑（产品搜索）',
                    pages: {
                        '常规': {
                            title: {
                                config: {
                                    text: '组件标题',
                                    placeholder: '请填写页面名称'
                                },
                                component: 'dialog/text'
                            },
                            type: {
                                config: {
                                    text: '组件样式',
                                    style: {
                                        width: '175px',
                                        height: '120px'
                                    },
                                    options: [{
                                        channel: 1,
                                        image: 'images/components/img_cpss_a.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_cpss_b.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_cpss_c.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_cpss_d.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_cpss_e.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_cpss_f.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_cpss_g.png',
                                        text: '1'
                                    }, {
                                        channel: 1,
                                        image: 'images/components/img_cpss_h.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/img_cpss_a.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/img_cpss_b.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/img_cpss_c.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/img_cpss_d.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/img_cpss_e.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/img_cpss_f.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/img_cpss_g.png',
                                        text: '1'
                                    }, {
                                        channel: 2,
                                        image: 'images/components/img_cpss_h.png',
                                        text: '1'
                                    }]
                                },
                                component: 'dialog/editing/style-list'
                            },
                            colorSize: {
                                config: {
                                    text: '按钮颜色',
                                    colorList: [{
                                        color: '#FF3B30'
                                    }, {
                                        color: '#FF9500'
                                    }, {
                                        color: '#FFCC00'
                                    }, {
                                        color: '#4CD964'
                                    }, {
                                        color: '#007AFF'
                                    }, {
                                        color: '#5856D6'
                                    }],
                                    current_2: 123
                                },
                                component: 'dialog/editing/searchColor'
                            }
                        },
                        '属性设置': {
                            inputStyle: {
                                component: 'dialog/editing/search-style'
                            }
                        },
                        '展示设置': {
                            placeholder: {
                                config: {
                                    text: '搜索提示',
                                    placeholder: '请输入搜索提示'
                                },
                                component: 'dialog/text'
                            },
                            keywords: {
                                component: 'dialog/editing/keywords'
                            }
                        }
                    }
                }
            },
            settingConfig: {}
        },
        data: function data() {
            return {};
        },

        computed: {
            slot: function slot() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 2:
                    case 8:
                    case 9:
                    case 10:
                        return 'append';
                    case 3:
                    case 4:
                    case 7:
                    case 11:
                    case 12:
                    case 15:
                        return 'suffix';
                    case 5:
                    case 13:
                        return 'prefix';
                }
            },
            showButton: function showButton() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 2:
                    case 8:
                    case 9:
                    case 10:
                        return true;
                }
                return false;
            },
            showICON: function showICON() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 2:
                    case 8:
                    case 9:
                    case 10:
                        return false;
                }
                return true;
            },
            icon: function icon() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 8:
                    case 9:
                        return '';
                }
                return "el-icon-search";
            },
            suffix: function suffix() {
                switch (this.model.type) {
                    case 3:
                    case 4:
                    case 6:
                    case 7:
                    case 11:
                    case 12:
                    case 14:
                    case 15:
                        return 'el-icon-search';
                }
                return "";
            },
            prefix: function prefix() {
                switch (this.model.type) {
                    case 5:
                    case 13:
                        return 'el-icon-search';
                }
                return "";
            },
            text: function text() {
                switch (this.model.type) {
                    case 0:
                    case 1:
                    case 8:
                    case 9:
                        return "搜索";
                }
                return '';
            },
            restaurants: function restaurants() {
                var r = [];

                this.model.keywords.forEach(function (e) {
                    r.push({
                        value: e
                    });
                });

                return r;
            }
        },
        mounted: function mounted() {
            this.model.titleBarStyle.show = false;
            this.refresh();
            window.s = this;
        },

        methods: {
            reset: function reset() {
                this.append = $(this.$el).find('.el-input-group__append')[0];
                this.inner = $(this.$el).find('.el-input__inner')[0];
                this.suffixEl = $(this.$el).find('.el-input__suffix')[0];
                this.prefixEl = $(this.$el).find('.el-input__prefix')[0];
                var SH = this.model.style.searchH;
                $(this.inner).css({
                    height: SH,
                    'line-height': SH
                });
                if (this.append && this.appendStyle == null) this.appendStyle = {
                    border: this.append.style.border,
                    color: this.append.style.border.color,
                    'background-color': this.append.style['backgound-color']
                };

                if (this.inner && this.innerStyle == null) this.innerStyle = {
                    border: this.inner.style.border,
                    'border-radius': this.inner.style.border,
                    'border-bottom': null
                };

                if (this.suffixEl) {
                    // setTimeout(() => {
                    $(this.suffixEl).css("transform", '');
                    // },500);
                }

                if (this.appendStyle && this.append) for (var key in this.appendStyle) {
                    this.append.style[key] = this.appendStyle[key];
                }

                if (this.innerStyle) for (var _key in this.innerStyle) {
                    this.inner.style[_key] = this.innerStyle[_key];
                }
            },
            refresh: function refresh() {
                var _this2 = this;

                setTimeout(function () {
                    _this2.reset();
                    var append = _this2.append;
                    var suffixEl = _this2.suffixEl;
                    var inner = _this2.inner;
                    var prefixEl = _this2.prefixEl;
                    var color = _this2.model.btnBg;
                    if (_this2.model.type < 3 || _this2.model.type > 7 && _this2.model.type < 11) {
                        if (append) {
                            $(append).css({
                                border: '1px solid ' + color,
                                color: 'white',
                                'background-color': color
                            });
                        }

                        if (inner && _this2.model.type != 0 && _this2.model.type != 8) {
                            if (inner) {
                                $(inner).css({
                                    border: '1px solid #ccc'
                                });
                            }
                        } else if (_this2.model.type == 0 || _this2.model.type == 8) {
                            if (inner) {
                                $(inner).css({
                                    border: '1px solid ' + color
                                });
                            }
                        }
                    } else {
                        if (suffixEl) {
                            $(suffixEl).css({
                                color: color
                            });
                        }
                        if (prefixEl) {
                            $(prefixEl).css({
                                color: color
                            });
                        }

                        if (_this2.model.type == 3 || _this2.model.type == 11) {
                            if (inner) {
                                $(inner).css({
                                    border: '1px solid ' + color
                                });
                            }
                        } else if (_this2.model.type == 6 || _this2.model.type == 14) {
                            if (inner) {
                                $(inner).css({
                                    'border-radius': '20px'
                                });
                            }
                        } else if (_this2.model.type == 7 || _this2.model.type == 15) {
                            if (inner) {
                                $(inner).css({
                                    'border': 'none',
                                    'border-radius': '0',
                                    'border-bottom': '1px solid #ccc'
                                });
                            }
                        }
                    }
                });
            },
            querySearchAsync: function querySearchAsync(queryString, cb) {

                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter: function createFilter(queryString) {
                return function (restaurant) {
                    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
                };
            },
            search: function search() {
                var _this3 = this;

                var data = {
                    name: this.model.text,
                    userWebId: app.saveParams.id
                };
                app.getSearch(data, function (res) {
                    if (!res.data || !res.success) _this3.$message.error('暂无可查询的内容!');else {
                        var link = document.createElement('a');
                        var pageid = res.data.pageId;
                        link.setAttribute('href', 'http://' + app.toWebsessionStorage('domainUrl') + '?pageid=' + pageid);
                        link.setAttribute('id', 'link');
                        link.setAttribute('target', '_blank');
                        var html = document.getElementsByTagName('html')[0];
                        html.appendChild(link);
                        link.click();
                        html.removeChild(link);
                    }
                }, function () {
                    _this3.$message.error('网络错误');
                });
            }
        },
        enter: function enter(value) {
            this.model.text = value;
        }
    }, 'watch', {
        'model': {
            handler: function handler(val, oldVal) {
                this.refresh();
            },
            deep: true
        }
    });
});