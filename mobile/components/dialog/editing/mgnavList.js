'use strict';

define(['vueLoader'], function (loader) {
    return {
        data: function data() {
            return {
                loading: false
            };
        },

        props: {
            model: {
                type: Object,
                default: {
                    type: 0
                }
            },
            key: {
                default: "image"
            },
            config: {
                type: Object
            }
        },
        component: {
            linkBtn: loader.load('dialog/editing/addlink')
        },
        methods: {
            orderList: function orderList(operate, ex) {
                var operate = operate,
                    cells = this.model['mgNavList'],
                    //获取数组
                ex = ex;
                if (operate == '2') {
                    var u = cells[ex];
                    cells[ex] = cells[ex - 1];
                    cells[ex - 1] = u;
                } else if (operate == '1') {
                    var _u = cells[ex];
                    cells[ex] = cells[ex + 1];
                    cells[ex + 1] = _u;
                }
                this.$forceUpdate();
            },
            del: function del(index) {
                var index = index;
                this.model.mgNavList.splice(index, 1);
            },
            showList: function showList(sh, ex) {
                var isshow = sh,
                    ex = ex,
                    mgNavList = this.model.mgNavList,
                    showLen = 0;
                for (var i = 0; i < mgNavList.length; i++) {
                    if (mgNavList[i].isShow) {
                        showLen++;
                    }
                }
                if (isshow) {
                    this.model['mgNavList'][ex].isShow = false;
                } else {
                    if (this.model.type == 0) {
                        if (showLen >= 10) {
                            this.$message({
                                message: '最多只能显示10条导航信息！',
                                type: 'warning'
                            });
                        } else {
                            this.model['mgNavList'][ex].isShow = true;
                        }
                    }
                    if (this.model.type == 1) {
                        if (showLen >= 8) {
                            this.$message({
                                message: '最多只能显示8条导航信息！',
                                type: 'warning'
                            });
                        } else {
                            this.model['mgNavList'][ex].isShow = true;
                        }
                    }
                }
            },
            selectImage: function selectImage(ex) {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model.mgNavList.src
                    },
                    callback: function callback(model) {
                        self.loading = true;
                        self.model['mgNavList'][ex].src = model.src;
                        setTimeout(function () {
                            self.loading = false;
                        }, 1000);
                    },

                    multiselect: false
                });
            },
            addList: function addList() {
                this.model.mgNavList.unshift({
                    'name': '导航名称',
                    'linkUrl': '',
                    'src': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-1.png',
                    'isShow': false,
                    'isUpdate': false,
                    'link': {
                        type: 0, //0-无 //1-本地 2-自定义
                        local: '',
                        open: '_blank',
                        net: ''
                    }
                });
            },
            updateText: function updateText(index) {
                var _this = this.$refs.footerListName[0];
                if ($.trim(_this.value) == "") {
                    _this.attr("placeholder", "请输入内容！");
                    _this.focus();
                    return;
                } else {
                    this.model.mgNavList[index].name = _this.value;
                }
            },
            clearSelect: function clearSelect(ex) {
                for (var i = 0; i < this.model.mgNavList.length; i++) {
                    if (i != ex) {
                        this.model.mgNavList[i].isUpdate = false;
                    }
                }
            },
            openLinkDialog: function openLinkDialog(option, ex) {
                var self = this;
                loader.loadLinkDialog({
                    model: option,
                    callback: function callback(m) {
                        self.model.mgNavList[ex].link = m.link;
                    }
                });
            }
        },
        mounted: function mounted() {}
    };
});