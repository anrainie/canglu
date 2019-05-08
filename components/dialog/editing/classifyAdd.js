'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                type: Object,
                defaulte: {}
            },
            callback: {}
        },
        data: function data() {
            return {
                status: true,
                name: '',
                id: '',
                linkType: 0,
                localLink: '',
                localLinkName: '',
                customLink: '',
                upChannel: '',
                blankYn: '',
                icon: '',
                webId: "",
                visible: false,
                goodsList: [],
                goodsInfo: [],
                selectedLinkType: '',
                pName: '',
                link: {
                    type: 0
                },
                domain: '',
                active: 0,
                linkTypeOptions: [],
                config: {},
                starX: '',
                starY: '',
                editingConfig: {
                    title: '编辑组件（分类目录）',
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
                                    text: '分类列表'
                                },
                                component: 'dialog/editing/classifyList'
                            }
                        },
                        '高级': {
                            totalModule: {
                                config: {
                                    text: '全站模块：',
                                    radio: [{
                                        name: '启动',
                                        value: '0'
                                    }, {
                                        name: '停用',
                                        value: '1'
                                    }]
                                },
                                component: 'dialog/radio'
                            },
                            classification: {
                                config: {
                                    text: '分类图标：',
                                    radio: [{
                                        name: '显示',
                                        value: '0'
                                    }, {
                                        name: '隐藏',
                                        value: '1'
                                    }]
                                },
                                component: 'dialog/radio'
                            },
                            Lower: {
                                config: {
                                    text: '有下级菜单时：',
                                    radio: [{
                                        name: '上级菜单可点击',
                                        value: '0'
                                    }, {
                                        name: '不可点击',
                                        value: '1'
                                    }]
                                },
                                component: 'dialog/radio'
                            },
                            Expansion: {
                                config: {
                                    name: '展开方式:',
                                    selected: '0',
                                    radio: [{
                                        name: '点击展开',
                                        value: '0'
                                    }, {
                                        name: '滑动展开',
                                        value: '1'
                                    }],
                                    showList: {
                                        name: '默认展开',
                                        value: '0',
                                        radio: [{
                                            name: '是',
                                            value: '0',
                                            imgSrc: './images/components/Expansion_true.png'
                                        }, {
                                            name: '否',
                                            value: '1',
                                            imgSrc: './images/components/Expansion_false.png'
                                        }]
                                    },
                                    imgSrc: './images/components/Expansion.png'
                                },
                                component: 'dialog/editing/chassifyShow'
                            }
                        }
                    }
                }
            };
        },

        watch: {
            'link.type': function linkType(v) {
                this.model.link.type = v;
            },
            'model.link.type': function modelLinkType(v) {
                // alert('changed:' + v);
            },

            'model.link': {
                handler: function handler(v) {
                    this.$forceUpdate();
                },

                deep: true
            },
            domain: function domain(v) {
                this.model.link.domain = v;
            }
        },
        computed: {
            styleConfig: function styleConfig() {
                var x = this.config.style;
                if (!x) x = {
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%'
                };
                return x;
            },
            iconStyle: function iconStyle() {
                var x = {
                    'background-image': 'url(' + this.icon + ')',
                    'background-size': '100% 100%'
                };
                return x;
            },
            linkList: function linkList() {
                var x = [];
                switch (this.pName) {
                    case '导航':
                        x = this.navList;
                        break;
                    case '栏目':
                        x = this.naviList;
                        break;
                    case '分类':
                        x = this.goodsList;
                        break;
                    case '商品详情':
                        x = this.goodsInfo;
                        break;
                }
                return x;
            },
            naviList: function naviList() {
                var x = app.firstParentId;
                var result = {};
                x.forEach(function (e) {
                    var linkUrl = '';
                    if (e.columnCode == 'custom') {
                        linkUrl = e.linkUrl;
                    } else {
                        linkUrl = e.id;
                    }
                    if (e.parentId == 0) {
                        if (result[e.menuId]) {
                            result[e.menuId].splice(0, 0, {
                                name: e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl
                            });
                        } else {
                            result[e.menuId] = [{
                                name: e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl
                            }];
                        }
                    } else {
                        if (result[e.parentId]) {
                            result[e.parentId].push({
                                name: '--' + e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl
                            });
                        } else {
                            result[e.parentId] = [{
                                name: '--' + e.name,
                                key: e.menuId,
                                menuId: e.menuId,
                                link: linkUrl
                            }];
                        }
                    }
                });
                var r = [];
                for (var v in result) {
                    r = r.concat(result[v]);
                }
                return r;
            }
        },
        beforeMount: function beforeMount() {
            if (!this.model.link) {
                this.model.link = {};
            }
            if (this.model.link.type == null) {
                this.model.link.type = 1;
            }
        },
        mounted: function mounted() {
            console.log('对话框挂载');
            setTimeout(function () {
                $('#dialog').draggable({
                    handle: '#DialogTitle'
                });
            });
            var self = this;
            this.domain = this.model.link.domain == undefined ? 'http://' : this.model.link.domain;
            app.loadGoodsNav({
                userId: app.toSessionStorage('userId'),
                webcode: app.toSessionStorage('webcode')
            }, function (arr) {
                self.navList = self.getInnerLink(arr);
            });
            app.loadGoodsInfo({
                userId: app.toSessionStorage('userId'),
                type: '2'
            }, function (arr) {
                self.goodsList = self.getInnerLink(arr);
            });
            app.loadGoodsInfo({
                userId: app.toSessionStorage('userId'),
                type: '3'
            }, function (arr) {
                self.goodsInfo = self.getInnerLink(arr);
            });
            if (app.toSessionStorage('webcode') != 'SHOW') {
                self.linkTypeOptions = ['栏目', '导航', '分类', '商品详情'];
            }
            this.link.type = this.model.link.type;
            /**
             * 如果id不为''就是修改
             */
            if (self.model.id && self.model.id !== '') {
                self.status = false;
                setTimeout(function () {
                    app.classifyLook(function (res) {
                        var data = res.data.catalogueList;
                        self.name = data.name;
                        self.id = data.id;
                        self.linkType = parseInt(data.linkType);
                        self.pName = data.pName;
                        self.localLink = data.localLink;
                        self.localLinkName = data.localLinkName;
                        self.customLink = data.customLink;
                        if (data.upChannel != 0) self.upChannel = data.upChannel;
                        self.blankYn = data.blankYn;
                        self.icon = data.icon;
                        self.webId = data.webId;
                        self.model.id = '';
                    }, function () {}, self.model.id);
                }, 300);
            }
        },

        methods: {
            open: function open(callback) {
                this.callback = callback;
                //setTimeout可以保证在mounted后再行渲染
                this.visible = true;
            },
            setModel: function setModel(model) {
                this.model = JSON.parse(JSON.stringify(model));
                this.model.callback = model.callback;
            },

            /**
             * 点击确定时按钮效验数据
             */
            ok: function ok() {
                var self = this;
                if (self.name !== '' && self.linkType !== '' && self.icon !== '') {
                    if (self.linkType === 0) {
                        if (self.localLink !== '') {
                            this.classifyAdd();
                            return;
                        }
                    } else if (self.linkType === 1) {
                        if (self.customLink !== '') {
                            this.classifyAdd();
                            return;
                        }
                    }
                }
                this.$alert('请将必要条件输入完', '错误', {
                    confirmButtonText: '确定'
                });
            },

            /**
             * 添加数据
             */
            classifyAdd: function classifyAdd() {
                var _this = this;

                var self = this;
                if (self.upChannel === '') self.upChannel = 0;
                var data = {
                    name: self.name,
                    id: self.id,
                    linkType: self.linkType,
                    localLink: self.localLink,
                    customLink: self.customLink,
                    upChannel: self.upChannel,
                    blankYn: self.blankYn,
                    icon: self.icon,
                    webId: self.webId,
                    localLinkName: self.localLinkName,
                    pName: self.pName
                };
                app.classifyAdd(data, function (res) {
                    showTips('添加数据成功');
                    var obj = res.data;
                    var add = true;
                    obj.isShow = true;
                    if (obj.upChannel === '0') {
                        if (_this.model.classify.length > 5) obj.isShow = false;
                        var i = 0;
                        for (; i < _this.model.classify.length; i++) {
                            if (obj.id == _this.model.classify[i].id) {
                                obj.children = _this.model.classify[i].children;
                                _this.model.classify[i] = obj;
                                add = false;
                                break;
                            }
                        }
                        if (add) _this.model.classify.push(obj);
                    } else {
                        var _i = 0;
                        for (; _i < _this.model.classify.length; _i++) {
                            if (obj.upChannel == _this.model.classify[_i].id) {
                                if (_this.model.classify[_i].children && _this.model.classify[_i].children.length > 0) {
                                    var j = 0;
                                    for (; j < _this.model.classify[_i].children.length; j++) {
                                        if (obj.id == _this.model.classify[_i].children[j].id) {
                                            _this.model.classify[_i].children[j] = obj;
                                            add = false;
                                            break;
                                        }
                                    }
                                    if (add) {
                                        _this.model.classify[_i].children.push(obj);
                                        add = false;
                                    }
                                    break;
                                }
                                if (add) {
                                    _this.model.classify[_i].children = [];
                                    _this.model.classify[_i].children.push(obj);
                                    break;
                                }
                            }
                        }
                    }
                    _this.goBack();
                }, function (res) {
                    showTips(res.message);
                });
            },

            /**
             * 返回分类编辑内容页
             */
            goBack: function goBack() {
                var _this2 = this;

                var self = this;
                loader.createVue('dialog/dialog', function (dialogVue) {
                    self.editDialog = dialogVue;
                    self.editDialog.setModel(_this2.model);
                    self.editDialog.setConfig(_this2.editingConfig);
                    loader.fill("#tempdialog", dialogVue);
                    self.editDialog.open(_this2.model.callback);
                });
            },
            cancel: function cancel(event) {
                this.visible = false;
                event.stopPropagation();
                this.goBack();
            },
            changeType: function changeType() {
                // this.model.link.selectedLinkType = this.selectedLinkType;
                this.localLinkName = '';
            },
            getInnerLink: function getInnerLink(arr) {
                var arr1 = [];
                arr.forEach(function (e) {
                    var obj = {
                        name: e.name,
                        link: e.url
                    };
                    arr1.push(obj);
                });
                return arr1;
            },
            setConfig: function setConfig(config) {
                var _this3 = this;

                this.config = config;
                setTimeout(function () {
                    var _loop = function _loop(k) {
                        var contentVue = _this3.$refs[k];
                        $(contentVue).empty();
                        var c = config.pages[k];
                        var p = void 0;

                        var _loop2 = function _loop2(ck) {
                            //加载内容vue
                            if (c[ck].component) {
                                if (p) p = p.then(function () {
                                    return loader.createVue(c[ck].component, function (v) {
                                        _this3.append(v, c, ck, contentVue);
                                    });
                                });else p = loader.createVue(c[ck].component, function (v) {
                                    _this3.append(v, c, ck, contentVue);
                                });
                            } else {
                                if (ck != 'check') throw ck + ' 没有定义component';
                            }
                        };

                        for (var ck in c) {
                            _loop2(ck);
                        }
                    };

                    for (var k in _this3.config.pages) {
                        _loop(k);
                    }
                });
            },
            append: function append(v, c, ck, contentVue) {
                if (v.$props == null) {
                    throw '组件' + c[ck].component + '必须定义props';
                }
                if (c[ck].config) v.$props.config = c[ck].config;
                v.$props.model = this.model;
                v.$props.key = ck;
                loader.append(contentVue, v);
            },
            selectImage: function selectImage() {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.icon
                    },
                    callback: function callback(model) {
                        self.loading = true;
                        self.icon = model.src;
                        setTimeout(function () {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            },
            openLink: function openLink(v) {
                var i = 0,
                    arr = this.linkList;
                for (; i < arr.length; i++) {
                    if (v == arr[i].name) {
                        this.localLink = arr[i].link;
                        break;
                    }
                }
            }
        }
    };
});