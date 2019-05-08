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
                    cells = this.model[this.key],
                    //获取数组
                ex = ex;
                if (operate == '2') {
                    //2表示可以向上移动
                    var u = cells[ex];
                    cells[ex] = cells[ex - 1];
                    cells[ex - 1] = u;
                } else if (operate == '1') {
                    //1表示可以向下移动
                    var _u = cells[ex];
                    cells[ex] = cells[ex + 1];
                    cells[ex + 1] = _u;
                }
                this.$forceUpdate();
            },
            del: function del(index) {
                var index = index;
                this.model.navList.splice(index, 1);
            },
            showList: function showList(sh, ex) {
                var isshow = sh,
                    ex = ex,
                    navList = this.model.navList,
                    showLen = 0;
                for (var i = 0; i < navList.length; i++) {
                    if (navList[i].isShow) {
                        showLen++;
                    }
                }
                if (isshow) {
                    this.model[this.key][ex].isShow = false;
                } else {
                    if (showLen >= 5) {
                        this.$message({
                            message: '最多只能显示5条导航信息！',
                            type: 'warning'
                        });
                    } else {
                        this.model[this.key][ex].isShow = true;
                    }
                }
            },
            selectImage: function selectImage(ex) {
                var self = this;
                loader.loadImageDialog({
                    model: {
                        src: self.model[self.key].src
                    },
                    callback: function callback(model) {
                        // self.selected.src = model.src;
                        self.loading = true;
                        self.model.navList[ex].imgSrc = model.src;
                        setTimeout(function () {
                            self.loading = false;
                        }, 1000);
                    },
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            },
            addList: function addList() {
                this.model.navList.unshift({
                    'name': '导航名称',
                    'imgSrc': 'http://image.cangluxmt.com/clwebsite/basic/images/components/mobileFooter-1.png',
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
                    this.model.navList[index].name = _this.value;
                }
            },
            openLinkDialog: function openLinkDialog(option, index) {
                var self = this;
                loader.loadLinkDialog({
                    model: option, callback: function callback(m) {
                        // console.log(m);
                        self.model.navList[index].link = m.link;
                        // option.link.open = m.open;
                    }
                });
            }
        },
        mounted: function mounted() {}
    };
});