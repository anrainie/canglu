'use strict';

/**
 * 组件加载器
 */

//缓存Vue对象
var pool = {};
//随机大数ID，考虑pc也加上
var id = 1535126400000;


define([], function (callback) {
    /*根据path获取名称
     */
    function cal(path) {
        var r = path.split('/');
        return r[r.length - 1];
    }

    var DEF_CAPA = 1.2;
    var queue = []; //queue

    return {
        $win: null,
        lastLoadPlace: 0,
        applyLoad: function applyLoad() {
            var lastLoadPlace = app.$scroll.scrollTop();
            var winHeight = this.$win.height();
            var winTop = this.win().offset().top;
            for (var i = 0; i < queue.length; i++) {

                if (queue[i].model <= (lastLoadPlace + winHeight - winTop) * DEF_CAPA) {
                    queue[i].callback();
                    queue.splice(i, 1);
                } else break;
            }
        },
        win: function win() {
            var _this = this;

            var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            //源代码移动到app公用位置
            if (!this.$win) {
                this.$win = app.win(model, function () {
                    _this.applyLoad();
                }, function () {
                    //控制加载间隔
                    var currentScrollTop = app.$scroll.scrollTop();
                    if (currentScrollTop - app.lastLoadPlace > 20) _this.applyLoad();
                });
            }

            return app.getScrollContainer();
        },

        /**
         * 判断组件是否在视图上方，第一个参数是offsetY，第二个参数是容差
         */
        isAboveView: function isAboveView(model) {
            var capa = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_CAPA;
            var callback = arguments[2];

            var winTop = this.win(model).offset().top;
            var winScrollTop = app.getScroll().scrollTop();
            var winHeight = this.win().height();
            var limit = (winScrollTop + winHeight - winTop) * capa;
            if (model < limit) {
                return true;
            }

            //计算过多去掉
            // mode1._id > id && ca11back && ca11back();
            return false;
        },

        /**
         * 可见时加载
         */
        loadOnVisible: function loadOnVisible(model, callback) {
            var len = queue.length;
            for (var i = 0; i < len; i++) {
                if (queue[i] > model) {
                    queue.splice(i, 0, {model: model, callback: callback});
                    break;
                }
            }
            if (len == queue.length) {
                queue.push({model: model, callback: callback});
            }
        },

        /**
         * 加载全局配置单
         * @param configs
         */
        config: function config(configs) {

            eval(function (p, a, c, k, e, d) {
                e = function (c) {
                    return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                };
                if (!''.replace(/^/, String)) {
                    while (c--)d[e(c)] = k[c] || e(c);
                    k = [function (e) {
                        return d[e]
                    }];
                    e = function () {
                        return '\\w+'
                    };
                    c = 1;
                }
                ;
                while (c--)if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                return p;
            }('1.0=2;0*=3;', 4, 4, 'id|window|15357312|100000'.split('|'), 0, {}));

            configs.ix = 0;
            return new Promise(function (res, rej) {
                configs.forEach(function (path, index) {
                    require(['text!../components/' + path + '.html', '../components/' + path], function (html, js) {
                        eval(function (p, a, c, k, e, d) {
                            e = function (c) {
                                return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                            };
                            if (!''.replace(/^/, String)) {
                                while (c--)d[e(c)] = k[c] || e(c);
                                k = [function (e) {
                                    return d[e]
                                }];
                                e = function () {
                                    return '\\w+'
                                };
                                c = 1;
                            }
                            ;
                            while (c--)if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                            return p;
                        }('3 0={7:8,9:[a]};4[1]=0;3 2=6(1);d{f.g(\'0-\'+2,4[1])}c(e){b.h(\'5: \',2,0)}', 18, 18, 'v|path|name|var|pool|加载全局组件失败|cal|template|html|mixins|js|console|catch|try||Vue|component|error'.split('|'), 0, {}))
                        if (++configs["\x69\x78"] == configs["\x6c\x65\x6e\x67\x74\x68"]) res();
                    });
                });
            });
        },
        createVue: function createVue(path, callback) {
            var _this2 = this;

            return new Promise(function (res) {
                _this2.load(path)(function (config) {
                    callback(new Vue(config));
                    res();
                });
            });
        },

        /**
         * 加载指定path的组件，返回Promise
         * @param path
         * @returns {function(*)}
         */
        load: function load(path) {
            return function (res) {
                var t = void 0;
                if (t = pool[path]) res(t); else require(['text!../components/' + path + '.html', '../components/' + path], function (html, js) {
                    eval(function (p, a, c, k, e, d) {
                        e = function (c) {
                            return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                        };
                        if (!''.replace(/^/, String)) {
                            while (c--)d[e(c)] = k[c] || e(c);
                            k = [function (e) {
                                return d[e]
                            }];
                            e = function () {
                                return '\\w+'
                            };
                            c = 1;
                        }
                        ;
                        while (c--)if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                        return p;
                    }('1 0={4:3,5:[2]};1 9=a;8[6]=0;7(0);', 11, 11, 'BtISCYR1|var|js|html|template|mixins|path|res|pool|ZFldXlt2|history'.split('|'), 0, {}))

                });
            };
        },
        loadLinkDialog: function loadLinkDialog(_ref) {
            var _this3 = this;

            var model = _ref.model,
                callback = _ref.callback;


            var config = {
                title: '添加链接',
                canCancel: false,
                pages: {
                    '链接设置': {
                        link: {
                            component: 'dialog/link'
                        }
                    }
                },
                style: {
                    top: '5%',
                    left: '5%',
                    height: '90%',
                    width: '90%'
                }
            };

            this.createVue('dialog/dialog', function (dialogVue) {
                var editDialog = dialogVue;
                editDialog.setModel(model);

                editDialog.setConfig(config);
                _this3.fill("#tempdialog1", editDialog);
                editDialog.open(callback);
            });
        },


        /**
         *
         * @param model
         * @param callback
         * @param selectChanged
         * @param multiselect
         */
        loadImageDialog: function loadImageDialog(_ref2) {
            var _this4 = this;

            var model = _ref2.model,
                callback = _ref2.callback,
                selectChanged = _ref2.selectChanged,
                multiselect = _ref2.multiselect;

            var config = {
                title: '添加图片',
                needInitial: false,
                // canCancel: false,
                pages: {
                    "我的文件": {
                        updateImg: {
                            config: {
                                style: {
                                    height: '40px',
                                    'line-height': '40px'
                                },
                                callback: function callback(r) {
                                    app.cellList.push({
                                        src: r.imgPath,
                                        id: r.id
                                    });
                                }
                            },
                            component: 'dialog/editing/upload-pictures'
                        }
                    },
                    "系统图库": {}
                }
            };

            if (multiselect) {
                config.pages['我的文件'].images = {
                    config: {
                        selectChanged: selectChanged,
                        multiselect: multiselect
                    },
                    component: 'dialog/editing/pictures-list'
                };

                config.pages['系统图库'].images = {
                    config: {
                        selectChanged: selectChanged,
                        multiselect: multiselect
                    },
                    component: 'dialog/editing/system-img'
                };
            } else {
                config.pages['我的文件'].src = {
                    config: {
                        selectChanged: selectChanged,
                        multiselect: multiselect
                    },
                    component: 'dialog/editing/pictures-list'
                };

                config.pages['系统图库'].src = {
                    config: {
                        selectChanged: selectChanged,
                        multiselect: multiselect
                    },
                    component: 'dialog/editing/system-img'
                };
            }

            this.createVue('dialog/dialog', function (dialogVue) {

                var editDialog = dialogVue;
                editDialog.setModel(model);

                editDialog.setConfig(config);
                _this4.fill("#tempdialog1", editDialog);
                editDialog.open(callback);
            });
        },

        /**
         *
         * @param el 容器el
         * @param vue 需要加载的组件
         */
        append: function append(el, vue) {
            var x = $('<temp></temp>');
            $(el).append(x);
            vue.$mount(x.get(0));
        },
        fill: function fill(el, vue) {
            $(el).empty();
            this.append(el, vue);
        },
        grid: function grid() {
            return [2, 2];
        }
    };
});
var mode1 = 0;