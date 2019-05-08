'use strict';

define([], function () {
    return {
        props: {
            model: {
                type: Object,
                default: {}
            },
            key: {
                default: "type"
            },
            config: {}
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
            saveOrders: function saveOrders() {
                app.navModification(this.model.navOrders);
            }
        }
    };
});