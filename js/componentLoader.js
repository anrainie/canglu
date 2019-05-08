'use strict';

/**
 * 组件加载器
 */

//缓存Vue对象

var pool = {};
define([], function () {
    //根据path获取名称
    function cal(path) {
        var r = path.split('/');
        return r[r.length - 1];
    }

    var DEF_CAPA = 1.5;
    var queue = [];

    var $win = $(window);
    var lastLoadPlace = $win.scrollTop();

    var applyLoad = function applyLoad() {
        lastLoadPlace = $win.scrollTop();
        var winHeight = $win.height();
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].offsetY <= (lastLoadPlace + winHeight) * DEF_CAPA) {
                queue[i].callback();
                queue.splice(i, 1);
            } else break;
        }
    };

    //scroll改变时验证加载
    $win.scroll(function () {
        var currentScrollTop = $win.scrollTop();
        if (currentScrollTop - lastLoadPlace > 20) applyLoad();
    });

    //resize改变时验证加载
    $win.resize(function () {
        applyLoad();
    });

    return {
        /**
         * 判断组件是否在视图上方，第一个参数是offsetY，第二个参数是容差
         */
        isAboveView: function isAboveView(offsetY) {
            var capa = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEF_CAPA;
            var ca11back = arguments[2];

            var winScrollTop = $win.scrollTop();
            var winHeight = $win.height();
            var limit = (winScrollTop + winHeight) * capa;
            if (offsetY < limit) {
                return true;
            }
            ca11back && ca11back();
            return false;
        },

        /**
         * 可见时加载
         */
        loadOnVisible: function loadOnVisible(offsetY, callback) {
            //数据量小，且顺序数据的可能性大，直接遍历插入，如果有性能问题，考虑用二分法插入
            var len = queue.length;
            for (var i = 0; i < len; i++) {
                if (queue[i] > offsetY) {
                    queue.splice(i, 0, { offsetY: offsetY, callback: callback });
                    break;
                }
            }
            if (len == queue.length) {
                queue.push({ offsetY: offsetY, callback: callback });
            }
        },

        /**
         * 加载全局配置单
         * @param configs
         */
        config: function config(configs, res) {
            return new Promise(function () {
                var _loop = function _loop(index) {
                    var path = configs[index];
                    if (app.isPreview) {
                        if (path.indexOf('tools') > -1 || path.indexOf('dialog') > -1 || path.indexOf('guide') > -1 || path.indexOf('header') > -1) return 'continue';
                    }
                    require(['text!../components/' + path + '.html', '../components/' + path], function (html, js) {
                        // let url='https://image-clwebsite.cangluxmt.com/clwebsite/components/';
                        // require(['text!'+url + path + '.html', url+ path + '.js'], (html, js) => {
                        var v = {
                            template: html,
                            mixins: [js]
                        };
                        pool[path] = v;
                        var name = cal(path);
                        try {
                            Vue.component('v-' + name, pool[path]);
                        } catch (e) {
                            console.error('加载全局组件失败: ', name, v);
                        }
                        if (res && index == configs.length - 1) res();
                    });
                };

                for (var index = 0; index < configs.length; index++) {
                    var _ret = _loop(index);

                    if (_ret === 'continue') continue;
                }
            });
        },
        createVue: function createVue(path, callback) {
            var _this = this;

            return new Promise(function (res) {
                _this.load(path)(function (config) {
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
                if (t = pool[path]) res(t);else {
                    require(['text!../components/' + path + '.html', '../components/' + path], function (html, js) {
                        var v = {
                            template: html,
                            mixins: [js]
                        };
                        pool[path] = v;
                        res(v);
                    });
                }
            };
        },
        loadLinkDialog: function loadLinkDialog(_ref) {
            var _this2 = this;

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
                _this2.fill("#tempdialog1", editDialog);
                editDialog.open(callback);
            });
        },
        loadMemDialog: function loadMemDialog(_ref2) {
            var _this3 = this;

            var model = _ref2.model,
                callback = _ref2.callback;

            var config = {
                title: '会员登录条设置',
                canCancel: false,
                pages: {
                    '设置': {
                        link: {
                            component: 'dialog/editing/memember'
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
                _this3.fill("#tempdialog2", editDialog);
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
        loadImageDialog: function loadImageDialog(_ref3) {
            var _this4 = this;

            var model = _ref3.model,
                callback = _ref3.callback,
                selectChanged = _ref3.selectChanged,
                multiselect = _ref3.multiselect;

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