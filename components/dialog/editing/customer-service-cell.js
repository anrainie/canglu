'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                type: Object,
                default: {
                    type: 0
                }
            },
            key: {
                default: "type"
            },
            config: {}
        },
        mounted: function mounted() {},

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
                this.model[this.key].splice(index, 1);
            },
            textHover: function textHover(index) {
                var _this = this.$refs.footerListName[index].previousElementSibling;
                _this.style.backgroundColor = '#fff';
            },
            updateText: function updateText(index) {
                this.model[this.key][index].isUpdate = !this.model[this.key][index].isUpdate;
                var _this = this.$refs.footerListName[index];
                if ($.trim(_this.value) == "") {
                    _this.attr("placeholder", "请输入内容！");
                    _this.focus();
                    return;
                } else {
                    this.model[this.key][index].text = _this.value;
                }
            },
            addCell: function addCell() {
                this.model[this.key].unshift({ name: '客服热线', text: '400-000-0000', isUpdate: false });
            }
        }

    };
});